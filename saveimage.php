<?php
header('Cache-Control: no-cache, must-revalidate');

//Specify url path
$path = 'uploads/'; 

//Read image
$count = $_REQUEST['count'];
$b64str = $_REQUEST['hidimg-' . $count]; 
$imgname = $_REQUEST['hidname-' . $count]; 
$imgtype = $_REQUEST['hidtype-' . $count]; 

$customvalue = $_REQUEST['hidcustomval-' . $count]; //Get customvalue  

//Generate random file name here
if($imgtype == 'png'){
	$image = $imgname . '-' . base_convert(rand(),10,36) . '.png'; 
} else {
	$image = $imgname . '-' . base_convert(rand(),10,36) . '.jpg'; 
}



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



//Save image

$success = file_put_contents($pagefolder . $image, base64_decode($b64str)); 
if ($success === FALSE) {

  if (!file_exists($path)) {
    echo "<html><body onload=\"alert('Saving image to folder failed. Folder ".$pagefolder." not exists.')\"></body></html>";
  } else {
    echo "<html><body onload=\"alert('Saving image to folder failed. Please check write permission on " .$pagefolder. "')\"></body></html>";
  }
    
} else {
  //Replace image src with the new saved file
  echo "<html><body onload=\"parent.document.getElementById('img-" . $count . "').setAttribute('src','" . $pagefolder . $image . "');  parent.document.getElementById('img-" . $count . "').removeAttribute('id') \"></body></html>";
}


?>
