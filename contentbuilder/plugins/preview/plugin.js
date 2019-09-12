/*
Preview Plugin
*/

(function () {

  var _screenwidth = jQuery(window).width();
  if (_screenwidth <= 640) return;

  var html =
    '<div class="is-modal previewcontent" style="z-index:10004">' +
    '<div style="width:100%;height:100%;background:#fff;position: relative;display: flex;flex-direction: column;align-items: center;padding: 0px;background:#f8f8f8;">' +
    '<div class="is-modal-bar" style="position: absolute;top: 0;left: 0;width: 100%;z-index:1;line-height:1.5;height:32px;padding:0;">' +
    '<div style="width:100%;height:100%;display:flex;justify-content:center;">' +
    '<div class="size-control" data-width="1440" style="width:1440px;">' +
    '<div class="size-control" data-width="1024" style="width:1024px;">' +
    '<div class="size-control" data-width="768" style="width:768px;">' +
    '<div class="size-control" data-width="425" style="width:425px;">' +
    '<div class="size-control" data-width="375" style="width:375px;">' +
    '<div class="size-control" data-width="320" style="width:320px;">' +
    '<div class="size-control-info">1440px</div>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="is-modal-close" style="z-index:1;width:30px;height:30px;position:absolute;top:0px;right:0px;box-sizing:border-box;padding:0;line-height:30px;font-size: 12px;color:#777;text-align:center;cursor:pointer;"><svg class="is-icon-flex" style="fill:rgba(0, 0, 0, 0.47);width:30px;height:30px;"><use xlink:href="#ion-ios-close-empty"></use></svg></div>' +
    "</div>" +
    '<iframe data-width="1440" style="width:100%;height:100%;max-width:1440px;border:none;border-top:32px solid transparent;margin:0;box-sizing:border-box;background:#fff;" src="about:blank"></iframe>' +
    "</div>" +
    "</div>" +
    '<svg width="0" height="0" style="position:absolute;display:none;">' +
    "<defs>" +
    '<symbol viewBox="0 0 512 512" id="ion-ios-close-empty"><path d="M340.2 160l-84.4 84.3-84-83.9-11.8 11.8 84 83.8-84 83.9 11.8 11.7 84-83.8 84.4 84.2 11.8-11.7-84.4-84.3 84.4-84.2z"></path></symbol>' +
    '<symbol viewBox="0 0 512 512" id="ion-ios-search-strong"><path d="M344.5 298c15-23.6 23.8-51.6 23.8-81.7 0-84.1-68.1-152.3-152.1-152.3C132.1 64 64 132.2 64 216.3c0 84.1 68.1 152.3 152.1 152.3 30.5 0 58.9-9 82.7-24.4l6.9-4.8L414.3 448l33.7-34.3-108.5-108.6 5-7.1zm-43.1-166.8c22.7 22.7 35.2 52.9 35.2 85s-12.5 62.3-35.2 85c-22.7 22.7-52.9 35.2-85 35.2s-62.3-12.5-85-35.2c-22.7-22.7-35.2-52.9-35.2-85s12.5-62.3 35.2-85c22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2z"></path></symbol>' +
    "</defs>" +
    "</svg>";

  _cb.addHtml(html);

  var css =
    "<style>" +
    ".size-control {cursor:pointer;background:#ddd;border-left:#fff 2px solid;border-right:#fff 2px solid;height:100%;display:flex;justify-content:center;}" +
    ".size-control-info {text-align:center;line-height:32px;color:#000;}" +
    "</style>";

  _cb.addCss(css);

  var button =
    '<button class="previewcontent-button" title="Preview" style="font-size:15px;vertical-align:bottom;">' +
    '<svg class="is-icon-flex" style="fill:rgba(0,0,0,0.7);width:19px;height:19px;"><use xlink:href="#ion-eye"></use></svg>' +
    "</button>";

  _cb.addButton("preview", button, ".previewcontent-button", function () {
    var $modal = jQuery(".is-modal.previewcontent");
    $modal.addClass("active");

    $modal.find(".is-modal-close").on("click", function () {
      $modal.removeClass("active");
    });

    var basehref = "";
    var base = parent.document.querySelectorAll("base[href]");
    if (base.length > 0) {
      basehref = '<base href="' + base[0].href + '" />';
    }

    var csslinks = "";
    var styles = parent.document.querySelectorAll("link[href]");
    for (var i = 0; i < styles.length; i++) {
      if (
        styles[i].href.indexOf(".css") != -1 &&
        styles[i].href.indexOf("contentbox.css") == -1 &&
        styles[i].href.indexOf("contentbuilder.css") == -1
      ) {
        csslinks +=
          '<link href="' +
          styles[i].href +
          '" rel="stylesheet" type="text/css" />';
      }
    }

    var jsincludes = "";
    var scripts = parent.document.querySelectorAll("script[src]");
    for (var i = 0; i < scripts.length; i++) {
      if (
        scripts[i].src.indexOf(".js") != -1 &&
        scripts[i].src.indexOf("jquery.min.js") == -1 &&
        scripts[i].src.indexOf("contentbox.js") == -1 &&
        scripts[i].src.indexOf("contentbox.min.js") == -1 &&
        scripts[i].src.indexOf("contentbuilder.js") == -1 &&
        scripts[i].src.indexOf("contentbuilder.min.js") == -1
      ) {
        jsincludes +=
          '<script src="' +
          scripts[i].src +
          '" type="text/javascript"></script>';
      }
    }

    /* Get Page */
    if (parent.$(".is-wrapper").length == 0) {
      var maxwidth = "800px";
      var maxw = parent.$(".is-builder").css("max-width");
      if (!isNaN(parseInt(maxw))) maxwidth = maxw;

      var content = _cb.html();

      var doc = $modal.find("iframe").get(0).contentWindow.document;
      doc.open();
      doc.write(
        "<html>" +
        "<head>" +
        basehref +
        '<meta charset="utf-8">' +
        "<title></title>" +
        csslinks +
        "<style>" +
        ".slider-image { display:block !important; }" +
        ".container {margin:35px auto 0; max-width: " +
        maxwidth +
        "; width:100%; padding:0 35px; box-sizing: border-box;}" +
        "</style>" +
        '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>' +
        "</head>" +
        "<body>" +
        '<div class="container">' +
        content +
        "</div>" +
        jsincludes +
        "</body>" +
        "</html>"
      );
      doc.close();
    } else {
      var content = $(".is-wrapper")
        .data("contentbox")
        .html();

      var doc = $modal.find("iframe").get(0).contentWindow.document;
      doc.open();
      doc.write(
        "<html>" +
        "<head>" +
        basehref +
        '<meta charset="utf-8">' +
        "<title></title>" +
        csslinks +
        "<style>" +
        ".slider-image { display:block !important; }" +
        "</style>" +
        '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>' +
        "</head>" +
        "<body>" +
        '<div class="is-wrapper">' +
        content +
        "</div>" +
        jsincludes +
        "</body>" +
        "</html>"
      );
      doc.close();
    }
    /* /Get Page */

    //Or you can specify your custom preview page:
    //$modal.find('iframe').attr('src','preview.html');

    jQuery(".size-control").on("mouseover", function (e) {
      jQuery(".size-control").css("background", "#ddd");
      jQuery(this).css("background", "#aaa");
      jQuery(this)
        .find(".size-control")
        .css("background", "#aaa");
      jQuery(".size-control-info").css("color", "#fff");

      var w = jQuery(this).data("width");
      jQuery(".size-control-info").html(w + "px");
      e.preventDefault();
      e.stopImmediatePropagation();
    });

    jQuery(".size-control").on("mouseout", function (e) {
      jQuery(".size-control").css("background", "#ddd");
      jQuery(".size-control-info").css("color", "#000");

      var currW = $modal.find("iframe").data("width");
      jQuery(".size-control-info").text(currW + "px");
    });

    jQuery(".size-control").on("click", function (e) {
      var w = jQuery(this).data("width");
      $modal.find("iframe").css("max-width", w + "px");

      $modal.find("iframe").data("width", w);

      e.preventDefault();
      e.stopImmediatePropagation();
    });
  });
})();
