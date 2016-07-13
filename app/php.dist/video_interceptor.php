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

	$txt = '{"3.1.48.zh.mp4":{"path":"/resources/video/als/use_als/als_elearning_sys/3.1/3.1.48.zh.mp4","auth":[4,8]},"3.2.48.zh.mp4":{"path":"/resources/video/als/use_als/als_elearning_sys/3.2/3.2.48.zh.mp4","auth":[4,8]},"3.3.48.zh.mp4":{"path":"/resources/video/als/use_als/als_elearning_sys/3.3/3.3.48.zh.mp4","auth":[4,8]},"3.4.48.zh.mp4":{"path":"/resources/video/als/use_als/als_elearning_sys/3.4/3.4.48.zh.mp4","auth":[4,8]},"3.5.48.zh.mp4":{"path":"/resources/video/als/use_als/als_elearning_sys/3.5/3.5.48.zh.mp4","auth":[4,8]},"3.6.48.zh.mp4":{"path":"/resources/video/als/use_als/als_elearning_sys/3.6/3.6.48.zh.mp4","auth":[4,8]},"3.7.48.zh.mp4":{"path":"/resources/video/als/use_als/als_elearning_sys/3.7/3.7.48.zh.mp4","auth":[4,8]},"3.8.48.zh.mp4":{"path":"/resources/video/als/use_als/als_elearning_sys/3.8/3.8.48.zh.mp4","auth":[4,8]},"3.9.48.zh.mp4":{"path":"/resources/video/als/use_als/als_elearning_sys/3.9/3.9.48.zh.mp4","auth":[4,8]},"1.1a.48.zh.mp4":{"path":"/resources/video/diytools/login_diytools/login/1.1a/1.1a.48.zh.mp4","auth":[4,8]},"1.1b.48.zh.mp4":{"path":"/resources/video/diytools/login_diytools/login/1.1b/1.1b.48.zh.mp4","auth":[4,8]},"1.2.48.zh.mp4":{"path":"/resources/video/diytools/login_diytools/login/1.2/1.2.48.zh.mp4","auth":[4,8]},"1.3.48.zh.mp4":{"path":"/resources/video/diytools/login_diytools/login/1.3/1.3.48.zh.mp4","auth":[4,8]},"1.4.48.zh.mp4":{"path":"/resources/video/diytools/login_diytools/others/1.4/1.4.48.zh.mp4","auth":[4,8]},"1.5.48.zh.mp4":{"path":"/resources/video/diytools/login_diytools/others/1.5/1.5.48.zh.mp4","auth":[4,8]},"1.6.48.zh.mp4":{"path":"/resources/video/diytools/login_diytools/others/1.6/1.6.48.zh.mp4","auth":[4,8]},"1.7.48.zh.mp4":{"path":"/resources/video/diytools/login_diytools/others/1.7/1.7.48.zh.mp4","auth":[4,8]},"2.13.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_drawing/2.13/2.13.48.zh.mp4","auth":[4,8]},"2.14.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_drawing/2.14/2.14.48.zh.mp4","auth":[4,8]},"2.15.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_drawing/2.15/2.15.48.zh.mp4","auth":[4,8]},"2.16.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_drawing/2.16/2.16.48.zh.mp4","auth":[4,8]},"2.17.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_drawing/2.17/2.17.48.zh.mp4","auth":[4,8]},"2.18.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_drawing/2.18/2.18.48.zh.mp4","auth":[4,8]},"2.19.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_drawing/2.19/2.19.48.zh.mp4","auth":[4,8]},"2.1.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_ebook/2.1/2.1.48.zh.mp4","auth":[4,8]},"2.2.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_ebook/2.2/2.2.48.zh.mp4","auth":[4,8]},"2.3.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_ebook/2.3/2.3.48.zh.mp4","auth":[4,8]},"2.4.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_ebook/2.4/2.4.48.zh.mp4","auth":[4,8]},"2.5.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_ebook/2.5/2.5.48.zh.mp4","auth":[4,8]},"2.6.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_ebook/2.6/2.6.48.zh.mp4","auth":[4,8]},"2.7.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_ebook/2.7/2.7.48.zh.mp4","auth":[4,8]},"2.8.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_ebook/2.8/2.8.48.zh.mp4","auth":[4,8]},"2.10.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_group_card/2.10/2.10.48.zh.mp4","auth":[4,8]},"2.11.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_group_card/2.11/2.11.48.zh.mp4","auth":[4,8]},"2.12.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_group_card/2.12/2.12.48.zh.mp4","auth":[4,8]},"2.9.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_group_card/2.9/2.9.48.zh.mp4","auth":[4,8]},"2.20.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_video_answer/2.20/2.20.48.zh.mp4","auth":[4,8]},"2.21.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_video_answer/2.21/2.21.48.zh.mp4","auth":[4,8]},"2.22.48.zh.mp4":{"path":"/resources/video/diytools/use_diytools/gen_video_answer/2.21/2.22.48.zh.mp4","auth":[4,8]},"5.1.8.en.mp4":{"path":"/resources/video/mdm/use_mdm_admin/mdm_teacher/5.1/5.1.8.en.mp4","auth":[8]},"5.1.8.zh.mp4":{"path":"/resources/video/mdm/use_mdm_admin/mdm_teacher/5.1/5.1.8.zh.mp4","auth":[8]},"5.2.8.en.mp4":{"path":"/resources/video/mdm/use_mdm_admin/mdm_teacher/5.2/5.2.8.en.mp4","auth":[8]},"5.2.8.zh.mp4":{"path":"/resources/video/mdm/use_mdm_admin/mdm_teacher/5.2/5.2.8.zh.mp4","auth":[8]},"5.3.8.en.mp4":{"path":"/resources/video/mdm/use_mdm_admin/mdm_teacher/5.3/5.3.8.en.mp4","auth":[8]},"5.3.8.zh.mp4":{"path":"/resources/video/mdm/use_mdm_admin/mdm_teacher/5.3/5.3.8.zh.mp4","auth":[8]},"5.4.8.en.mp4":{"path":"/resources/video/mdm/use_mdm_admin/mdm_teacher/5.4/5.4.8.en.mp4","auth":[8]},"5.4.8.zh.mp4":{"path":"/resources/video/mdm/use_mdm_admin/mdm_teacher/5.4/5.4.8.zh.mp4","auth":[8]},"5.5.8.en.mp4":{"path":"/resources/video/mdm/use_mdm_admin/mdm_teacher/5.5/5.5.8.en.mp4","auth":[8]},"5.5.8.zh.mp4":{"path":"/resources/video/mdm/use_mdm_admin/mdm_teacher/5.5/5.5.8.zh.mp4","auth":[8]},"5.6.8.en.mp4":{"path":"/resources/video/mdm/use_mdm_admin/mdm_teacher/5.6/5.6.8.en.mp4","auth":[8]},"5.6.8.zh.mp4":{"path":"/resources/video/mdm/use_mdm_admin/mdm_teacher/5.6/5.6.8.zh.mp4","auth":[8]},"5.7.8.en.mp4":{"path":"/resources/video/mdm/use_mdm_admin/mdm_teacher/5.7/5.7.8.en.mp4","auth":[8]},"5.7.8.zh.mp4":{"path":"/resources/video/mdm/use_mdm_admin/mdm_teacher/5.7/5.7.8.zh.mp4","auth":[8]},"4.1.48.zh.mp4":{"path":"/resources/video/mdm/use_mdm_teacher/mdm_teacher/4.1/4.1.48.zh.mp4","auth":[4,8]},"4.10.48.zh.mp4":{"path":"/resources/video/mdm/use_mdm_teacher/mdm_teacher/4.10/4.10.48.zh.mp4","auth":[4,8]},"4.2.48.zh.mp4":{"path":"/resources/video/mdm/use_mdm_teacher/mdm_teacher/4.2/4.2.48.zh.mp4","auth":[4,8]},"4.3.48.zh.mp4":{"path":"/resources/video/mdm/use_mdm_teacher/mdm_teacher/4.3/4.3.48.zh.mp4","auth":[4,8]},"4.4.48.zh.mp4":{"path":"/resources/video/mdm/use_mdm_teacher/mdm_teacher/4.4/4.4.48.zh.mp4","auth":[4,8]},"4.5.48.zh.mp4":{"path":"/resources/video/mdm/use_mdm_teacher/mdm_teacher/4.5/4.5.48.zh.mp4","auth":[4,8]},"4.6.48.zh.mp4":{"path":"/resources/video/mdm/use_mdm_teacher/mdm_teacher/4.6/4.6.48.zh.mp4","auth":[4,8]},"4.7.48.zh.mp4":{"path":"/resources/video/mdm/use_mdm_teacher/mdm_teacher/4.7/4.7.48.zh.mp4","auth":[4,8]},"4.8.48.zh.mp4":{"path":"/resources/video/mdm/use_mdm_teacher/mdm_teacher/4.8/4.8.48.zh.mp4","auth":[4,8]},"4.9.48.zh.mp4":{"path":"/resources/video/mdm/use_mdm_teacher/mdm_teacher/4.9/4.9.48.zh.mp4","auth":[4,8]}}';
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
