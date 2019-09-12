/*
    Word Count Plugin
*/

(function () {

    var html = '<div class="is-modal wordcount" style="z-index:10005">' +
                    '<div style="max-width:300px;height:200px;padding:0;">' +
                        '<div class="is-modal-bar is-draggable" style="height:32px;line-height:1.5;">' + 
                            _cb.out('Word Count') +
                            '<div class="is-modal-close">&#10005;</div>' +
                        '</div>' +
                        '<div style="padding:19px 20px 0;">' +
                            '<div style="line-height:1"><span id="spanWords" style="font-size:60px;font-weight:700;color:#c3c3c3"></span> &nbsp;<span style="letter-spacing: 1px;color: #333;font-size:15px;">words</span></div>' +
                            '<div style="padding:8px 0 0 5px;letter-spacing: 1px;color: #333;font-size:15px;">' +
                                'Characters: <span id="spanChars"></span><br>' +
                                'Characters (no spaces): <span id="spanCharsNoSpaces"></span>' +
                            '</div>' +
                            '<div id="tmp_wordcount" style="width:1px;height:1px;visibility:hidden;""></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<svg width="0" height="0" style="display:none;">' +
                    '<defs>' +
                        '<symbol viewBox="0 0 512 512" id="ion-information"><path d="M288 448V192h-96v16h32v240h-32v16h128v-16zM255.8 144.5c26.6 0 48.2-21.6 48.2-48.2s-21.6-48.2-48.2-48.2-48.2 21.6-48.2 48.2 21.6 48.2 48.2 48.2z"></path></symbol>' +
                    '</defs>' +
                '</svg>';

    _cb.addHtml(html);

    var css = '' +
            '' +
        '';

    _cb.addCss(css);

    var button = '<button class="wordcount-button" title="Word Count" style="font-size:15px;vertical-align:bottom;">' +
                    '<svg class="is-icon-flex" style="fill:rgba(0,0,0,0.7);width:17px;height:17px;"><use xlink:href="#ion-information"></use></svg>' +
                '</button>';

    _cb.addButton('wordcount', button, '.wordcount-button', function () {

        var $modal = jQuery('.is-modal.wordcount');
        _cb.showModal($modal, true);

        jQuery('#tmp_wordcount').html(_cb.html());
        var txt = jQuery.trim(jQuery('#tmp_wordcount').text());
        jQuery('#tmp_wordcount').html('');

        // https://stackoverflow.com/questions/9864644/jquery-character-and-word-count
        var chars = txt.length;
        var charsnospaces = txt.replace(/\s/g, "").length;
        var words = txt.replace(/[^\w ]/g, "").split(/\s+/).length;

        jQuery('#spanWords').text(words);
        jQuery('#spanChars').text(chars);
        jQuery('#spanCharsNoSpaces').text(charsnospaces);

        $modal.find('.is-modal-close').on('click', function () {
            _cb.hideModal($modal);
        });

    });

})();
