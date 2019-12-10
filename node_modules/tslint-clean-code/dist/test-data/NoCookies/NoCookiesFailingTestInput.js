function documentFunction() {
    return window.document;
}
document.cookie = '...';
this.document.cookie = '...';
window.document.cookie = '...';
documentFunction().cookie = '...';
var doc = document;
doc.cookie = '...';
//# sourceMappingURL=NoCookiesFailingTestInput.js.map