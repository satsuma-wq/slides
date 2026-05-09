// 画像onerror無限ループ防止ガード
// モバイル環境でフォールバックURLも失敗した際にonerrorが繰り返し
// 呼ばれる問題を、2回目以降のエラーでhandlerを無効化して防ぐ。
(function () {
  var fired = typeof WeakSet !== 'undefined' ? new WeakSet() : null;
  function guard(e) {
    var img = e.target;
    if (!img || img.nodeName !== 'IMG') return;
    if (fired) {
      if (fired.has(img)) {
        img.onerror = null;
      } else {
        fired.add(img);
      }
    } else {
      if (img._igFired) {
        img.onerror = null;
      } else {
        img._igFired = true;
      }
    }
  }
  // capture=true: inline onerror より先に実行されるため確実にループを止められる
  document.addEventListener('error', guard, true);
})();
