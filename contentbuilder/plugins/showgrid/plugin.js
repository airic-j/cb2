/*
Show Grid Plugin
*/

(function () {

    var icon_html = '<svg width="0" height="0" style="position:absolute;display:none;">' +
                    '<defs>' +
                        '<symbol viewBox="0 0 512 512" id="ion-ios-grid-view-outline"><path d="M448 192v-16H336V64h-16v112H192V64h-16v112H64v16h112v128H64v16h112v112h16V336h128v112h16V336h112v-16H336V192h112zM320 320H192V192h128v128z"></path></symbol>' +
                     '</defs>' +
                '</svg>';

    _cb.addHtml(icon_html);

    var css = '<style>' +
            '.container.showgrid > div > div {outline: 1px solid rgba(132, 132, 132, 0.27); outline-offset: 1px;}' +
        '</style>';

    _cb.addCss(css);

    var button_html = '<button id="btnShowGrid" title="Grid Outline">' +
                    '<svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.7);width:14px;height:14px;"><use xlink:href="#ion-ios-grid-view-outline"></use></svg>' +
                '</button>';

    _cb.addButton('showgrid', button_html, '#btnShowGrid', function () {

        showGrid();

    });

    function showGrid() {
        if (jQuery('.container').hasClass('showgrid')) {
            jQuery('.container').removeClass('showgrid');
        } else {
            jQuery('.container').addClass('showgrid');
        }
    }

})();

