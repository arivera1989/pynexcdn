this.driver = this.driver || {};
this.driver.js = (function (I) {
  "use strict";
  let O = {};
  function z(e = {}) {
    O = {
      animate: !0,
      allowClose: !0,
      overlayOpacity: 0.7,
      smoothScroll: !1,
      showProgress: !1,
      stagePadding: 10,
      stageRadius: 5,
      popoverOffset: 10,
      showButtons: ["next", "previous", "close"],
      disableButtons: [],
      overlayColor: "#000",
      ...e,
    };
  }
  function s(e) {
    return e ? O[e] : O;
  }
  function W(e, t, o, n) {
    return (e /= n / 2) < 1
      ? (o / 2) * e * e + t
      : (-o / 2) * (--e * (e - 2) - 1) + t;
  }
  function D(e) {
    if (!e || ie(e)) return;
    const t = s("smoothScroll");
    e.scrollIntoView({
      behavior: !t || ne(e) ? "auto" : "smooth",
      inline: "center",
      block: "center",
    });
  }
  function ne(e) {
    if (!e || !e.parentElement) return;
    const t = e.parentElement;
    return t.scrollHeight > t.clientHeight;
  }
  function ie(e) {
    const t = e.getBoundingClientRect();
    return (
      t.top >= 0 &&
      t.left >= 0 &&
      t.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      t.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  let _ = {};
  function b(e, t) {
    _[e] = t;
  }
  function d(e) {
    return e ? _[e] : _;
  }
  function re() {
    _ = {};
  }
  let T = {};
  function N(e, t) {
    T[e] = t;
  }
  function L(e) {
    var t;
    (t = T[e]) == null || t.call(T);
  }
  function se() {
    T = {};
  }
  function ae(e, t, o, n) {
    let p = d("__activeStagePosition");
    const r = p || o.getBoundingClientRect(),
      f = n.getBoundingClientRect(),
      w = W(e, r.x, f.x - r.x, t),
      i = W(e, r.y, f.y - r.y, t),
      h = W(e, r.width, f.width - r.width, t),
      a = W(e, r.height, f.height - r.height, t);
    (p = { x: w, y: i, width: h, height: a }),
      q(p),
      b("__activeStagePosition", p);
  }
  function F(e) {
    if (!e) return;
    const t = e.getBoundingClientRect(),
      o = { x: t.x, y: t.y, width: t.width, height: t.height };
    b("__activeStagePosition", o), q(o);
  }
  function le() {
    const e = d("__activeStagePosition"),
      t = d("__overlaySvg");
    if (!e) return;
    if (!t) {
      console.warn("No stage svg found.");
      return;
    }
    const o = window.innerWidth,
      n = window.innerHeight;
    t.setAttribute("viewBox", `0 0 ${o} ${n}`);
  }
  function ce(e) {
    const t = de(e);
    document.body.appendChild(t),
      j(t, (o) => {
        o.target.tagName === "path" && L("overlayClick");
      }),
      b("__overlaySvg", t);
  }
  function q(e) {
    const t = d("__overlaySvg");
    if (!t) {
      ce(e);
      return;
    }
    const o = t.firstElementChild;
    if ((o == null ? void 0 : o.tagName) !== "path")
      throw new Error("no path element found in stage svg");
    o.setAttribute("d", V(e));
  }
  function de(e) {
    const t = window.innerWidth,
      o = window.innerHeight,
      n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    n.classList.add("driver-overlay", "driver-overlay-animated"),
      n.setAttribute("viewBox", `0 0 ${t} ${o}`),
      n.setAttribute("xmlSpace", "preserve"),
      n.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"),
      n.setAttribute("version", "1.1"),
      n.setAttribute("preserveAspectRatio", "xMinYMin slice"),
      (n.style.fillRule = "evenodd"),
      (n.style.clipRule = "evenodd"),
      (n.style.strokeLinejoin = "round"),
      (n.style.strokeMiterlimit = "2"),
      (n.style.zIndex = "10000"),
      (n.style.position = "fixed"),
      (n.style.top = "0"),
      (n.style.left = "0"),
      (n.style.width = "100%"),
      (n.style.height = "100%");
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    return (
      p.setAttribute("d", V(e)),
      (p.style.fill = s("overlayColor") || "rgb(0,0,0)"),
      (p.style.opacity = `${s("overlayOpacity")}`),
      (p.style.pointerEvents = "auto"),
      (p.style.cursor = "auto"),
      n.appendChild(p),
      n
    );
  }
  function V(e) {
    const t = window.innerWidth,
      o = window.innerHeight,
      n = s("stagePadding") || 0,
      p = s("stageRadius") || 0,
      r = e.width + n * 2,
      f = e.height + n * 2,
      w = Math.min(p, r / 2, f / 2),
      i = Math.floor(Math.max(w, 0)),
      h = e.x - n + i,
      a = e.y - n,
      l = r - i * 2,
      c = f - i * 2;
    return `M${t},0L0,0L0,${o}L${t},${o}L${t},0Z
    M${h},${a} h${l} a${i},${i} 0 0 1 ${i},${i} v${c} a${i},${i} 0 0 1 -${i},${i} h-${l} a${i},${i} 0 0 1 -${i},-${i} v-${c} a${i},${i} 0 0 1 ${i},-${i} z`;
  }
  function pe() {
    const e = d("__overlaySvg");
    e && e.remove();
  }
  function ue() {
    const e = document.getElementById("driver-dummy-element");
    if (e) return e;
    let t = document.createElement("div");
    return (
      (t.id = "driver-dummy-element"),
      (t.style.width = "0"),
      (t.style.height = "0"),
      (t.style.pointerEvents = "none"),
      (t.style.opacity = "0"),
      (t.style.position = "fixed"),
      (t.style.top = "50%"),
      (t.style.left = "50%"),
      document.body.appendChild(t),
      t
    );
  }
  function X(e) {
    const { element: t } = e;
    let o = typeof t == "string" ? document.querySelector(t) : t;
    o || (o = ue()), he(o, e);
  }
  function ve() {
    const e = d("activeElement"),
      t = d("activeStep");
    e && (F(e), le(), J(e, t));
  }
  function he(e, t) {
    const n = Date.now(),
      p = d("activeStep"),
      r = d("activeElement") || e,
      f = !r || r === e,
      w = e.id === "driver-dummy-element",
      i = r.id === "driver-dummy-element",
      h = s("animate"),
      a = t.onHighlightStarted || s("onHighlightStarted"),
      l = (t == null ? void 0 : t.onHighlighted) || s("onHighlighted"),
      c = (p == null ? void 0 : p.onDeselected) || s("onDeselected"),
      m = s(),
      g = d();
    !f && c && c(i ? void 0 : r, p, { config: m, state: g }),
      a && a(w ? void 0 : e, t, { config: m, state: g });
    const u = !f && h;
    let v = !1;
    me();
    const P = () => {
      if (d("__transitionCallback") !== P) return;
      const k = Date.now() - n,
        y = 400 - k <= 400 / 2;
      t.popover && y && !v && u && (K(e, t), (v = !0)),
        s("animate") && k < 400
          ? ae(k, 400, r, e)
          : (F(e),
            l && l(w ? void 0 : e, t, { config: s(), state: d() }),
            b("__transitionCallback", void 0),
            b("previousStep", p),
            b("previousElement", r),
            b("activeStep", t),
            b("activeElement", e)),
        window.requestAnimationFrame(P);
    };
    b("__transitionCallback", P),
      window.requestAnimationFrame(P),
      D(e),
      !u && t.popover && K(e, t),
      r.classList.remove("driver-active-element"),
      e.classList.add("driver-active-element");
  }
  function fe() {
    var e;
    (e = document.getElementById("driver-dummy-element")) == null || e.remove(),
      document.querySelectorAll(".driver-active-element").forEach((t) => {
        t.classList.remove("driver-active-element");
      });
  }
  function $() {
    const e = d("__resizeTimeout");
    e && window.cancelAnimationFrame(e),
      b("__resizeTimeout", window.requestAnimationFrame(ve));
  }
  function Y(e) {
    s("allowKeyboardControl");
    e.key === "Escape"
      ? L("escapePress")
      : e.key === "ArrowRight"
      ? L("arrowRightPress")
      : e.key === "ArrowLeft" && L("arrowLeftPress");
  }
  function j(e, t, o) {
    const n = (r, f) => {
      const w = r.target;
      e.contains(w) &&
        ((!o || o(w)) &&
          (r.preventDefault(),
          r.stopPropagation(),
          r.stopImmediatePropagation()),
        f == null || f(r));
    };
    document.addEventListener("pointerdown", n, !0),
      document.addEventListener("mousedown", n, !0),
      document.addEventListener("pointerup", n, !0),
      document.addEventListener("mouseup", n, !0),
      document.addEventListener(
        "click",
        (r) => {
          n(r, t);
        },
        !0
      );
  }
  function ge() {
    window.addEventListener("keyup", Y, !1),
      window.addEventListener("resize", $),
      window.addEventListener("scroll", $);
  }
  function we() {
    window.removeEventListener("keyup", Y),
      window.removeEventListener("resize", $),
      window.removeEventListener("scroll", $);
  }
  function me() {
    const e = d("popover");
    e && (e.wrapper.style.display = "none");
  }
  function K(e, t) {
    var k, C;
    let o = d("popover");
    o && document.body.removeChild(o.wrapper),
      (o = xe()),
      document.body.appendChild(o.wrapper);
    const {
      title: n,
      description: p,
      showButtons: r,
      disableButtons: f,
      showProgress: w,
      nextBtnText: i = s("nextBtnText") || "Next &rarr;",
      prevBtnText: h = s("prevBtnText") || "&larr; Previous",
      progressText: a = s("progressText") || "{current} of {total}",
    } = t.popover || {};
    (o.nextButton.innerHTML = i),
      (o.previousButton.innerHTML = h),
      (o.progress.innerHTML = a),
      n
        ? ((o.title.innerText = n), (o.title.style.display = "block"))
        : (o.title.style.display = "none"),
      p
        ? ((o.description.innerHTML = p),
          (o.description.style.display = "block"))
        : (o.description.style.display = "none");
    const l = r || s("showButtons"),
      c = w || s("showProgress") || !1,
      m =
        (l == null ? void 0 : l.includes("next")) ||
        (l == null ? void 0 : l.includes("previous")) ||
        c;
    (o.closeButton.style.display = l.includes("close") ? "block" : "none"),
      m
        ? ((o.footer.style.display = "flex"),
          (o.progress.style.display = c ? "block" : "none"),
          (o.nextButton.style.display = l.includes("next") ? "block" : "none"),
          (o.previousButton.style.display = l.includes("previous")
            ? "block"
            : "none"))
        : (o.footer.style.display = "none");
    const g = f || s("disableButtons") || [];
    g != null &&
      g.includes("next") &&
      o.nextButton.classList.add("driver-popover-btn-disabled"),
      g != null &&
        g.includes("previous") &&
        o.previousButton.classList.add("driver-popover-btn-disabled"),
      g != null &&
        g.includes("close") &&
        o.closeButton.classList.add("driver-popover-btn-disabled");
    const u = o.wrapper;
    (u.style.display = "block"),
      (u.style.left = ""),
      (u.style.top = ""),
      (u.style.bottom = ""),
      (u.style.right = "");
    const v = o.arrow;
    v.className = "driver-popover-arrow";
    const P =
      ((k = t.popover) == null ? void 0 : k.popoverClass) ||
      s("popoverClass") ||
      "";
    (u.className = `driver-popover ${P}`.trim()),
      j(
        o.wrapper,
        (y) => {
          var A, M, R;
          const x = y.target,
            H =
              ((A = t.popover) == null ? void 0 : A.onNextClick) ||
              s("onNextClick"),
            E =
              ((M = t.popover) == null ? void 0 : M.onPrevClick) ||
              s("onPrevClick"),
            B =
              ((R = t.popover) == null ? void 0 : R.onCloseClick) ||
              s("onCloseClick");
          if (x.classList.contains("driver-popover-next-btn"))
            return H ? H(e, t, { config: s(), state: d() }) : L("nextClick");
          if (x.classList.contains("driver-popover-prev-btn"))
            return E ? E(e, t, { config: s(), state: d() }) : L("prevClick");
          if (x.classList.contains("driver-popover-close-btn"))
            return B ? B(e, t, { config: s(), state: d() }) : L("closeClick");
        },
        (y) =>
          !(o != null && o.description.contains(y)) &&
          !(o != null && o.title.contains(y)) &&
          y.className.includes("driver-popover")
      ),
      b("popover", o),
      J(e, t),
      D(u);
    const S =
      ((C = t.popover) == null ? void 0 : C.onPopoverRendered) ||
      s("onPopoverRendered");
    S && S(o, { config: s(), state: d() });
  }
  function Q() {
    const e = d("popover");
    if (!(e != null && e.wrapper)) return;
    const t = e.wrapper.getBoundingClientRect(),
      o = s("stagePadding") || 0,
      n = s("popoverOffset") || 0;
    return {
      width: t.width + o + n,
      height: t.height + o + n,
      realWidth: t.width,
      realHeight: t.height,
    };
  }
  function Z(e, t) {
    const {
      elementDimensions: o,
      popoverDimensions: n,
      popoverPadding: p,
      popoverArrowDimensions: r,
    } = t;
    return e === "start"
      ? Math.max(
          Math.min(o.top - p, window.innerHeight - n.realHeight - r.width),
          r.width
        )
      : e === "end"
      ? Math.max(
          Math.min(
            o.top - (n == null ? void 0 : n.realHeight) + o.height + p,
            window.innerHeight - (n == null ? void 0 : n.realHeight) - r.width
          ),
          r.width
        )
      : e === "center"
      ? Math.max(
          Math.min(
            o.top + o.height / 2 - (n == null ? void 0 : n.realHeight) / 2,
            window.innerHeight - (n == null ? void 0 : n.realHeight) - r.width
          ),
          r.width
        )
      : 0;
  }
  function G(e, t) {
    const {
      elementDimensions: o,
      popoverDimensions: n,
      popoverPadding: p,
      popoverArrowDimensions: r,
    } = t;
    return e === "start"
      ? Math.max(
          Math.min(o.left - p, window.innerWidth - n.realWidth - r.width),
          r.width
        )
      : e === "end"
      ? Math.max(
          Math.min(
            o.left - (n == null ? void 0 : n.realWidth) + o.width + p,
            window.innerWidth - (n == null ? void 0 : n.realWidth) - r.width
          ),
          r.width
        )
      : e === "center"
      ? Math.max(
          Math.min(
            o.left + o.width / 2 - (n == null ? void 0 : n.realWidth) / 2,
            window.innerWidth - (n == null ? void 0 : n.realWidth) - r.width
          ),
          r.width
        )
      : 0;
  }
  function J(e, t) {
    const o = d("popover");
    if (!o) return;
    const { align: n = "start", side: p = "left" } =
        (t == null ? void 0 : t.popover) || {},
      r = n,
      f = e.id === "driver-dummy-element" ? "over" : p,
      w = s("stagePadding") || 0,
      i = Q(),
      h = o.arrow.getBoundingClientRect(),
      a = e.getBoundingClientRect(),
      l = a.top - i.height;
    let c = l >= 0;
    const m = window.innerHeight - (a.bottom + i.height);
    let g = m >= 0;
    const u = a.left - i.width;
    let v = u >= 0;
    const P = window.innerWidth - (a.right + i.width);
    let S = P >= 0;
    const k = !c && !g && !v && !S;
    let C = f;
    if (
      (f === "top" && c
        ? (S = v = g = !1)
        : f === "bottom" && g
        ? (S = v = c = !1)
        : f === "left" && v
        ? (S = c = g = !1)
        : f === "right" && S && (v = c = g = !1),
      f === "over")
    ) {
      const y = window.innerWidth / 2 - i.realWidth / 2,
        x = window.innerHeight / 2 - i.realHeight / 2;
      (o.wrapper.style.left = `${y}px`),
        (o.wrapper.style.right = "auto"),
        (o.wrapper.style.top = `${x}px`),
        (o.wrapper.style.bottom = "auto");
    } else if (k) {
      const y = window.innerWidth / 2 - (i == null ? void 0 : i.realWidth) / 2,
        x = 10;
      (o.wrapper.style.left = `${y}px`),
        (o.wrapper.style.right = "auto"),
        (o.wrapper.style.bottom = `${x}px`),
        (o.wrapper.style.top = "auto");
    } else if (v) {
      const y = Math.min(
          u,
          window.innerWidth - (i == null ? void 0 : i.realWidth) - h.width
        ),
        x = Z(r, {
          elementDimensions: a,
          popoverDimensions: i,
          popoverPadding: w,
          popoverArrowDimensions: h,
        });
      (o.wrapper.style.left = `${y}px`),
        (o.wrapper.style.top = `${x}px`),
        (o.wrapper.style.bottom = "auto"),
        (o.wrapper.style.right = "auto"),
        (C = "left");
    } else if (S) {
      const y = Math.min(
          P,
          window.innerWidth - (i == null ? void 0 : i.realWidth) - h.width
        ),
        x = Z(r, {
          elementDimensions: a,
          popoverDimensions: i,
          popoverPadding: w,
          popoverArrowDimensions: h,
        });
      (o.wrapper.style.right = `${y}px`),
        (o.wrapper.style.top = `${x}px`),
        (o.wrapper.style.bottom = "auto"),
        (o.wrapper.style.left = "auto"),
        (C = "right");
    } else if (c) {
      const y = Math.min(l, window.innerHeight - i.realHeight - h.width);
      let x = G(r, {
        elementDimensions: a,
        popoverDimensions: i,
        popoverPadding: w,
        popoverArrowDimensions: h,
      });
      (o.wrapper.style.top = `${y}px`),
        (o.wrapper.style.left = `${x}px`),
        (o.wrapper.style.bottom = "auto"),
        (o.wrapper.style.right = "auto"),
        (C = "top");
    } else if (g) {
      const y = Math.min(
        m,
        window.innerHeight - (i == null ? void 0 : i.realHeight) - h.width
      );
      let x = G(r, {
        elementDimensions: a,
        popoverDimensions: i,
        popoverPadding: w,
        popoverArrowDimensions: h,
      });
      (o.wrapper.style.left = `${x}px`),
        (o.wrapper.style.bottom = `${y}px`),
        (o.wrapper.style.top = "auto"),
        (o.wrapper.style.right = "auto"),
        (C = "bottom");
    }
    k ? o.arrow.classList.add("driver-popover-arrow-none") : ye(r, C, e);
  }
  function ye(e, t, o) {
    const n = d("popover");
    if (!n) return;
    const p = o.getBoundingClientRect(),
      r = Q(),
      f = n.arrow,
      w = r.width,
      i = window.innerWidth,
      h = p.width,
      a = p.left,
      l = r.height,
      c = window.innerHeight,
      m = p.top,
      g = p.height;
    f.className = "driver-popover-arrow";
    let u = t,
      v = e;
    t === "top"
      ? (a + h <= 0
          ? ((u = "right"), (v = "end"))
          : a + h - w <= 0 && ((u = "top"), (v = "start")),
        a >= i
          ? ((u = "left"), (v = "end"))
          : a + w >= i && ((u = "top"), (v = "end")))
      : t === "bottom"
      ? (a + h <= 0
          ? ((u = "right"), (v = "start"))
          : a + h - w <= 0 && ((u = "bottom"), (v = "start")),
        a >= i
          ? ((u = "left"), (v = "start"))
          : a + w >= i && ((u = "bottom"), (v = "end")))
      : t === "left"
      ? (m + g <= 0
          ? ((u = "bottom"), (v = "end"))
          : m + g - l <= 0 && ((u = "left"), (v = "start")),
        m >= c
          ? ((u = "top"), (v = "end"))
          : m + l >= c && ((u = "left"), (v = "end")))
      : t === "right" &&
        (m + g <= 0
          ? ((u = "bottom"), (v = "start"))
          : m + g - l <= 0 && ((u = "right"), (v = "start")),
        m >= c
          ? ((u = "top"), (v = "start"))
          : m + l >= c && ((u = "right"), (v = "end"))),
      u
        ? (f.classList.add(`driver-popover-arrow-side-${u}`),
          f.classList.add(`driver-popover-arrow-align-${v}`))
        : f.classList.add("driver-popover-arrow-none");
  }
  function xe() {
    const e = document.createElement("div");
    e.classList.add("driver-popover");
    const t = document.createElement("div");
    t.classList.add("driver-popover-arrow");
    const o = document.createElement("div");
    o.classList.add("driver-popover-title"),
      (o.style.display = "none"),
      (o.innerText = "Popover Title");
    const n = document.createElement("div");
    n.classList.add("driver-popover-description"),
      (n.style.display = "none"),
      (n.innerText = "Popover description is here");
    const p = document.createElement("button");
    p.classList.add("driver-popover-close-btn"), (p.innerHTML = "&times;");
    const r = document.createElement("div");
    r.classList.add("driver-popover-footer");
    const f = document.createElement("span");
    f.classList.add("driver-popover-progress-text"), (f.innerText = "");
    const w = document.createElement("span");
    w.classList.add("driver-popover-navigation-btns");
    const i = document.createElement("button");
    i.classList.add("driver-popover-prev-btn"),
      (i.innerHTML = "&larr; Previous");
    const h = document.createElement("button");
    return (
      h.classList.add("driver-popover-next-btn"),
      (h.innerHTML = "Next &rarr;"),
      w.appendChild(i),
      w.appendChild(h),
      r.appendChild(f),
      r.appendChild(w),
      e.appendChild(p),
      e.appendChild(t),
      e.appendChild(o),
      e.appendChild(n),
      e.appendChild(r),
      {
        wrapper: e,
        arrow: t,
        title: o,
        description: n,
        footer: r,
        previousButton: i,
        nextButton: h,
        closeButton: p,
        footerButtons: w,
        progress: f,
      }
    );
  }
  function Ce() {
    var t;
    const e = d("popover");
    e && ((t = e.wrapper.parentElement) == null || t.removeChild(e.wrapper));
  }
  const Se = "";
  function be(e = {}) {
    z(e);
    function t() {
      s("allowClose") && h();
    }
    function o() {
      const a = d("activeIndex"),
        l = s("steps") || [];
      if (typeof a > "u") return;
      const c = a + 1;
      l[c] ? i(c) : h();
    }
    function n() {
      const a = d("activeIndex"),
        l = s("steps") || [];
      if (typeof a > "u") return;
      const c = a - 1;
      l[c] ? i(c) : h();
    }
    function p(a) {
      (s("steps") || [])[a] ? i(a) : h();
    }
    function r() {
      var v;
      if (d("__transitionCallback")) return;
      const l = d("activeIndex"),
        c = d("activeStep"),
        m = d("activeElement");
      if (typeof l > "u" || typeof c > "u" || typeof d("activeIndex") > "u")
        return;
      const u =
        ((v = c.popover) == null ? void 0 : v.onPrevClick) || s("onPrevClick");
      if (u) return u(m, c, { config: s(), state: d() });
      n();
    }
    function f() {
      var u;
      if (d("__transitionCallback")) return;
      const l = d("activeIndex"),
        c = d("activeStep"),
        m = d("activeElement");
      if (typeof l > "u" || typeof c > "u") return;
      const g =
        ((u = c.popover) == null ? void 0 : u.onNextClick) || s("onNextClick");
      if (g) return g(m, c, { config: s(), state: d() });
      o();
    }
    function w() {
      d("isInitialized") ||
        (b("isInitialized", !0),
        document.body.classList.add(
          "driver-active",
          s("animate") ? "driver-fade" : "driver-simple"
        ),
        ge(),
        N("overlayClick", t),
        N("escapePress", t),
        N("arrowLeftPress", r),
        N("arrowRightPress", f));
    }
    function i(a = 0) {
      var B, A, M, R, U, ee, te, oe;
      const l = s("steps");
      if (!l) {
        console.error("No steps to drive through"), h();
        return;
      }
      if (!l[a]) {
        h();
        return;
      }
      b("activeIndex", a);
      const c = l[a],
        m = l[a + 1],
        g = l[a - 1],
        u =
          ((B = c.popover) == null ? void 0 : B.doneBtnText) ||
          s("doneBtnText") ||
          "Done",
        v = s("allowClose"),
        P =
          typeof ((A = c.popover) == null ? void 0 : A.showProgress) < "u"
            ? (M = c.popover) == null
              ? void 0
              : M.showProgress
            : s("showProgress"),
        k = (
          ((R = c.popover) == null ? void 0 : R.progressText) ||
          s("progressText") ||
          "{{current}} de {{total}}"
        )
          .replace("{{current}}", `${a + 1}`)
          .replace("{{total}}", `${l.length}`),
        C =
          ((U = c.popover) == null ? void 0 : U.showButtons) ||
          s("showButtons"),
        y = ["next", "previous", ...(v ? ["close"] : [])].filter(
          (Pe) => !(C != null && C.length) || C.includes(Pe)
        ),
        x =
          ((ee = c.popover) == null ? void 0 : ee.onNextClick) ||
          s("onNextClick"),
        H =
          ((te = c.popover) == null ? void 0 : te.onPrevClick) ||
          s("onPrevClick"),
        E =
          ((oe = c.popover) == null ? void 0 : oe.onCloseClick) ||
          s("onCloseClick");
      X({
        ...c,
        popover: {
          showButtons: y,
          nextBtnText: m ? void 0 : u,
          disableButtons: [...(g ? [] : ["previous"])],
          showProgress: P,
          progressText: k,
          onNextClick:
            x ||
            (() => {
              m ? i(a + 1) : h();
            }),
          onPrevClick:
            H ||
            (() => {
              i(a - 1);
            }),
          onCloseClick:
            E ||
            (() => {
              h();
            }),
          ...((c == null ? void 0 : c.popover) || {}),
        },
      });
    }
    function h(a = !0) {
      const l = d("activeElement"),
        c = d("activeStep"),
        m = s("onDestroyStarted");
      if (a && m) {
        const v = !l || (l == null ? void 0 : l.id) === "driver-dummy-element";
        m(v ? void 0 : l, c, { config: s(), state: d() });
        return;
      }
      const g = (c == null ? void 0 : c.onDeselected) || s("onDeselected"),
        u = s("onDestroyed");
      if (
        (document.body.classList.remove(
          "driver-active",
          "driver-fade",
          "driver-simple"
        ),
        we(),
        Ce(),
        fe(),
        pe(),
        se(),
        re(),
        l && c)
      ) {
        const v = l.id === "driver-dummy-element";
        g && g(v ? void 0 : l, c, { config: s(), state: d() }),
          u && u(v ? void 0 : l, c, { config: s(), state: d() });
      }
    }
    return {
      isActive: () => d("isInitialized") || !1,
      refresh: $,
      drive: (a = 0) => {
        w(), i(a);
      },
      setConfig: z,
      getConfig: s,
      getState: d,
      getActiveIndex: () => d("activeIndex"),
      getActiveStep: () => d("activeStep"),
      getActiveElement: () => d("activeElement"),
      getPreviousElement: () => d("previousElement"),
      getPreviousStep: () => d("previousStep"),
      moveNext: o,
      movePrevious: n,
      moveTo: p,
      hasNextStep: () => {
        const a = s("steps") || [],
          l = d("activeIndex");
        return l !== void 0 && a[l + 1];
      },
      hasPreviousStep: () => {
        const a = s("steps") || [],
          l = d("activeIndex");
        return l !== void 0 && a[l - 1];
      },
      highlight: (a) => {
        w(),
          X({
            ...a,
            popover: a.popover
              ? {
                  showButtons: [],
                  showProgress: !1,
                  progressText: "",
                  ...a.popover,
                }
              : void 0,
          });
      },
      destroy: () => {
        h(!1);
      },
    };
  }
  return (
    (I.driver = be),
    Object.defineProperty(I, Symbol.toStringTag, { value: "Module" }),
    I
  );
})({});
