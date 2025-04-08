!function() {
    "use strict";
    var n = ".opblock-tag-section", e = ".opblock-tag", o = "is-open", t = "wrapper", r = function(n, e) {
        return n.querySelectorAll(e);
    }, c = function() {
        var t = function() {
            var n = decodeURIComponent(window.location.hash);
            if (!n) return null;
            var e = n.match(/\/([^\/$]+)/);
            return e ? e[1] : null;
        }();
        if (t) {
            var c = function(o) {
                var t = r(document, n), c = null;
                return t.forEach((function(n) {
                    if (!c) {
                        var t = n.querySelector(e);
                        t.innerText.toLowerCase().includes(o) && (c = t);
                    }
                })), c;
            }(t);
            if (c) return void c.click();
        }
        r(document, n).forEach((function(n) {
            if (r = o, !n.classList.contains(r)) {
                var t = n.querySelector(e);
                null == t || t.click();
            }
            var r;
        }));
    };
    new MutationObserver((function(e) {
        e.forEach((function(e) {
            e.addedNodes.forEach((function(e) {
                if (e instanceof HTMLElement) {
                    var o = r(e, n);
                    e.className === t && o.length && c();
                }
            }));
        }));
    })).observe(document.body, {
        childList: !0,
        subtree: !0
    });
}();
//# sourceMappingURL=content.js.map
