<%@ Page Language="VB"%>
<%@ OutputCache Location="None" VaryByParam="none"%>

<script runat="server">

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        
        If Not Page.IsPostBack Then
            If Not IsNothing(Session("content")) Then
                 litContent.Text = Session("content") 
            Else
                'Optional initial content
                litContent.Text = "<div class=""row clearfix"">" & _
                        "<div class=""column full"">" & _
                            "<h2 class=""size-32"" style=""text-align: center;"">Simply Beautiful</h2>" & _
                        "</div>" & _
                    "</div>" & _
                    "<div class=""row clearfix"">" & _
                        "<div class=""column full"">" & _
                            "<p class=""size-16"" style=""text-align: center; letter-spacing: 3px;"">( SOMETHING TO SHARE )</p>" & _
                        "</div>" & _
                    "</div>" & _
                    "<div class=""row clearfix"">" & _
                        "<div class=""column full"">" & _
                            "<div class=""spacer height-80""></div>" & _
                        "</div>" & _
                    "</div>" & _
                    "<div class=""row clearfix"">" & _
                        "<div class=""column half"">" & _
                            "<p style=""text-align: justify;"">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus leo ante, consectetur sit amet vulputate vel.</p>" & _
                        "</div>" & _
                        "<div class=""column half"">" & _
                            "<p style=""text-align: justify;"">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus leo ante, consectetur sit amet vulputate vel.</p>" & _
                        "</div>" & _
                    "</div>"
            End If

        End If

    End Sub
    
    Protected Sub btnPost_Click(sender As Object, e As System.EventArgs) Handles btnPost.Click

        'Get Submitted Content
        Dim sContent As String = System.Uri.UnescapeDataString(hidContent.Value)
        
        'You can save the content into a database. in this example we just display the content back.
        Session("content") = sContent
        
        Response.Redirect(Request.RawUrl)
       
    End Sub
  
</script>

<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <link href="assets/minimalist-blocks/content.css" rel="stylesheet" type="text/css" />
    <link href="assets/scripts/simplelightbox/simplelightbox.css" rel="stylesheet" type="text/css" />
    <link href="assets/scripts/slick/slick.css" rel="stylesheet" type="text/css" />
    <link href="assets/scripts/slick/slick-theme.css" rel="stylesheet" type="text/css" />

    <link href="contentbuilder/contentbuilder.css" rel="stylesheet" type="text/css" />

    <style>
        .container {  margin: 120px auto; max-width: 800px; width:100%; padding:0 35px; box-sizing: border-box;}
    </style>
</head>
<body>

<div class="container">
    <asp:Literal ID="litContent" runat="server"></asp:Literal>
</div>

<!-- Hidden Form Fields to post content -->
<form id="form1" runat="server" style="display:none">
    <asp:HiddenField ID="hidContent" ClientIDMode="Static" runat="server" />
    <asp:Button ID="btnPost" runat="server" Text="Button" />
</form>

<div class="is-tool" style="position:fixed;width:210px;height:50px;border:none;top:30px;bottom:auto;left:auto;right:30px;text-align:right;display:block">
    <button id="btnViewSnippets" class="classic" style="width:70px;height:50px;">+ Add</button>
    <button id="btnViewHtml" class="classic" style="width:70px;height:50px;">HTML</button>
	<button id="btnSave" class="classic" style="width:70px;height:50px;">SAVE</button>
</div>

<script src="contentbuilder/jquery.min.js" type="text/javascript"></script>
<script src="assets/scripts/simplelightbox/simple-lightbox.min.js" type="text/javascript"></script>
<script src="assets/scripts/slick/slick.min.js" type="text/javascript"></script>

<script src="contentbuilder/contentbuilder.min.js" type="text/javascript"></script>
<script src="contentbuilder/saveimages.js" type="text/javascript"></script>

<!-- Optional: To enable drag & drop blocks -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js" type="text/javascript"></script>
<script src="assets/minimalist-blocks/content.js" type="text/javascript"></script>
<!-- /Optional -->

<script type="text/javascript">

    jQuery(document).ready(function ($) {

        var obj = $.contentbuilder({
            container: '.container',
            largerImageHandler: 'saveimage-large.ashx',
            onRender: function () {
                runPlugins();
            },
            moduleConfig: [{
                "moduleSaveImageHandler": "saveimage-module.ashx" /* for module purpose image saving (ex. slider) */
            }]
        });

        $('#btnViewSnippets').on('click', function () {
            obj.viewSnippets();
        });

        $('#btnViewHtml').on('click', function () {
            obj.viewHtml();
        });

        $('#btnSave').on('click', function () {
            save(obj);
        });

        runPlugins();

    });

    function runPlugins() {
        $('a.is-lightbox').simpleLightbox({ closeText: '<i style="font-size:35px" class="icon ion-ios-close-empty"></i>', navText: ['<i class="icon ion-ios-arrow-left"></i>', '<i class="icon ion-ios-arrow-right"></i>'], disableScroll: false });
    }

    function save(obj) {

        $(".container").saveimages({
            handler: 'saveimage.ashx', /* handler for base64 image saving */
            onComplete: function () {

                //Get html
                var html = obj.html(); //Get content

                //Submit the html to the server for saving.
                $('#hidContent').val(encodeURIComponent(html));
                $('#btnPost').click();

            }
        });
        $(".container").data('saveimages').save();

        $("html").fadeOut(1000);
    }

</script>

</body>
</html>
