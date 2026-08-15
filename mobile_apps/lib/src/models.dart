class Product {
  const Product({required this.id, required this.title, required this.price, required this.description, required this.category, required this.image, required this.rating});
  final int id;
  final String title, description, category, image;
  final double price, rating;
  factory Product.fromJson(Map<String, dynamic> json) => Product(
    id: json['id'] as int, title: json['title'] as String, price: (json['price'] as num).toDouble(),
    description: json['description'] as String, category: json['category'] as String,
    image: json['image'] as String, rating: ((json['rating']?['rate'] ?? 0) as num).toDouble(),
  );
}

class CartItem {
  const CartItem(this.product, this.quantity);
  final Product product;
  final int quantity;
  Map<String, dynamic> toJson() => {'id': product.id, 'quantity': quantity};
}

class UserProfile {
  const UserProfile({required this.id, required this.name, required this.email, required this.phone, required this.city});
  final int id;
  final String name, email, phone, city;
  factory UserProfile.fromJson(Map<String, dynamic> json) {
    final name = json['name'] as Map<String, dynamic>? ?? {};
    final address = json['address'] as Map<String, dynamic>? ?? {};
    return UserProfile(id: json['id'] as int, name: '${name['firstname'] ?? ''} ${name['lastname'] ?? ''}'.trim(), email: json['email'] ?? '', phone: json['phone'] ?? '', city: address['city'] ?? '');
  }
}
