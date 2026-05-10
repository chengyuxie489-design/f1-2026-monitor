(() => {
  const cacheKey = "f1-2026-monitor:last-races-payload";
  const originalFetch = window.fetch.bind(window);

  function isRacesApiRequest(input) {
    const rawUrl = typeof input === "string" ? input : input?.url;
    if (!rawUrl) return false;
    const url = new URL(rawUrl, window.location.href);
    return url.pathname === "/api/races";
  }

  function cachePayload(response) {
    response
      .clone()
      .json()
      .then((payload) => {
        if (!payload || !Array.isArray(payload.races) || !payload.races.length) return;
        localStorage.setItem(cacheKey, JSON.stringify({
          ...payload,
          cachedByClientAt: new Date().toISOString()
        }));
      })
      .catch(() => {});
  }

  function cachedResponse(error) {
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;
    const payload = JSON.parse(cached);
    return new Response(JSON.stringify({
      ...payload,
      stale: true,
      syncStatus: payload.syncStatus === "live" ? "client-cache" : payload.syncStatus || "client-cache",
      lastSyncError: error?.message || payload.lastSyncError || "Live sync temporarily unavailable"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }

  window.fetch = async (input, init) => {
    if (!isRacesApiRequest(input)) return originalFetch(input, init);

    try {
      const response = await originalFetch(input, init);
      if (response.ok) {
        cachePayload(response);
        return response;
      }
      return cachedResponse(new Error(`Live sync returned ${response.status}`)) || response;
    } catch (error) {
      const fallback = cachedResponse(error);
      if (fallback) return fallback;
      throw error;
    }
  };
})();
