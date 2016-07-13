<?php

require_once('/var/www/inc.php');

$re = 0;
if(isset($_GET['trg'])){
	$trg = $_GET['trg'];
	$re = '<div class="lightbox videoLb">' . '<div class="hitArea"></div>' . '<div><div>'.
			'<video width="800" height="450" controls>'.
			'<source src="../video/'.$trg.'.mp4" type="video/mp4">'.
			'<source src="../video/'.$trg.'.webm" type="video/webm">'.											                            '<source src="../video/'.$trg.'.ogv" type="video/ogg">'.											                            '<div class="noVideo">'.																						                                '<span class="en">Your browser does not support this video playback,<br/>please updateyour browser to the latest version.</span>'.
			'<span class="zh">你使用的瀏覽器不支援此影片播放，請將您的瀏覽器更新至最新版本。</span>'.
			'</div>'.																												                        '</video>'.																												                        '<div class="closeBtn"></div>'.																								                    '</div></div>'.             
			'</div>';
}

if($CLMS_USER->role)
	echo $re;
else
	echo 0;

?>
