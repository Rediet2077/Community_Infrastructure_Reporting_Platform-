import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models.dart';
import '../state/app_state.dart';
import 'cart_page.dart';
import 'login_page.dart';
import 'product_page.dart';

class HomePage extends StatefulWidget { const HomePage({super.key}); @override State<HomePage> createState() => _HomePageState(); }
class _HomePageState extends State<HomePage> {
  int tab = 0;
  @override Widget build(BuildContext context) {
    final state = context.watch<AppState>();
    final pages = [_Catalog(onOpen: (p) => Navigator.push(context, MaterialPageRoute(builder: (_) => ProductPage(product: p)))), CartPage(onBrowse: () => setState(() => tab = 0)), _Profile(onLogin: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const LoginPage())))];
    return Scaffold(
      appBar: AppBar(title: const Text('DemoStore'), actions: [Badge(label: Text('${state.cartCount}'), isLabelVisible: state.cartCount > 0, child: IconButton(icon: const Icon(Icons.shopping_bag_outlined), onPressed: () => setState(() => tab = 1)))]),
      body: SafeArea(child: pages[tab]),
      bottomNavigationBar: NavigationBar(selectedIndex: tab, onDestinationSelected: (i) => setState(() => tab = i), destinations: const [NavigationDestination(icon: Icon(Icons.storefront_outlined), selectedIcon: Icon(Icons.storefront), label: 'Shop'), NavigationDestination(icon: Icon(Icons.shopping_cart_outlined), selectedIcon: Icon(Icons.shopping_cart), label: 'Cart'), NavigationDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person), label: 'Profile')]),
    );
  }
}

class _Catalog extends StatelessWidget {
  const _Catalog({required this.onOpen}); final ValueChanged<Product> onOpen;
  @override Widget build(BuildContext context) {
    final state = context.watch<AppState>();
    if (state.loadingProducts) return const Center(child: CircularProgressIndicator());
    if (state.error != null && state.products.isEmpty) return _Message(icon: Icons.cloud_off, message: state.error!, action: 'Try again', onAction: state.loadProducts);
    return RefreshIndicator(onRefresh: state.loadProducts, child: LayoutBuilder(builder: (_, constraints) => ListView(padding: const EdgeInsets.all(16), children: [
      TextField(onChanged: state.search, decoration: const InputDecoration(prefixIcon: Icon(Icons.search), hintText: 'Search products')),
      const SizedBox(height: 12),
      SizedBox(height: 40, child: ListView(scrollDirection: Axis.horizontal, children: [ChoiceChip(label: const Text('All'), selected: state.selectedCategory == null, onSelected: (_) => state.selectCategory(null)), ...state.categories.map((c) => Padding(padding: const EdgeInsets.only(left: 8), child: ChoiceChip(label: Text(c), selected: state.selectedCategory == c, onSelected: (_) => state.selectCategory(c))))])),
      const SizedBox(height: 16),
      if (state.products.isEmpty) const _EmptyProducts() else GridView.builder(shrinkWrap: true, physics: const NeverScrollableScrollPhysics(), gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: constraints.maxWidth > 700 ? 4 : 2, childAspectRatio: .62, crossAxisSpacing: 12, mainAxisSpacing: 12), itemCount: state.products.length, itemBuilder: (_, i) => _ProductCard(product: state.products[i], onTap: onOpen)),
    ])));
  }
}
class _ProductCard extends StatelessWidget { const _ProductCard({required this.product, required this.onTap}); final Product product; final ValueChanged<Product> onTap;
  @override Widget build(BuildContext context) => Card(clipBehavior: Clip.antiAlias, child: InkWell(onTap: () => onTap(product), child: Padding(padding: const EdgeInsets.all(10), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Expanded(child: Center(child: Image.network(product.image, fit: BoxFit.contain, errorBuilder: (_,__,___) => const Icon(Icons.image_not_supported_outlined, size: 40)))), const SizedBox(height: 8), Text(product.title, maxLines: 2, overflow: TextOverflow.ellipsis, style: const TextStyle(fontWeight: FontWeight.w600)), const SizedBox(height: 4), Text('\$${product.price.toStringAsFixed(2)}', style: TextStyle(color: Theme.of(context).colorScheme.primary, fontWeight: FontWeight.bold))])))); }
class _EmptyProducts extends StatelessWidget { const _EmptyProducts(); @override Widget build(BuildContext context) => const Padding(padding: EdgeInsets.all(48), child: Center(child: Column(mainAxisSize: MainAxisSize.min, children: [Icon(Icons.search_off, size: 48), SizedBox(height: 12), Text('No products match your search.')]))); }
class _Message extends StatelessWidget { const _Message({required this.icon, required this.message, required this.action, required this.onAction}); final IconData icon; final String message, action; final VoidCallback onAction; @override Widget build(BuildContext context) => Center(child: Padding(padding: const EdgeInsets.all(24), child: Column(mainAxisSize: MainAxisSize.min, children: [Icon(icon, size: 48), const SizedBox(height: 12), Text(message, textAlign: TextAlign.center), const SizedBox(height: 12), FilledButton(onPressed: onAction, child: Text(action))]))); }
class _Profile extends StatelessWidget { const _Profile({required this.onLogin}); final VoidCallback onLogin; @override Widget build(BuildContext context) { final s = context.watch<AppState>(); if (!s.loggedIn) return _Message(icon: Icons.lock_outline, message: 'Sign in to view your account details.', action: 'Sign in', onAction: onLogin); if (s.loadingProfile) return const Center(child: CircularProgressIndicator()); final p = s.profile; return ListView(padding: const EdgeInsets.all(24), children: [CircleAvatar(radius: 36, child: Text((p?.name.isNotEmpty ?? false) ? p!.name[0].toUpperCase() : '?')), const SizedBox(height: 16), Text(p?.name ?? 'Your profile', style: Theme.of(context).textTheme.headlineSmall), const SizedBox(height: 20), ListTile(leading: const Icon(Icons.email_outlined), title: Text(p?.email ?? 'Unavailable')), ListTile(leading: const Icon(Icons.phone_outlined), title: Text(p?.phone ?? 'Unavailable')), ListTile(leading: const Icon(Icons.location_city_outlined), title: Text(p?.city ?? 'Unavailable')), const SizedBox(height: 20), OutlinedButton.icon(onPressed: s.logout, icon: const Icon(Icons.logout), label: const Text('Sign out'))]); } }
