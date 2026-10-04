from rest_framework import serializers
from .models import Report
from apps.categories.serializers import CategorySerializer
from apps.users.serializers import UserSerializer
from apps.medias.models import Media
import random
import string


class MediaSerializer(serializers.ModelSerializer):
    """
    Serializer for Media model
    """
    file = serializers.SerializerMethodField()
    media_type = serializers.CharField(source='file_type', read_only=True)
    
    class Meta:
        model = Media
        fields = ['id', 'file', 'media_type', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def get_file(self, obj):
        return obj.file_url


class ReportSerializer(serializers.ModelSerializer):
    """
    Serializer for Report model
    """
    citizen = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    category_id = serializers.UUIDField(write_only=True)
    media = serializers.SerializerMethodField()
    media_images = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False,
        help_text="List of base64 encoded images"
    )
    
    class Meta:
        model = Report
        fields = [
            'id',
            'report_number',
            'title',
            'description',
            'citizen',
            'category',
            'category_id',
            'latitude',
            'longitude',
            'address',
            'priority',
            'status',
            'assigned_department',
            'assigned_officer',
            'ai_category',
            'ai_confidence',
            'is_duplicate',
            'duplicate_similarity',
            'admin_feedback',
            'completion_notes',
            'resolved_at',
            'created_at',
            'updated_at',
            'media',
            'media_images',
        ]
        read_only_fields = ['id', 'report_number', 'citizen', 'created_at', 'updated_at']
    
    def get_media(self, obj):
        """
        Get media files for this report
        """
        media_objects = Media.objects.filter(
            entity_type='REPORT',
            entity_id=obj.id
        )
        return MediaSerializer(media_objects, many=True).data
    
    def create(self, validated_data):
        """
        Create a new report with auto-generated report number
        """
        # Remove media_images from validated_data if present
        media_images = validated_data.pop('media_images', [])
        
        # Get category_id and remove it from validated_data
        category_id = validated_data.pop('category_id')
        
        # Generate unique report number
        validated_data['report_number'] = self._generate_report_number()
        
        # Set the citizen to the current user or default user if unauthenticated
        request = self.context.get('request')
        user = getattr(request, 'user', None) if request else None
        if user and not user.is_anonymous:
            validated_data['citizen'] = user
        else:
            from apps.users.models import User
            validated_data['citizen'] = User.objects.filter(role='CITIZEN').first() or User.objects.first()
        
        # Set the category
        from apps.categories.models import Category
        try:
            validated_data['category'] = Category.objects.get(id=category_id)
        except Exception:
            validated_data['category'] = Category.objects.first()

        # Normalize priority
        if 'priority' in validated_data and isinstance(validated_data['priority'], str):
            validated_data['priority'] = validated_data['priority'].upper()
        
        # Create the report
        report = Report.objects.create(**validated_data)
        
        # Handle media images if provided
        if media_images:
            self._create_media_from_base64(report, media_images)
        
        # Trigger non-blocking AI triage in background thread
        try:
            from .ai_services import process_ai_triage_background
            first_image = media_images[0] if media_images else None
            process_ai_triage_background(report.id, first_image)
        except Exception as e:
            print(f"Background AI triage launch error: {e}")

        return report
    
    def _generate_report_number(self):
        """
        Generate a unique report number in format: RPT-YYYYMMDD-XXXX
        """
        from django.utils import timezone
        date_str = timezone.now().strftime('%Y%m%d')
        
        # Generate random 4-digit number
        while True:
            random_digits = ''.join(random.choices(string.digits, k=4))
            report_number = f'RPT-{date_str}-{random_digits}'
            
            # Check if this number already exists
            if not Report.objects.filter(report_number=report_number).exists():
                return report_number
    
    def _create_media_from_base64(self, report, media_images):
        """
        Create Media objects from base64 encoded images
        """
        import base64
        from django.core.files.base import ContentFile
        from django.core.files.storage import default_storage
        from django.utils import timezone
        
        for idx, base64_image in enumerate(media_images):
            try:
                # Clean base64 string, fix spaces and missing padding
                clean_b64 = base64_image.strip()
                if 'base64,' in clean_b64:
                    clean_b64 = clean_b64.split('base64,')[1]
                clean_b64 = clean_b64.replace(' ', '+')
                missing_padding = len(clean_b64) % 4
                if missing_padding:
                    clean_b64 += '=' * (4 - missing_padding)
                
                # Decode base64 image
                image_data = base64.b64decode(clean_b64)
                
                # Create filename
                timestamp = timezone.now().strftime('%Y%m%d_%H%M%S')
                filename = f'reports/{report.report_number}_{timestamp}_{idx}.jpg'
                
                # Save file
                file_path = default_storage.save(filename, ContentFile(image_data))
                
                # Resolve uploader user
                uploader = None
                if 'request' in self.context and hasattr(self.context['request'], 'user'):
                    user = self.context['request'].user
                    if user and not user.is_anonymous:
                        uploader = user
                if not uploader:
                    uploader = report.citizen

                # Create Media object
                Media.objects.create(
                    entity_type='REPORT',
                    entity_id=report.id,
                    file_type='IMAGE',
                    file_url=default_storage.url(file_path),
                    uploaded_by=uploader
                )
                
            except Exception as e:
                # Log error but don't fail the entire request
                print(f"Error creating media from base64: {e}")
                continue


class ReportUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for updating report (status, priority, etc.)
    Used by admins to accept/reject reports
    """
    class Meta:
        model = Report
        fields = ['status', 'priority']
