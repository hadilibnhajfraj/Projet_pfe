/// Cross-platform "save bytes as a downloaded file" helper.
///
/// The web implementation (browser_download_web.dart) uses dart:html, which
/// is unavailable outside the web compiler. The stub (browser_download_stub.dart)
/// is selected for every other platform via conditional import, so importing
/// this file never breaks non-web builds (Android/iOS/desktop) or --wasm.
export 'browser_download_stub.dart'
    if (dart.library.html) 'browser_download_web.dart';
