function searchHighlight(scope, input) {
    var pucl = document.getElementById(scope);
    if (!pucl) return;
    var ipcl = document.getElementById(input);
    if (!ipcl) return;

    var keyword = ipcl.value;
    if ("" == keyword) return;
    if (!pucl.innerHTML) return;

    var temp = pucl.innerHTML;
    var htmlReg = new RegExp("\<.*?\>", "i");
    var arrA = new Array();

    for (var i = 0; true; i++) {
        var m = htmlReg.exec(temp);
        if (m) {
            arrA[i] = m;
        } else {
            break;
        }
        temp = temp.replace(m, "{[(" + i + ")]}");
    }
    words = unescape(keyword.replace(/\+/g, ' ')).split(/\s+/);

    for (w = 0; w < words.length; w++) {
        var r = new RegExp("(" + words[w].replace(/[(){}.+*?^$|\\\[\]]/g, "\\$&") + ")", "ig");
        temp = temp.replace(r, "<span class='highlight'>$1</span>");
    }

    for (var i = 0; i < arrA.length; i++) {
        temp = temp.replace("{[(" + i + ")]}", arrA[i]);
    }
    pucl.innerHTML = temp;
}

window.onload = function() {
    searchHighlight("result", "search");
}
