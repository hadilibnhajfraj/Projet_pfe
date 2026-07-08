import 'package:flutter/foundation.dart';

void downloadBytes(
  List<int> bytes,
  String filename, {
  String mimeType = 'application/octet-stream',
}) {
  debugPrint(
    'downloadBytes: browser download is only supported on web (skipped "$filename")',
  );
}
