import 'package:flutter/material.dart';
import 'ui/home_page.dart';

class StoreApp extends StatelessWidget {
  const StoreApp({super.key});
  @override Widget build(BuildContext context) => MaterialApp(
    title: 'DemoStore', debugShowCheckedModeBanner: false,
    theme: ThemeData(colorSchemeSeed: const Color(0xff5c4ee5), useMaterial3: true, inputDecorationTheme: const InputDecorationTheme(border: OutlineInputBorder())),
    home: const HomePage(),
  );
}
