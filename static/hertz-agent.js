/**
 * Hertz Chat — Wonderful Chat SDK widget.
 *
 * Host this file on your own web server and load it with a <script src> tag.
 * Full instructions: INTEGRATION.md (sent with this file).
 *
 * SETUP: in PLATFORM_CONFIG below, set three values:
 *   key      replace __WONDERFUL_SDK_KEY__ with the SDK key Wonderful shares with you
 *   agentId  replace __WONDERFUL_AGENT_ID__ with the agent ID Wonderful shares with you
 *   baseUrl  UAT:        https://hertz.api.sb.wonderful.ai (already set)
 *            production: https://hertz.api.wonderful.ai
 * UAT and production use different keys and agent IDs. Nothing else in this
 * file needs editing. If a placeholder is left in, the chat does not start and
 * logs an error.
 *
 * Website:
 *   <script src="/path/to/hertz-chat.js" data-language="GR"></script>
 * Mobile app (page the WebView loads):
 *   <script src="/path/to/hertz-chat.js" data-language="GR" data-app-embed="true"></script>
 *
 * Options (attributes on the <script> tag):
 *   data-language="GR"        GR (default) | EN
 *   data-app-embed="true"     native in-app (WebView) layout; default false
 *   data-mobile="true|false"  optional; mobile layout is automatic at <= 480px
 */
