from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError
from utils.enums import UserRole

User = get_user_model()


class UserManagerTests(TestCase):
    """
    Tests verifying custom UserManager methods (create_user and create_superuser).
    """

    def test_create_user_successful(self):
        """
        Test that creating a standard user works with normalized email, 
        hashed password, and default CITIZEN role.
        """
        email = "Citizen@Example.COM"
        phone = "+251911223344"
        password = "SecurePassword123!"

        user = User.objects.create_user(
            email=email,
            phone_number=phone,
            password=password,
            first_name="Abebe",
            last_name="Bikila"
        )

        self.assertEqual(user.email, "Citizen@example.com")  # Domain normalized to lowercase
        self.assertEqual(user.phone_number, phone)
        self.assertTrue(user.check_password(password))  # Password hashed properly
        self.assertEqual(user.role, UserRole.CITIZEN)  # Default role is CITIZEN
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_verified)

    def test_create_user_without_email_raises_error(self):
        """
        Test that creating a user without an email raises a ValueError.
        """
        with self.assertRaises(ValueError):
            User.objects.create_user(
                email="",
                phone_number="+251911223344",
                password="SecurePassword123!"
            )

    def test_create_superuser_successful(self):
        """
        Test that creating a superuser sets is_staff, is_superuser, and role to SYSTEM_ADMIN.
        """
        email = "admin@cirp.gov"
        phone = "+251922334455"
        password = "AdminPassword123!"

        admin = User.objects.create_superuser(
            email=email,
            phone_number=phone,
            password=password,
            first_name="System",
            last_name="Admin"
        )

        self.assertEqual(admin.email, email)
        self.assertTrue(admin.is_staff)
        self.assertTrue(admin.is_superuser)
        self.assertEqual(admin.role, UserRole.SYSTEM_ADMIN)
        self.assertTrue(admin.check_password(password))

    def test_duplicate_email_raises_integrity_error(self):
        """
        Test that duplicate emails are rejected by the database unique constraint.
        """
        User.objects.create_user(
            email="duplicate@example.com",
            phone_number="+251900000001",
            password="password1"
        )
        with self.assertRaises(IntegrityError):
            User.objects.create_user(
                email="duplicate@example.com",
                phone_number="+251900000002",
                password="password2"
            )

    def test_duplicate_phone_number_raises_integrity_error(self):
        """
        Test that duplicate phone numbers are rejected by the database unique constraint.
        """
        User.objects.create_user(
            email="user1@example.com",
            phone_number="+251911111111",
            password="password1"
        )
        with self.assertRaises(IntegrityError):
            User.objects.create_user(
                email="user2@example.com",
                phone_number="+251911111111",
                password="password2"
            )