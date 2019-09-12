/*
    Button Editor Plugin
*/

(function () {
    var html = '<div class="is-modal buttoneditor">' +
                    '<div style="width:505px;height:620px;background:#fff;position: relative;display: flex;flex-direction: column;align-items: center;padding: 0px;background:#f8f8f8;">' +
                        '<div class="is-modal-bar is-draggable" style="position: absolute;top: 0;left: 0;width: 100%;z-index:1;line-height:1.5;height:32px;">' + _cb.out('Button Editor') +
                            '<div class="is-modal-close" style="z-index:1;width:32px;height:32px;position:absolute;top:0px;right:0px;box-sizing:border-box;padding:0;line-height:32px;font-size: 12px;color:#777;text-align:center;cursor:pointer;">&#10005;</div>' +
                        '</div>' +
                        '<iframe data-width="1440" style="width:100%;height:100%;max-width:1440px;border:none;border-top:32px solid transparent;margin:0;box-sizing:border-box;background:#fff;" src="about:blank"></iframe>' +
                    '</div>' +
                '</div>';

    _cb.addHtml(html);

    var html_button = '<button title="' + _cb.out('Edit Button') + '" class="button-edit" style="display:none;width:37px;height:30px;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.65);width:16px;height:16px;"><use xlink:href="#ion-android-create"></use></svg></button>';
    jQuery("#divLinkTool").prepend(html_button); //add button to existing #divLinkTool

    //Extend onContentClick
    var oldget = _cb.settings.onContentClick;
    _cb.settings.onContentClick = function (e) {

        var ret = oldget.apply(this, arguments);

        if ((jQuery(e.target).prop("tagName").toLowerCase() == 'a' || jQuery(e.target).parents('a').length > 0)) {

            if (jQuery(e.target).css('display') != 'inline') {

                //a button
                jQuery('#divLinkTool button.button-edit').css("display", "block");

                jQuery('#divLinkTool button.button-edit').off('click');
                jQuery('#divLinkTool button.button-edit').on('click', function (e) {

                    var $modal = jQuery('.is-modal.buttoneditor');
                    _cb.showModal($modal);

                    $modal.find('.is-modal-close').on('click', function () {
                        $modal.removeClass('active')
                    });

                    var scriptPath = _cb.getScriptPath();
                    $modal.find('iframe').attr('src', scriptPath + 'plugins/buttoneditor/buttoneditor.html');

                });

            } else {

                //not a button
                jQuery('#divLinkTool button.button-edit').css("display", "none");

            }
        }

        return ret;
    };

})();

