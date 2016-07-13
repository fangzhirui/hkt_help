<?

	require_once('/var/www/inc.php');

	function isIn($value, $list){
		$num = count($list);
		$re = -1;
		for($i=0;$i<$num;$i++){
			$re = strcmp($list[$i], $value);
			if($re == 0)
				return TRUE;
		}
		return FALSE;
	}

	$txt = '<%= video %>';
	$ix = json_decode($txt, true);

	//$regex = "^[0-9A-Za-z\.]+$";
	$re = 0;

	//if(isset($_GET['trg']) && $CLMS_USER->role.'' && preg_match($regex, $_GET['trg'])){
	if(isset($_GET['trg']) && $CLMS_USER->role){
		$trg = base64_decode(urldecode($_GET['trg']));
		if($ix[$trg] != NULL && isIn($CLMS_USER->role.'', $ix[$trg]['auth'])){
			$re = '<div class="lightbox videoLb">'.'<div class="hitArea"></div>'.'<div><div>'.
				'<video width="800" height="450" controls>'.
				'<source src="/hkt/portal/hkt_help'.$ix[$trg]['path'].'" type="video/mp4">'.
				'<div class="noVideo">'.
				'<span class="en">Your browser does not support this video playback,<br/>please updateyour browser to the latest version.</span>'.
				'<span class="zh">你使用的瀏覽器不支援此影片播放，請將您的瀏覽器更新至最新版本。</span>'.
				'</div>'.'</video>'.'<div class="closeBtn"></div>'.'</div></div>'.
				'</div>';
				echo $re;
		} else {
			echo 0;
		}
	} else {
		echo 0;
	}
?>
