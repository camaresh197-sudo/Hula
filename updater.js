/* Self-updater: runs inside the Android app only. Checks latest.json, downloads a newer game bundle,
   and applies it on the next launch. A bundle that fails to start is rolled back automatically. */
(function () {
  const CU = window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform() && window.Capacitor.Plugins && window.Capacitor.Plugins.CapacitorUpdater;
  if (!CU) return;                                     // normal browser: nothing to do
  const URL_ = '__UPDATE_URL__';
  const toast = (t) => { try { const d = document.createElement('div'); d.textContent = t; d.style.cssText = 'position:fixed;left:50%;top:10px;transform:translateX(-50%);background:#000c;color:#fff;font:13px sans-serif;padding:8px 14px;border-radius:14px;z-index:99999;pointer-events:none'; document.body.appendChild(d); setTimeout(() => d.remove(), 3500); } catch (e) {} };
  CU.notifyAppReady().catch(() => {});                 // tells the updater this version started fine (otherwise it rolls back)
  if (!URL_ || URL_.indexOf('__') === 0) return;
  setTimeout(async () => {
    try {
      const r = await fetch(URL_ + '?t=' + Date.now(), { cache: 'no-store' }); if (!r.ok) return;
      const m = await r.json(), cur = await CU.current();
      const have = (cur && cur.bundle && cur.bundle.version) || 'builtin';
      if (!m.version || m.version === have) return;
      const list = await CU.list().catch(() => ({ bundles: [] }));
      if ((list.bundles || []).some(b => b.version === m.version)) { await CU.next({ id: list.bundles.find(b => b.version === m.version).id }); return; }
      const b = await CU.download({ url: new URL(m.url, URL_).href, version: m.version, checksum: m.checksum });
      await CU.next({ id: b.id });
      toast('Update ready – restart the game to get it');
    } catch (e) { /* offline or server unreachable: keep playing the current version */ }
  }, 4000);
})();