(function () {
  // --- Platform config: the three values to set are key, agentId and baseUrl ---
  // Appearance is the portal's as-is; Hertz customisation happens on top later.
  var PLATFORM_CONFIG = {
    key: 'wpk_live_PJ2DirZk0ZEmBhP7_TxBFTX0nkGp0zy1',
    // Hardcoded on purpose, like the previous widget: never honor a host-page agent id.
    agentId: 'f7cd8251-b653-4dd4-b7cf-f71d9fa7b78b',
    baseUrl: 'https://hertz.api.sb.wonderful.ai', // UAT. Production: 'https://hertz.api.wonderful.ai'
    // More than one value shows a chat/voice chooser before the session starts.
    modalities: ['chat', 'voice'],
    theme: 'light',
    placement: 'bottom-right',
    launcher: {
      icon: 'data:image/png;base64,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',
      useAgentLogo: false,
    },
    appearance: {
      primary: '#f8d147',
      primaryForeground: '#ffffff',
      launcherSurface: '#ffffff',
      headerSurface: '#f8d147',
      headerForeground: '#ffffff',
      radius: '16px',
    },
  };

  var LOADER_URL = 'https://cdn.wonderful.ai/hosted-chat/v1/hosted-chat.min.js';

  // Panel size per layout. Website keeps the previous 400x600 card; webapp and
  // app ask for the largest panel the floating widget allows (it keeps a 24px margin).
  var PANEL_SIZE = {
    website: { width: 400, height: 600 },
    webapp: { width: '100%', height: '100%' },
    app: { width: '100%', height: '100%' },
  };

  // Hertz copy (from the previous widget's strings.js). Keys are Chat SDK
  // localization keys, except headerTitle (the `title` option) and footerNote
  // (rendered by this file under the composer).
  var STRINGS = {
    GR: {
      headerTitle: 'Πώς μπορώ να σας βοηθήσω;',
      inputPlaceholder: 'Γράψτε ένα μήνυμα...',
      conversationEnded: 'Η συνομιλία έληξε',
      startNewChat: 'Νέα συνομιλία',
      endChat: 'Τερματισμός συνομιλίας',
      minimize: 'Ελαχιστοποίηση',
      footerNote: 'Οι απαντήσεις δημιουργούνται από Τεχνητή Νοημοσύνη. Παρακαλούμε να επαληθεύετε τις σημαντικές πληροφορίες.',
    },
    EN: {
      headerTitle: 'How can I help you?',
      inputPlaceholder: 'Type your message...',
      conversationEnded: 'Conversation ended',
      startNewChat: 'Start new chat',
      endChat: 'End conversation',
      minimize: 'Minimize',
      footerNote: 'All answers are generated with Artificial Intelligence. Please verify important information.',
    },
  };
  var SDK_LOCALE = { GR: 'el', EN: 'en' };

  var LANG_KEY = 'hertz_chat_language';
  var OPEN_KEY = 'hertz_chat_open';

  // Loaded twice on a page (e.g. header and footer template): keep the first copy only.
  if (window.HertzChat && window.HertzChat.layout) return;

  // --- Read script attributes ---
  // Tag managers can re-inject the script without its data-* attributes, so
  // window.HertzChatOptions ({ language, mobile, appEmbed }) is the fallback.
  var script = document.currentScript;
  var OPTION_KEYS = { 'data-language': 'language', 'data-mobile': 'mobile', 'data-app-embed': 'appEmbed' };
  function attr(name) {
    var v = script ? script.getAttribute(name) : null;
    var opts = window.HertzChatOptions || {};
    if (v === null && opts[OPTION_KEYS[name]] != null) v = String(opts[OPTION_KEYS[name]]);
    return v;
  }

  function normalizeLang(v) { return (v || '').toUpperCase() === 'EN' ? 'EN' : 'GR'; }
  function storageGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function storageSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function storageRemove(k) { try { localStorage.removeItem(k); } catch (e) {} }

  var language = normalizeLang(attr('data-language') || storageGet(LANG_KEY));
  var mobileAttr = attr('data-mobile');
  var isAppEmbed = attr('data-app-embed') === 'true';
  var isMobile = mobileAttr !== null ? mobileAttr === 'true' : window.innerWidth <= 480;
  var layout = isAppEmbed ? 'app' : isMobile ? 'webapp' : 'website';

  function localization() {
    var out = {};
    Object.keys(STRINGS).forEach(function (lang) {
      var s = STRINGS[lang];
      out[SDK_LOCALE[lang]] = {
        inputPlaceholder: s.inputPlaceholder,
        conversationEnded: s.conversationEnded,
        startNewChat: s.startNewChat,
        endChat: s.endChat,
      };
    });
    return out;
  }

  function buildConfig() {
    var config = {};
    Object.keys(PLATFORM_CONFIG).forEach(function (k) { config[k] = PLATFORM_CONFIG[k]; });
    config.appearance = {};
    Object.keys(PLATFORM_CONFIG.appearance).forEach(function (k) {
      config.appearance[k] = PLATFORM_CONFIG.appearance[k];
    });
    if (PANEL_SIZE[layout]) {
      config.appearance.width = PANEL_SIZE[layout].width;
      config.appearance.height = PANEL_SIZE[layout].height;
    }
    // The emoji picker closes on any pointerdown whose composedPath() misses the
    // composer. Inside the SDK's default closed shadow root that path hides the
    // composer from document listeners, so every pick closed the picker before
    // the emoji registered.
    config.shadowMode = 'open';
    // The title is fixed at mount; runtime language switches update the SDK copy only.
    config.title = STRINGS[language].headerTitle;
    config.locale = SDK_LOCALE[language];
    config.localization = localization();
    return config;
  }

  // --- Host-page helpers ---
  function notifyHost(message) {
    // The previous widget posted these from its iframe to the host window; host
    // pages listen on `window` "message" events, so post to the same window.
    try { window.postMessage(message, '*'); } catch (e) {}
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      try { window.ReactNativeWebView.postMessage(JSON.stringify(message)); } catch (e) {}
    }
  }

  var savedHtmlOverflow = null;
  var savedBodyOverflow = null;
  function lockHostScroll(locked) {
    var html = document.documentElement;
    if (locked && savedHtmlOverflow === null) {
      savedHtmlOverflow = html.style.overflow;
      savedBodyOverflow = document.body.style.overflow;
      html.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else if (!locked && savedHtmlOverflow !== null) {
      html.style.overflow = savedHtmlOverflow;
      document.body.style.overflow = savedBodyOverflow;
      savedHtmlOverflow = null;
      savedBodyOverflow = null;
    }
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var el = document.createElement('script');
      el.src = src;
      el.async = true;
      el.onload = function () { resolve(); };
      el.onerror = function () { reject(new Error('Failed to load ' + src)); };
      document.head.appendChild(el);
    });
  }

  // Locale packs register on the `wonderful` global, so they must load AFTER the
  // hosted loader has installed the SDK — loaded earlier, the pack creates the
  // global and the loader skips loading the SDK.
  var loadedPacks = {};
  function ensureLocalePack(lang) {
    var code = SDK_LOCALE[lang];
    if (code === 'en' || loadedPacks[code]) return Promise.resolve();
    var version = window.wonderful && window.wonderful.version;
    if (!version) return Promise.resolve();
    loadedPacks[code] = loadScript('https://cdn.wonderful.ai/chat-sdk/' + version + '/chat-sdk.' + code + '.min.js');
    return loadedPacks[code];
  }

  function applyLocale(chat, lang) {
    ensureLocalePack(lang).then(function () {
      // Re-resolve so a pack that registered after mount takes effect.
      chat.setState({ locale: 'en' });
      chat.setState({ locale: SDK_LOCALE[lang] });
    }).catch(function (err) {
      console.error('[hertz-chat] locale pack failed', err);
    });
  }

  // --- AI footer note at the bottom of the panel ---
  // The SDK has no footer slot, so add the previous widget's note as the last
  // child of the panel (header, messages, composer or voice controls, note).
  // The SDK re-renders the panel between views, so re-add it whenever it's
  // missing. The panel is the child of the element sized by var(--chat-width).
  var NOTE_ATTR = 'data-hertz-footer-note';
  var PANEL_SELECTOR = '[style*="width: var(--chat-width)"] > div';
  var NOTE_CSS =
    '[' + NOTE_ATTR + ']{margin:0;padding:0 12px 12px;font-size:11px;line-height:1.45;' +
    'color:#888;text-align:center;text-wrap:balance;flex-shrink:0}';

  function widgetShadow(host) {
    var anchor = host.firstElementChild;
    return anchor && anchor.shadowRoot;
  }

  function wireFooterNote(host) {
    var shadow = widgetShadow(host);
    if (!shadow) return;
    var style = document.createElement('style');
    style.textContent = NOTE_CSS;
    shadow.appendChild(style);

    function ensureNote() {
      shadow.querySelectorAll(PANEL_SELECTOR).forEach(function (panel) {
        var last = panel.lastElementChild;
        if (last && last.hasAttribute(NOTE_ATTR)) return;
        var existing = panel.querySelector(':scope > [' + NOTE_ATTR + ']');
        var note = existing || document.createElement('p');
        if (!existing) {
          note.setAttribute(NOTE_ATTR, '');
          note.textContent = STRINGS[language].footerNote;
        }
        // Keep it last if the SDK appended a view after it.
        panel.appendChild(note);
      });
    }
    new MutationObserver(ensureNote).observe(shadow, { childList: true, subtree: true });
    ensureNote();
  }

  // Re-apply the copy this file renders (footer note, minimise label) after a language
  // switch; the SDK handles its own strings.
  function updateHertzCopy(host) {
    var shadow = widgetShadow(host);
    if (!shadow) return;
    shadow.querySelectorAll('[' + NOTE_ATTR + ']').forEach(function (note) {
      note.textContent = STRINGS[language].footerNote;
    });
    shadow.querySelectorAll('[data-hertz-minimize]').forEach(function (button) {
      button.setAttribute('aria-label', STRINGS[language].minimize);
      button.title = STRINGS[language].minimize;
    });
  }

  // --- Header actions: minimise button, and Back (leave) also ends the conversation ---
  // The SDK passes a `minimize` function to its header-actions slot but draws
  // no button there, so render a "−" in it (website and webapp; the app layout
  // stays open). The chat/voice chooser has no slot, so there the button is
  // appended to the header row instead. The SDK's Back button still returns to the chat/voice chooser,
  // and now also closes the conversation, so the next choice starts a new one.
  // The SDK renders Back as the next sibling of the slot; the marker finds it.
  var ACTIONS_ATTR = 'data-hertz-header-actions';
  var MINIMIZE_ATTR = 'data-hertz-minimize';
  var MINIMIZE_FALLBACK_ATTR = 'data-hertz-minimize-fallback';
  var MINIMIZE_CSS =
    '[' + MINIMIZE_ATTR + ']{display:inline-flex;align-items:center;justify-content:center;' +
    'width:32px;height:32px;padding:0;border:0;border-radius:8px;background:transparent;' +
    'color:var(--chat-header-foreground,currentColor);cursor:pointer}' +
    '[' + MINIMIZE_ATTR + ']:hover{background:rgba(255,255,255,.2)}' +
    '[' + MINIMIZE_ATTR + ']:focus-visible{outline:2px solid currentColor;outline-offset:1px}' +
    '[' + MINIMIZE_FALLBACK_ATTR + ']{display:flex;align-items:center;margin-left:auto;flex-shrink:0}';
  var MINIMIZE_ICON =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>';

  function closeOpenSessions(chat) {
    var client = chat.connection && chat.connection.client;
    if (!client) return Promise.resolve();
    return client.getSessions()
      .then(function (sessions) {
        // getSessions() also lists closed sessions; closing those again 410s.
        return Promise.all(sessions.filter(function (session) { return !session.closed; })
          .map(function (session) { return client.closeSession(session.id); }));
      })
      .catch(function (err) { console.error('[hertz-chat] failed to end conversation', err); });
  }

  function createMinimizeButton(onClick) {
    var button = document.createElement('button');
    button.type = 'button';
    button.setAttribute(MINIMIZE_ATTR, '');
    button.innerHTML = MINIMIZE_ICON;
    button.setAttribute('aria-label', STRINGS[language].minimize);
    button.title = STRINGS[language].minimize;
    button.addEventListener('click', onClick);
    return button;
  }

  // Views without the header-actions slot (the chat/voice chooser) get the
  // button at the end of the header row; drop it once the slot appears.
  function ensureFallbackMinimize(chat, shadow) {
    shadow.querySelectorAll(PANEL_SELECTOR).forEach(function (panel) {
      var header = panel.firstElementChild;
      var row = header && header.firstElementChild;
      if (!row) return;
      var fallback = row.querySelector(':scope > [' + MINIMIZE_FALLBACK_ATTR + ']');
      var hasSlot = !!row.querySelector('[' + ACTIONS_ATTR + ']');
      if (hasSlot) { if (fallback) fallback.remove(); return; }
      if (fallback) {
        if (row.lastElementChild !== fallback) row.appendChild(fallback);
        return;
      }
      var wrap = document.createElement('div');
      wrap.setAttribute(MINIMIZE_FALLBACK_ATTR, '');
      wrap.appendChild(createMinimizeButton(function () { chat.setState({ open: false }); }));
      row.appendChild(wrap);
    });
  }

  function wireHeaderActions(chat, host) {
    var shadow = widgetShadow(host);
    if (!shadow) return;
    var style = document.createElement('style');
    style.textContent = MINIMIZE_CSS;
    shadow.appendChild(style);

    if (layout !== 'app') {
      var ensure = function () { ensureFallbackMinimize(chat, shadow); };
      new MutationObserver(ensure).observe(shadow, { childList: true, subtree: true });
      ensure();
    }

    chat.registerInterfaceComponent('header-actions', function (target, context) {
      target.setAttribute(ACTIONS_ATTR, '');
      var minimize = context && context.minimize;
      var button = null;
      if (layout !== 'app') {
        button = createMinimizeButton(function () {
          if (minimize) minimize(); else chat.setState({ open: false });
        });
        target.appendChild(button);
      }
      return {
        update: function (next) { if (next && next.minimize) minimize = next.minimize; },
        unmount: function () { if (button) button.remove(); },
      };
    });

    // Bubble phase: the SDK's own handler still takes the user back to the chooser.
    shadow.addEventListener('click', function (event) {
      var button = event.target.closest && event.target.closest('button');
      var slot = button && button.previousElementSibling;
      if (slot && slot.hasAttribute(ACTIONS_ATTR)) closeOpenSessions(chat);
    });
  }

  // --- Fullscreen panel on webapp and app ---
  // The SDK's floating widget keeps a 24px margin and shows the launcher under
  // the panel. Pin its container to the screen while open and hide the
  // launcher, like the previous widget. The container is the parent of the
  // element sized by var(--chat-width); the launcher is its direct child button.
  // Height follows the visual viewport so the composer stays above the
  // on-screen keyboard (iOS doesn't shrink 100dvh for it).
  var FULLSCREEN_ATTR = 'data-hertz-fullscreen';
  var OPEN_ATTR = 'data-hertz-open';
  // Only while open: closed, the launcher keeps the SDK's 24px inset.
  var FS = '[' + FULLSCREEN_ATTR + '][' + OPEN_ATTR + ']';
  var SIZED_SELECTOR = '[style*="width: var(--chat-width)"]';
  var FULLSCREEN_CSS =
    FS + '{top:var(--hertz-vv-top,0px)!important;left:0!important;' +
    'right:auto!important;bottom:auto!important;width:100%!important;' +
    'height:var(--hertz-vv-height,100dvh)!important;gap:0!important}' +
    FS + ' > button[aria-expanded="true"]{display:none!important}' +
    FS + ' > ' + SIZED_SELECTOR + '{width:100%!important;height:100%!important;' +
    'max-width:none!important;max-height:none!important}' +
    FS + ' > ' + SIZED_SELECTOR + ' > div{border-radius:0!important;' +
    'border:0!important;box-shadow:none!important}';

  function wireFullscreen(chat, host) {
    if (layout !== 'webapp' && layout !== 'app') return;
    var shadow = widgetShadow(host);
    if (!shadow) return;
    var style = document.createElement('style');
    style.textContent = FULLSCREEN_CSS;
    shadow.appendChild(style);

    var container = null;
    var isOpen = !!chat.getState().open;
    var vv = window.visualViewport;
    function syncOpen() {
      if (!container) return;
      if (isOpen) container.setAttribute(OPEN_ATTR, ''); else container.removeAttribute(OPEN_ATTR);
    }
    function syncViewport() {
      if (!container || !vv) return;
      container.style.setProperty('--hertz-vv-height', vv.height + 'px');
      container.style.setProperty('--hertz-vv-top', vv.offsetTop + 'px');
    }
    function findContainer() {
      if (container && container.isConnected) return;
      var sized = shadow.querySelector(SIZED_SELECTOR);
      if (!sized || !sized.parentElement) return;
      container = sized.parentElement;
      container.setAttribute(FULLSCREEN_ATTR, '');
      syncOpen();
      syncViewport();
    }
    chat.subscribe(function (state) {
      isOpen = !!state.open;
      syncOpen();
    });
    new MutationObserver(findContainer).observe(shadow, { childList: true, subtree: true });
    findContainer();
    if (vv) {
      vv.addEventListener('resize', syncViewport);
      vv.addEventListener('scroll', syncViewport);
    }
  }

  // --- Platform request hooks ---
  // The SDK reads `fetch` at call time, so these only need to be in place
  // before it loads. Both match the SDK's web-chat endpoints on our base URL.
  var WEB_CHAT_API = PLATFORM_CONFIG.baseUrl + '/api/v1/web-chat';
  var LOCALE = 'el-GR';

  // Agent-first chat: the SDK only creates a chat session when the panel opens
  // if the agent config reports a welcome message; otherwise it waits for the
  // user's first message. The agent greets as soon as a session exists, so
  // report one to open the session right away, like the previous widget did.
  function withWelcomeMessage(response) {
    if (!response.ok) return response;
    return response.clone().json().then(function (body) {
      if (!body || !body.data || body.data.has_welcome_message) return response;
      body.data.has_welcome_message = true;
      return new Response(JSON.stringify(body), {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    }, function () { return response; });
  }

  // Session metadata and billing channel: the SDK creates sessions with no
  // metadata and source in_website. Send what the previous widget sent; the
  // agent's OnStart setparams tool reads communication.metadata.app_embed /
  // .mobile (Source tag) and .language (greeting language). Fixed per
  // session, like before: a later language switch doesn't update it.
  function withSessionContext(init) {
    var body;
    try { body = JSON.parse(init.body); } catch (e) { return init; }
    body.source = isAppEmbed ? 'in_app' : 'in_website';
    body.metadata = Object.assign({}, body.metadata, {
      locale: LOCALE,
      language: language,
      mobile: isMobile,
      app_embed: isAppEmbed,
    });
    return Object.assign({}, init, { body: JSON.stringify(body) });
  }

  function installPlatformHooks() {
    var originalFetch = window.fetch;
    if (!originalFetch) return;
    window.fetch = function (input, init) {
      var url = typeof input === 'string' ? input : input && input.url;
      var path = url && url.indexOf(WEB_CHAT_API) === 0 ? url.slice(WEB_CHAT_API.length).split('?')[0] : null;
      var method = ((init && init.method) || 'GET').toUpperCase();
      if (path === '/sessions' && method === 'POST' && init && typeof init.body === 'string') {
        return originalFetch.call(this, input, withSessionContext(init));
      }
      var request = originalFetch.apply(this, arguments);
      return path === '/config' ? request.then(withWelcomeMessage) : request;
    };
  }

  // --- Layout rules, driven off the SDK's public open state ---
  function wireLayout(chat) {
    // Read before subscribing: the initial (closed) state would clear it.
    var reopen = layout === 'website' && storageGet(OPEN_KEY) === '1';
    var lastOpen = null;
    function onState(state) {
      if (state.open === lastOpen) return;
      lastOpen = state.open;

      if (layout === 'app') {
        // App has no way to close: reopen immediately if the SDK collapses it.
        if (!state.open) { chat.setState({ open: true }); return; }
        lockHostScroll(true);
      } else if (layout === 'webapp') {
        lockHostScroll(state.open);
      } else {
        // Website only: remember the open state so the panel reopens after navigation.
        if (state.open) storageSet(OPEN_KEY, '1'); else storageRemove(OPEN_KEY);
      }
      notifyHost({ type: 'chat-toggle', open: state.open });
    }
    chat.subscribe(onState);
    onState(chat.getState());

    if (layout === 'app' || reopen) {
      chat.setState({ open: true });
    }
    // Webapp never auto-opens: the user taps the launcher.
  }

  // --- Mount ---
  function mount() {
    // A distributed copy ships with placeholders; fail loudly if they weren't filled in.
    if (/^__.*__$/.test(PLATFORM_CONFIG.key) || /^__.*__$/.test(PLATFORM_CONFIG.agentId)) {
      console.error('[hertz-chat] SDK key or agent ID placeholder not replaced; the chat will not start.');
      return;
    }
    if (!document.body) {
      window.addEventListener('DOMContentLoaded', mount);
      return;
    }
    var host = document.createElement('div');
    host.setAttribute('data-hertz-chat', layout);
    document.body.appendChild(host);

    installPlatformHooks();
    loadScript(LOADER_URL)
      .then(function () { return window.wonderfulHosted.createChat(buildConfig(), host); })
      .then(function (chat) {
        window.HertzChat.chat = chat;
        window.HertzChat.setLanguage = function (next) {
          next = normalizeLang(next);
          storageSet(LANG_KEY, next);
          if (next === language) return;
          language = next;
          applyLocale(chat, language);
          updateHertzCopy(host);
        };
        applyLocale(chat, language);
        wireFooterNote(host);
        wireHeaderActions(chat, host);
        wireFullscreen(chat, host);
        wireLayout(chat);
        notifyHost({ type: 'chat-ready' });
      })
      .catch(function (error) {
        // Like the previous widget: fail silently on the host page.
        host.remove();
        console.error('[hertz-chat] failed to start', error);
      });
  }

  window.HertzChat = window.HertzChat || {};
  window.HertzChat.layout = layout;
  // Usable before the SDK finishes loading; the mounted version replaces it.
  window.HertzChat.setLanguage = function (next) {
    language = normalizeLang(next);
    storageSet(LANG_KEY, language);
  };

  mount();
})();
