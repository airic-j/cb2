<?php
if (isset($_POST['inpHtml'])) {
	session_start(); 
	$_SESSION['content'] = $_POST['inpHtml'];
	header("Location: example2.php");
}
?>

<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <link rel="shortcut icon" href="#" /> 
     
    <link href="assets/minimalist-blocks/content.css" rel="stylesheet" type="text/css" />
    <link href="contentbuilder/contentbuilder.css" rel="stylesheet" type="text/css" />

    <style>
        .container {  margin: 120px auto; max-width: 800px; width:100%; padding:0 35px; box-sizing: border-box;}
    </style>
</head>
<body>

<div class="container">
    <?php
	session_start(); 
	if(empty($_SESSION['content'])==true) {
		/* Optional initial content */
		echo '<div class="row clearfix">
			<div class="column full">
				<h2 class="size-32" style="text-align: center;">Simply Beautiful</h2>
			</div>
		</div>
		<div class="row clearfix">
			<div class="column full">
				<p class="size-16" style="text-align: center; letter-spacing: 3px;">( SOMETHING TO SHARE )</p>
			</div>
		</div>
		<div class="row clearfix">
			<div class="column full">
				<div class="spacer height-80"></div>
			</div>
		</div>
		<div class="row clearfix">
			<div class="column half">
				<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus leo ante, consectetur sit amet vulputate vel.</p>
			</div>
			<div class="column half">
				<p style="text-align: justify;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus leo ante, consectetur sit amet vulputate vel.</p>
			</div>
		</div>';
	} else {
		echo $_SESSION['content'];
	}
    ?>
</div>

<!-- Hidden Form Fields to post content -->
<form id="form1" method="post" style="display:none">
	<input type="hidden" id="inpHtml" name="inpHtml" />
	<input type="submit" id="btnPost" value="submit" />
</form>

<div class="is-tool" style="position:fixed;width:210px;height:50px;border:none;top:30px;bottom:auto;left:auto;right:30px;text-align:right;display:block">
    <button id="btnViewSnippets" class="classic" style="width:70px;height:50px;">+ Add</button>
    <button id="btnViewHtml" class="classic" style="width:70px;height:50px;">HTML</button>
	<button id="btnSave" class="classic" style="width:70px;height:50px;">SAVE</button>
</div>

<script src="contentbuilder/jquery.min.js" type="text/javascript"></script>
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
            container: '.container'
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
    });

	function save(obj) {

		$(".container").saveimages({
			handler: 'saveimage.php', /* handler for base64 image saving */
			onComplete: function () {

				//Get html
				var html = obj.html(); //Get content

				//Submit the html to the server for saving. For example, if you're using html form:
				$('#inpHtml').val(html);
				$('#btnPost').click();

			}
		});
		$(".container").data('saveimages').save();

		$("html").fadeOut(1000);
	}

</script>

</body>
</html>
