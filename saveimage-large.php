<?php
header('Cache-Control: no-cache, must-revalidate');

//Specify url path
$path = 'uploads/'; 


//Get customvalue  
$customvalue = $_REQUEST['hidRefId']; //Custom value (optional). If you set "customval" parameter in ContentBuilder, the value can be read here.


//Check folder. Create if not exist
$pagefolder = $path;
if (!file_exists($pagefolder)) {
	mkdir($pagefolder, 0777);
} 


//Optional: If using customvalue to specify upload folder
if ($customvalue!='') {
  $pagefolder = $path . $customvalue. '/';
  if (!file_exists($pagefolder)) {
	  mkdir($pagefolder, 0777);
  } 
}


$filename = basename($_FILES["fileImage"]["name"]);

$uploadOk = 1;
$imageFileType = strtolower(pathinfo($filename,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
$check = getimagesize($_FILES["fileImage"]["tmp_name"]);
if($check !== false) {
	//echo "File is an image - " . $check["mime"];
	$uploadOk = 1;
} else {
	echo "<html><body onload=\"alert('File is not an image.')\"></body></html>";
	exit();
	$uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
	echo "<html><body onload=\"alert('Sorry, only JPG, JPEG, PNG & GIF files are allowed.')\"></body></html>";
	exit();
    $uploadOk = 0;
}

if ($uploadOk == 0) {
	echo "<html><body onload=\"alert('Sorry, your file was not uploaded.')\"></body></html>";
	exit();
} else {

  $random = base_convert(rand(),10,36) . date("his");
	$pic_type = strtolower(strrchr($_FILES["fileImage"]['name'],"."));
	$pic_name = "original$random$pic_type";
	move_uploaded_file($_FILES["fileImage"]['tmp_name'], $pagefolder . $pic_name);
  
  //Save image
	if (true !== ($pic_error = @image_resize($pagefolder . $pic_name, $pagefolder . "$random$pic_type", 1600, 1600))) { //Resize image to max 1600x1600 to safe size
		echo "<html><body onload=\"alert('".$pic_error."')\"></body></html>";		
		exit();
	}
  
  unlink($pagefolder . $pic_name); //delete original
  
  //Replace image src with the new saved file
  echo "<html><body onload=\"parent.applyLargerImage('" . $pagefolder . "$random$pic_type" . "')\"></body></html>";
  
}


function image_resize($src, $dst, $width, $height){

  //echo "<html><body onload=\"alert('".$dst."')\"></body></html>";
  //exit();
  
  list($w, $h) = getimagesize($src);

  $type = strtolower(substr(strrchr($src,"."),1));
  if($type == 'jpeg') $type = 'jpg';
  switch($type){
    case 'bmp': $img = imagecreatefromwbmp($src); break;
    case 'gif': $img = imagecreatefromgif($src); break;
    case 'jpg': $img = imagecreatefromjpeg($src); break;
    case 'png': $img = imagecreatefrompng($src); break;
    default : return "Unsupported picture type!";
  }

  $ratio = min($width/$w, $height/$h);
  $width = $w * $ratio;
  $height = $h * $ratio;
  $x = 0;

  $new = imagecreatetruecolor($width, $height);

  // preserve transparency
  if($type == "gif" or $type == "png"){
    imagecolortransparent($new, imagecolorallocatealpha($new, 0, 0, 0, 127));
    imagealphablending($new, false);
    imagesavealpha($new, true);
  }

  imagecopyresampled($new, $img, 0, 0, $x, 0, $width, $height, $w, $h);

  switch($type){
    case 'bmp': imagewbmp($new, $dst); break;
    case 'gif': imagegif($new, $dst); break;
    case 'jpg': imagejpeg($new, $dst); break;
    case 'png': imagepng($new, $dst); break;
  }
  return true;
}

?>
