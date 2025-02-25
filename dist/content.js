!function() {
    "use strict";
    var e = ".opblock-tag-section", n = ".opblock-tag", o = "is-open", t = "wrapper", c = function(e, n) {
        return e.querySelectorAll(n);
    };
    new MutationObserver((function(r) {
        r.forEach((function(r) {
            r.addedNodes.forEach((function(r) {
                if (r instanceof HTMLElement) {
                    var i = c(r, e);
                    r.className === t && i.length && c(document, e).forEach((function(e) {
                        if (c = o, !e.classList.contains(c)) {
                            var t = e.querySelector(n);
                            null == t || t.click();
                        }
                        var c;
                    }));
                }
            }));
        }));
    })).observe(document.body, {
        childList: !0,
        subtree: !0
    });
}();
//# sourceMappingURL=content.js.map
