
<?php

	require_once(dirname(__FILE__) . '/../../../inc.php');
	function isIn($value, $list){
		if($list == NULL)
			return false;
		$num = count($list);
		$re = -1;
		for($i=0;$i<$num;$i++){
			$re = strcmp($list[$i], $value);
			if($re == 0)
				return TRUE;
		}
		return FALSE;
	}

	if(isset($_GET['fname'])){
		$fname = base64_decode(urldecode($_GET['fname']));
		$txt = '{"co-launch.4.zh.pdf":{"path":"/resources/training/co-launch/co-launch.4.zh.pdf","auth":[4]},"mobile_learning_user_guild.4.zh.pdf":{"path":"/resources/training/mobile_learning_user_guild/mobile_learning_user_guild.4.zh.pdf","auth":[4]},"new_feature_intro.8.zh.pdf":{"path":"/resources/training/new_feature_intro/new_feature_intro.8.zh.pdf","auth":[8]},"new_year_upgrade.8.zh.pdf":{"path":"/resources/training/new_year_upgrade/new_year_upgrade.8.zh.pdf","auth":[8]},"parent_app_training_notes.4.zh.pdf":{"path":"/resources/training/parent_app_training_notes/parent_app_training_notes.4.zh.pdf","auth":[4]},"parent_app_training_notes.8.zh.pdf":{"path":"/resources/training/parent_app_training_notes/parent_app_training_notes.8.zh.pdf","auth":[8]},"preparation_tips.4.zh.pdf":{"path":"/resources/training/preparation_tips/preparation_tips.4.zh.pdf","auth":[4]},"school_channel.4.zh.pdf":{"path":"/resources/training/school_channel/school_channel.4.zh.pdf","auth":[4]},"training_note_als.4.zh.pdf":{"path":"/resources/training/training_note_als/training_note_als.4.zh.pdf","auth":[4]},"training_note_als_ios.4.zh.pdf":{"path":"/resources/training/training_note_als_ios/training_note_als_ios.4.zh.pdf","auth":[4]},"training_notes_cls.4.zh.pdf":{"path":"/resources/training/training_note_cls/training_notes_cls.4.zh.pdf","auth":[4]},"training_notes_cls.8.zh.pdf":{"path":"/resources/training/training_note_cls/training_notes_cls.8.zh.pdf","auth":[8]},"training_note_mdm.4.zh.pdf":{"path":"/resources/training/training_note_mdm/training_note_mdm.4.zh.pdf","auth":[4]},"update_app.4.zh.pdf":{"path":"/resources/training/update_app/update_app.4.zh.pdf","auth":[4]}}';

		$ix = json_decode($txt, true);
		if($ix[$fname] != NULL && isIn($CLMS_USER->role, $ix[$fname]['auth'])){
			header("location: " . $CLMS_CFG->wwwroot. '/hkt/portal/hkt_help' . $ix[$fname]['path']);
		} else {
			header("location: " . $CLMS_CFG->idp_page);
		}
	} else {
		header("location: " . $CLMS_CFG->idp_page);
	}

?>
