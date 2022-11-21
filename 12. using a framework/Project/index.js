(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
      if (decorator = decorators[i4])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // node_modules/@lit/reactive-element/css-tag.js
  var t = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var e = Symbol();
  var n = /* @__PURE__ */ new WeakMap();
  var s = class {
    constructor(t3, n7, s5) {
      if (this._$cssResult$ = true, s5 !== e)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t3, this.t = n7;
    }
    get styleSheet() {
      let e6 = this.o;
      const s5 = this.t;
      if (t && void 0 === e6) {
        const t3 = void 0 !== s5 && 1 === s5.length;
        t3 && (e6 = n.get(s5)), void 0 === e6 && ((this.o = e6 = new CSSStyleSheet()).replaceSync(this.cssText), t3 && n.set(s5, e6));
      }
      return e6;
    }
    toString() {
      return this.cssText;
    }
  };
  var o = (t3) => new s("string" == typeof t3 ? t3 : t3 + "", void 0, e);
  var r = (t3, ...n7) => {
    const o6 = 1 === t3.length ? t3[0] : n7.reduce((e6, n8, s5) => e6 + ((t4) => {
      if (true === t4._$cssResult$)
        return t4.cssText;
      if ("number" == typeof t4)
        return t4;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(n8) + t3[s5 + 1], t3[0]);
    return new s(o6, t3, e);
  };
  var i = (e6, n7) => {
    t ? e6.adoptedStyleSheets = n7.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n7.forEach((t3) => {
      const n8 = document.createElement("style"), s5 = window.litNonce;
      void 0 !== s5 && n8.setAttribute("nonce", s5), n8.textContent = t3.cssText, e6.appendChild(n8);
    });
  };
  var S = t ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
    let e6 = "";
    for (const n7 of t4.cssRules)
      e6 += n7.cssText;
    return o(e6);
  })(t3) : t3;

  // node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window.trustedTypes;
  var r2 = e2 ? e2.emptyScript : "";
  var h = window.reactiveElementPolyfillSupport;
  var o2 = { toAttribute(t3, i4) {
    switch (i4) {
      case Boolean:
        t3 = t3 ? r2 : null;
        break;
      case Object:
      case Array:
        t3 = null == t3 ? t3 : JSON.stringify(t3);
    }
    return t3;
  }, fromAttribute(t3, i4) {
    let s5 = t3;
    switch (i4) {
      case Boolean:
        s5 = null !== t3;
        break;
      case Number:
        s5 = null === t3 ? null : Number(t3);
        break;
      case Object:
      case Array:
        try {
          s5 = JSON.parse(t3);
        } catch (t4) {
          s5 = null;
        }
    }
    return s5;
  } };
  var n2 = (t3, i4) => i4 !== t3 && (i4 == i4 || t3 == t3);
  var l = { attribute: true, type: String, converter: o2, reflect: false, hasChanged: n2 };
  var a = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
    }
    static addInitializer(t3) {
      var i4;
      null !== (i4 = this.h) && void 0 !== i4 || (this.h = []), this.h.push(t3);
    }
    static get observedAttributes() {
      this.finalize();
      const t3 = [];
      return this.elementProperties.forEach((i4, s5) => {
        const e6 = this._$Ep(s5, i4);
        void 0 !== e6 && (this._$Ev.set(e6, s5), t3.push(e6));
      }), t3;
    }
    static createProperty(t3, i4 = l) {
      if (i4.state && (i4.attribute = false), this.finalize(), this.elementProperties.set(t3, i4), !i4.noAccessor && !this.prototype.hasOwnProperty(t3)) {
        const s5 = "symbol" == typeof t3 ? Symbol() : "__" + t3, e6 = this.getPropertyDescriptor(t3, s5, i4);
        void 0 !== e6 && Object.defineProperty(this.prototype, t3, e6);
      }
    }
    static getPropertyDescriptor(t3, i4, s5) {
      return { get() {
        return this[i4];
      }, set(e6) {
        const r4 = this[t3];
        this[i4] = e6, this.requestUpdate(t3, r4, s5);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t3) {
      return this.elementProperties.get(t3) || l;
    }
    static finalize() {
      if (this.hasOwnProperty("finalized"))
        return false;
      this.finalized = true;
      const t3 = Object.getPrototypeOf(this);
      if (t3.finalize(), this.elementProperties = new Map(t3.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t4 = this.properties, i4 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
        for (const s5 of i4)
          this.createProperty(s5, t4[s5]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i4) {
      const s5 = [];
      if (Array.isArray(i4)) {
        const e6 = new Set(i4.flat(1 / 0).reverse());
        for (const i5 of e6)
          s5.unshift(S(i5));
      } else
        void 0 !== i4 && s5.push(S(i4));
      return s5;
    }
    static _$Ep(t3, i4) {
      const s5 = i4.attribute;
      return false === s5 ? void 0 : "string" == typeof s5 ? s5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
    }
    u() {
      var t3;
      this._$E_ = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t3 = this.constructor.h) || void 0 === t3 || t3.forEach((t4) => t4(this));
    }
    addController(t3) {
      var i4, s5;
      (null !== (i4 = this._$ES) && void 0 !== i4 ? i4 : this._$ES = []).push(t3), void 0 !== this.renderRoot && this.isConnected && (null === (s5 = t3.hostConnected) || void 0 === s5 || s5.call(t3));
    }
    removeController(t3) {
      var i4;
      null === (i4 = this._$ES) || void 0 === i4 || i4.splice(this._$ES.indexOf(t3) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t3, i4) => {
        this.hasOwnProperty(i4) && (this._$Ei.set(i4, this[i4]), delete this[i4]);
      });
    }
    createRenderRoot() {
      var t3;
      const s5 = null !== (t3 = this.shadowRoot) && void 0 !== t3 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
      return i(s5, this.constructor.elementStyles), s5;
    }
    connectedCallback() {
      var t3;
      void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
        var i4;
        return null === (i4 = t4.hostConnected) || void 0 === i4 ? void 0 : i4.call(t4);
      });
    }
    enableUpdating(t3) {
    }
    disconnectedCallback() {
      var t3;
      null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
        var i4;
        return null === (i4 = t4.hostDisconnected) || void 0 === i4 ? void 0 : i4.call(t4);
      });
    }
    attributeChangedCallback(t3, i4, s5) {
      this._$AK(t3, s5);
    }
    _$EO(t3, i4, s5 = l) {
      var e6, r4;
      const h3 = this.constructor._$Ep(t3, s5);
      if (void 0 !== h3 && true === s5.reflect) {
        const n7 = (null !== (r4 = null === (e6 = s5.converter) || void 0 === e6 ? void 0 : e6.toAttribute) && void 0 !== r4 ? r4 : o2.toAttribute)(i4, s5.type);
        this._$El = t3, null == n7 ? this.removeAttribute(h3) : this.setAttribute(h3, n7), this._$El = null;
      }
    }
    _$AK(t3, i4) {
      var s5, e6;
      const r4 = this.constructor, h3 = r4._$Ev.get(t3);
      if (void 0 !== h3 && this._$El !== h3) {
        const t4 = r4.getPropertyOptions(h3), n7 = t4.converter, l5 = null !== (e6 = null !== (s5 = null == n7 ? void 0 : n7.fromAttribute) && void 0 !== s5 ? s5 : "function" == typeof n7 ? n7 : null) && void 0 !== e6 ? e6 : o2.fromAttribute;
        this._$El = h3, this[h3] = l5(i4, t4.type), this._$El = null;
      }
    }
    requestUpdate(t3, i4, s5) {
      let e6 = true;
      void 0 !== t3 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || n2)(this[t3], i4) ? (this._$AL.has(t3) || this._$AL.set(t3, i4), true === s5.reflect && this._$El !== t3 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t3, s5))) : e6 = false), !this.isUpdatePending && e6 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = true;
      try {
        await this._$E_;
      } catch (t4) {
        Promise.reject(t4);
      }
      const t3 = this.scheduleUpdate();
      return null != t3 && await t3, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t3;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t4, i5) => this[i5] = t4), this._$Ei = void 0);
      let i4 = false;
      const s5 = this._$AL;
      try {
        i4 = this.shouldUpdate(s5), i4 ? (this.willUpdate(s5), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
          var i5;
          return null === (i5 = t4.hostUpdate) || void 0 === i5 ? void 0 : i5.call(t4);
        }), this.update(s5)) : this._$Ek();
      } catch (t4) {
        throw i4 = false, this._$Ek(), t4;
      }
      i4 && this._$AE(s5);
    }
    willUpdate(t3) {
    }
    _$AE(t3) {
      var i4;
      null === (i4 = this._$ES) || void 0 === i4 || i4.forEach((t4) => {
        var i5;
        return null === (i5 = t4.hostUpdated) || void 0 === i5 ? void 0 : i5.call(t4);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
    }
    _$Ek() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$E_;
    }
    shouldUpdate(t3) {
      return true;
    }
    update(t3) {
      void 0 !== this._$EC && (this._$EC.forEach((t4, i4) => this._$EO(i4, this[i4], t4)), this._$EC = void 0), this._$Ek();
    }
    updated(t3) {
    }
    firstUpdated(t3) {
    }
  };
  a.finalized = true, a.elementProperties = /* @__PURE__ */ new Map(), a.elementStyles = [], a.shadowRootOptions = { mode: "open" }, null == h || h({ ReactiveElement: a }), (null !== (s2 = globalThis.reactiveElementVersions) && void 0 !== s2 ? s2 : globalThis.reactiveElementVersions = []).push("1.3.4");

  // node_modules/lit-html/lit-html.js
  var t2;
  var i2 = globalThis.trustedTypes;
  var s3 = i2 ? i2.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
  var e3 = `lit$${(Math.random() + "").slice(9)}$`;
  var o3 = "?" + e3;
  var n3 = `<${o3}>`;
  var l2 = document;
  var h2 = (t3 = "") => l2.createComment(t3);
  var r3 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
  var d = Array.isArray;
  var u = (t3) => d(t3) || "function" == typeof (null == t3 ? void 0 : t3[Symbol.iterator]);
  var c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var a2 = />/g;
  var f = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var _ = /'/g;
  var g = /"/g;
  var m = /^(?:script|style|textarea|title)$/i;
  var p = (t3) => (i4, ...s5) => ({ _$litType$: t3, strings: i4, values: s5 });
  var $ = p(1);
  var y = p(2);
  var b = Symbol.for("lit-noChange");
  var w = Symbol.for("lit-nothing");
  var x = /* @__PURE__ */ new WeakMap();
  var T = (t3, i4, s5) => {
    var e6, o6;
    const n7 = null !== (e6 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== e6 ? e6 : i4;
    let l5 = n7._$litPart$;
    if (void 0 === l5) {
      const t4 = null !== (o6 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== o6 ? o6 : null;
      n7._$litPart$ = l5 = new N(i4.insertBefore(h2(), t4), t4, void 0, null != s5 ? s5 : {});
    }
    return l5._$AI(t3), l5;
  };
  var A = l2.createTreeWalker(l2, 129, null, false);
  var E = (t3, i4) => {
    const o6 = t3.length - 1, l5 = [];
    let h3, r4 = 2 === i4 ? "<svg>" : "", d2 = c;
    for (let i5 = 0; i5 < o6; i5++) {
      const s5 = t3[i5];
      let o7, u3, p2 = -1, $2 = 0;
      for (; $2 < s5.length && (d2.lastIndex = $2, u3 = d2.exec(s5), null !== u3); )
        $2 = d2.lastIndex, d2 === c ? "!--" === u3[1] ? d2 = v : void 0 !== u3[1] ? d2 = a2 : void 0 !== u3[2] ? (m.test(u3[2]) && (h3 = RegExp("</" + u3[2], "g")), d2 = f) : void 0 !== u3[3] && (d2 = f) : d2 === f ? ">" === u3[0] ? (d2 = null != h3 ? h3 : c, p2 = -1) : void 0 === u3[1] ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o7 = u3[1], d2 = void 0 === u3[3] ? f : '"' === u3[3] ? g : _) : d2 === g || d2 === _ ? d2 = f : d2 === v || d2 === a2 ? d2 = c : (d2 = f, h3 = void 0);
      const y2 = d2 === f && t3[i5 + 1].startsWith("/>") ? " " : "";
      r4 += d2 === c ? s5 + n3 : p2 >= 0 ? (l5.push(o7), s5.slice(0, p2) + "$lit$" + s5.slice(p2) + e3 + y2) : s5 + e3 + (-2 === p2 ? (l5.push(void 0), i5) : y2);
    }
    const u2 = r4 + (t3[o6] || "<?>") + (2 === i4 ? "</svg>" : "");
    if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [void 0 !== s3 ? s3.createHTML(u2) : u2, l5];
  };
  var C = class {
    constructor({ strings: t3, _$litType$: s5 }, n7) {
      let l5;
      this.parts = [];
      let r4 = 0, d2 = 0;
      const u2 = t3.length - 1, c2 = this.parts, [v2, a3] = E(t3, s5);
      if (this.el = C.createElement(v2, n7), A.currentNode = this.el.content, 2 === s5) {
        const t4 = this.el.content, i4 = t4.firstChild;
        i4.remove(), t4.append(...i4.childNodes);
      }
      for (; null !== (l5 = A.nextNode()) && c2.length < u2; ) {
        if (1 === l5.nodeType) {
          if (l5.hasAttributes()) {
            const t4 = [];
            for (const i4 of l5.getAttributeNames())
              if (i4.endsWith("$lit$") || i4.startsWith(e3)) {
                const s6 = a3[d2++];
                if (t4.push(i4), void 0 !== s6) {
                  const t5 = l5.getAttribute(s6.toLowerCase() + "$lit$").split(e3), i5 = /([.?@])?(.*)/.exec(s6);
                  c2.push({ type: 1, index: r4, name: i5[2], strings: t5, ctor: "." === i5[1] ? M : "?" === i5[1] ? k : "@" === i5[1] ? H : S2 });
                } else
                  c2.push({ type: 6, index: r4 });
              }
            for (const i4 of t4)
              l5.removeAttribute(i4);
          }
          if (m.test(l5.tagName)) {
            const t4 = l5.textContent.split(e3), s6 = t4.length - 1;
            if (s6 > 0) {
              l5.textContent = i2 ? i2.emptyScript : "";
              for (let i4 = 0; i4 < s6; i4++)
                l5.append(t4[i4], h2()), A.nextNode(), c2.push({ type: 2, index: ++r4 });
              l5.append(t4[s6], h2());
            }
          }
        } else if (8 === l5.nodeType)
          if (l5.data === o3)
            c2.push({ type: 2, index: r4 });
          else {
            let t4 = -1;
            for (; -1 !== (t4 = l5.data.indexOf(e3, t4 + 1)); )
              c2.push({ type: 7, index: r4 }), t4 += e3.length - 1;
          }
        r4++;
      }
    }
    static createElement(t3, i4) {
      const s5 = l2.createElement("template");
      return s5.innerHTML = t3, s5;
    }
  };
  function P(t3, i4, s5 = t3, e6) {
    var o6, n7, l5, h3;
    if (i4 === b)
      return i4;
    let d2 = void 0 !== e6 ? null === (o6 = s5._$Cl) || void 0 === o6 ? void 0 : o6[e6] : s5._$Cu;
    const u2 = r3(i4) ? void 0 : i4._$litDirective$;
    return (null == d2 ? void 0 : d2.constructor) !== u2 && (null === (n7 = null == d2 ? void 0 : d2._$AO) || void 0 === n7 || n7.call(d2, false), void 0 === u2 ? d2 = void 0 : (d2 = new u2(t3), d2._$AT(t3, s5, e6)), void 0 !== e6 ? (null !== (l5 = (h3 = s5)._$Cl) && void 0 !== l5 ? l5 : h3._$Cl = [])[e6] = d2 : s5._$Cu = d2), void 0 !== d2 && (i4 = P(t3, d2._$AS(t3, i4.values), d2, e6)), i4;
  }
  var V = class {
    constructor(t3, i4) {
      this.v = [], this._$AN = void 0, this._$AD = t3, this._$AM = i4;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    p(t3) {
      var i4;
      const { el: { content: s5 }, parts: e6 } = this._$AD, o6 = (null !== (i4 = null == t3 ? void 0 : t3.creationScope) && void 0 !== i4 ? i4 : l2).importNode(s5, true);
      A.currentNode = o6;
      let n7 = A.nextNode(), h3 = 0, r4 = 0, d2 = e6[0];
      for (; void 0 !== d2; ) {
        if (h3 === d2.index) {
          let i5;
          2 === d2.type ? i5 = new N(n7, n7.nextSibling, this, t3) : 1 === d2.type ? i5 = new d2.ctor(n7, d2.name, d2.strings, this, t3) : 6 === d2.type && (i5 = new I(n7, this, t3)), this.v.push(i5), d2 = e6[++r4];
        }
        h3 !== (null == d2 ? void 0 : d2.index) && (n7 = A.nextNode(), h3++);
      }
      return o6;
    }
    m(t3) {
      let i4 = 0;
      for (const s5 of this.v)
        void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t3, s5, i4), i4 += s5.strings.length - 2) : s5._$AI(t3[i4])), i4++;
    }
  };
  var N = class {
    constructor(t3, i4, s5, e6) {
      var o6;
      this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t3, this._$AB = i4, this._$AM = s5, this.options = e6, this._$C_ = null === (o6 = null == e6 ? void 0 : e6.isConnected) || void 0 === o6 || o6;
    }
    get _$AU() {
      var t3, i4;
      return null !== (i4 = null === (t3 = this._$AM) || void 0 === t3 ? void 0 : t3._$AU) && void 0 !== i4 ? i4 : this._$C_;
    }
    get parentNode() {
      let t3 = this._$AA.parentNode;
      const i4 = this._$AM;
      return void 0 !== i4 && 11 === t3.nodeType && (t3 = i4.parentNode), t3;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t3, i4 = this) {
      t3 = P(this, t3, i4), r3(t3) ? t3 === w || null == t3 || "" === t3 ? (this._$AH !== w && this._$AR(), this._$AH = w) : t3 !== this._$AH && t3 !== b && this.T(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.k(t3) : u(t3) ? this.S(t3) : this.T(t3);
    }
    j(t3, i4 = this._$AB) {
      return this._$AA.parentNode.insertBefore(t3, i4);
    }
    k(t3) {
      this._$AH !== t3 && (this._$AR(), this._$AH = this.j(t3));
    }
    T(t3) {
      this._$AH !== w && r3(this._$AH) ? this._$AA.nextSibling.data = t3 : this.k(l2.createTextNode(t3)), this._$AH = t3;
    }
    $(t3) {
      var i4;
      const { values: s5, _$litType$: e6 } = t3, o6 = "number" == typeof e6 ? this._$AC(t3) : (void 0 === e6.el && (e6.el = C.createElement(e6.h, this.options)), e6);
      if ((null === (i4 = this._$AH) || void 0 === i4 ? void 0 : i4._$AD) === o6)
        this._$AH.m(s5);
      else {
        const t4 = new V(o6, this), i5 = t4.p(this.options);
        t4.m(s5), this.k(i5), this._$AH = t4;
      }
    }
    _$AC(t3) {
      let i4 = x.get(t3.strings);
      return void 0 === i4 && x.set(t3.strings, i4 = new C(t3)), i4;
    }
    S(t3) {
      d(this._$AH) || (this._$AH = [], this._$AR());
      const i4 = this._$AH;
      let s5, e6 = 0;
      for (const o6 of t3)
        e6 === i4.length ? i4.push(s5 = new N(this.j(h2()), this.j(h2()), this, this.options)) : s5 = i4[e6], s5._$AI(o6), e6++;
      e6 < i4.length && (this._$AR(s5 && s5._$AB.nextSibling, e6), i4.length = e6);
    }
    _$AR(t3 = this._$AA.nextSibling, i4) {
      var s5;
      for (null === (s5 = this._$AP) || void 0 === s5 || s5.call(this, false, true, i4); t3 && t3 !== this._$AB; ) {
        const i5 = t3.nextSibling;
        t3.remove(), t3 = i5;
      }
    }
    setConnected(t3) {
      var i4;
      void 0 === this._$AM && (this._$C_ = t3, null === (i4 = this._$AP) || void 0 === i4 || i4.call(this, t3));
    }
  };
  var S2 = class {
    constructor(t3, i4, s5, e6, o6) {
      this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t3, this.name = i4, this._$AM = e6, this.options = o6, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = w;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3, i4 = this, s5, e6) {
      const o6 = this.strings;
      let n7 = false;
      if (void 0 === o6)
        t3 = P(this, t3, i4, 0), n7 = !r3(t3) || t3 !== this._$AH && t3 !== b, n7 && (this._$AH = t3);
      else {
        const e7 = t3;
        let l5, h3;
        for (t3 = o6[0], l5 = 0; l5 < o6.length - 1; l5++)
          h3 = P(this, e7[s5 + l5], i4, l5), h3 === b && (h3 = this._$AH[l5]), n7 || (n7 = !r3(h3) || h3 !== this._$AH[l5]), h3 === w ? t3 = w : t3 !== w && (t3 += (null != h3 ? h3 : "") + o6[l5 + 1]), this._$AH[l5] = h3;
      }
      n7 && !e6 && this.P(t3);
    }
    P(t3) {
      t3 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t3 ? t3 : "");
    }
  };
  var M = class extends S2 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    P(t3) {
      this.element[this.name] = t3 === w ? void 0 : t3;
    }
  };
  var R = i2 ? i2.emptyScript : "";
  var k = class extends S2 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    P(t3) {
      t3 && t3 !== w ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
    }
  };
  var H = class extends S2 {
    constructor(t3, i4, s5, e6, o6) {
      super(t3, i4, s5, e6, o6), this.type = 5;
    }
    _$AI(t3, i4 = this) {
      var s5;
      if ((t3 = null !== (s5 = P(this, t3, i4, 0)) && void 0 !== s5 ? s5 : w) === b)
        return;
      const e6 = this._$AH, o6 = t3 === w && e6 !== w || t3.capture !== e6.capture || t3.once !== e6.once || t3.passive !== e6.passive, n7 = t3 !== w && (e6 === w || o6);
      o6 && this.element.removeEventListener(this.name, this, e6), n7 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
    }
    handleEvent(t3) {
      var i4, s5;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s5 = null === (i4 = this.options) || void 0 === i4 ? void 0 : i4.host) && void 0 !== s5 ? s5 : this.element, t3) : this._$AH.handleEvent(t3);
    }
  };
  var I = class {
    constructor(t3, i4, s5) {
      this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3) {
      P(this, t3);
    }
  };
  var z = window.litHtmlPolyfillSupport;
  null == z || z(C, N), (null !== (t2 = globalThis.litHtmlVersions) && void 0 !== t2 ? t2 : globalThis.litHtmlVersions = []).push("2.2.7");

  // node_modules/lit-element/lit-element.js
  var l3;
  var o4;
  var s4 = class extends a {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t3, e6;
      const i4 = super.createRenderRoot();
      return null !== (t3 = (e6 = this.renderOptions).renderBefore) && void 0 !== t3 || (e6.renderBefore = i4.firstChild), i4;
    }
    update(t3) {
      const i4 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = T(i4, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t3;
      super.connectedCallback(), null === (t3 = this._$Do) || void 0 === t3 || t3.setConnected(true);
    }
    disconnectedCallback() {
      var t3;
      super.disconnectedCallback(), null === (t3 = this._$Do) || void 0 === t3 || t3.setConnected(false);
    }
    render() {
      return b;
    }
  };
  s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
  var n4 = globalThis.litElementPolyfillSupport;
  null == n4 || n4({ LitElement: s4 });
  (null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.2.2");

  // node_modules/@lit/reactive-element/decorators/custom-element.js
  var n5 = (n7) => (e6) => "function" == typeof e6 ? ((n8, e7) => (window.customElements.define(n8, e7), e7))(n7, e6) : ((n8, e7) => {
    const { kind: t3, elements: i4 } = e7;
    return { kind: t3, elements: i4, finisher(e8) {
      window.customElements.define(n8, e8);
    } };
  })(n7, e6);

  // node_modules/@lit/reactive-element/decorators/property.js
  var i3 = (i4, e6) => "method" === e6.kind && e6.descriptor && !("value" in e6.descriptor) ? { ...e6, finisher(n7) {
    n7.createProperty(e6.key, i4);
  } } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e6.key, initializer() {
    "function" == typeof e6.initializer && (this[e6.key] = e6.initializer.call(this));
  }, finisher(n7) {
    n7.createProperty(e6.key, i4);
  } };
  function e4(e6) {
    return (n7, t3) => void 0 !== t3 ? ((i4, e7, n8) => {
      e7.constructor.createProperty(n8, i4);
    })(e6, n7, t3) : i3(e6, n7);
  }

  // node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  var n6;
  var e5 = null != (null === (n6 = window.HTMLSlotElement) || void 0 === n6 ? void 0 : n6.prototype.assignedElements) ? (o6, n7) => o6.assignedElements(n7) : (o6, n7) => o6.assignedNodes(n7).filter((o7) => o7.nodeType === Node.ELEMENT_NODE);

  // index.ts
  var TodoApp = class extends s4 {
    constructor() {
      super(...arguments);
      this.todos = JSON.parse(localStorage.getItem("todos") ?? "[]");
    }
    AddTodo(e6) {
      if (e6.key != "Enter")
        return;
      this.todos.push(e6.target.value);
      e6.target.value = "";
      this.requestUpdate();
    }
    updated() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    }
    render() {
      return $`
            <input class="new-todo" placeholder="Add a todo item..." @keydown="${this.AddTodo}">

            <ul class="todos">
                ${this.todos.map((todo, index) => $`
                <li>
                    <todo-item todo="${todo}" index="${index}"></todo-item>
                </li>
                `)}
            </ul>
        `;
    }
  };
  TodoApp.styles = r`
        :host {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;

            width: 80%;
            margin: auto;

            padding: 2rem;
        }

        .new-todo {
            height: 3rem;

            font-size: 1.5rem;

            border: solid 0.1rem cornflowerblue;
            border-radius: 0.5rem;

            padding: 0.5rem;
            box-sizing: border-box;

            transition: box-shadow 0.1s;
        }

        .new-todo:focus {
            outline: none;
            box-shadow: 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 0.5);
        }

        .new-todo::placeholder {
            color: rgb(103, 103, 103);
        }

        .todos {
            list-style-type: none;

            padding-left: 0.5rem;
        }
    `;
  TodoApp = __decorateClass([
    n5("todo-app")
  ], TodoApp);
  var TodoItem = class extends s4 {
    ToggleDone(e6) {
      this.classList.toggle("done", e6.target.checked);
    }
    UpdateTodo(e6) {
      var app = this.parentElement;
      app.todos[this.index] = e6.target.value;
      app.requestUpdate();
    }
    render() {
      return $`
            <input class="done-checkbox" type="checkbox" @input="${this.ToggleDone}">
            <input class="todo" value="${this.todo}" @input="${this.UpdateTodo}">
        `;
    }
  };
  TodoItem.styles = r`
        :host {
            display: flex;
            gap: 0.5rem;
        }

        :host(.done) {
            text-decoration: line-through;
        }

        * {
            text-decoration: inherit;
        }

        .todo {
            height: 1.5rem;
            width: 100%;

            font-size: 1rem;

            margin: 0.05rem;

            border: none;
            border-radius: 0.5rem;

            padding: 0.2rem;
            box-sizing: content-box;
        }

        .todo:focus {
            margin: 0;  
            border: solid 0.05rem cornflowerblue;
        }
    `;
  __decorateClass([
    e4()
  ], TodoItem.prototype, "todo", 2);
  __decorateClass([
    e4({ type: Number })
  ], TodoItem.prototype, "index", 2);
  TodoItem = __decorateClass([
    n5("todo-item")
  ], TodoItem);
})();
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
