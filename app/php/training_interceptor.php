
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
		$txt = '<%= training %>';

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
