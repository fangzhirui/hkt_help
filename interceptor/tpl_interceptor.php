<?php

require_once('/var/www/inc.php');
require_once($CLMS_CFG->portal_root . '/lib/lms_smarty.php');

$url = "https://login.uat.hkteducation.com/login/Authn/UserPassword";

$smarty = lms_init_smarty($CLMS_CFG->hkt_root . '/portal/hkt_help/zh');
$smarty->error_reporting = E_ALL & ~E_NOTICE;

switch($CLMS_USER->role){
	
	case 8:
		$smarty->display('help_admin.tpl');
		break;
	case 4:
		$smarty->display('help_teacher.tpl');
		break;
	case 2:
		$smarty->display('help_student.tpl');
		break;
	case 1:
		$smarty->display('help_parent.tpl');
		break;
	default:
		header("location: " . $url);
}
/*
if ( $CLMS_USER->role == 8 ) {
	$smarty->display('help_admin.tpl');
}
else if ( $CLMS_USER->role == 4 ) {
    $smarty->display('help_teacher.tpl');
}
else if ( $CLMS_USER->role == 2 ) {
	if($_GET['role'] == "Student")
		$smarty->display('help_student.tpl');
	else if($_GET['role'] == "Parent")
		$smarty->display('help_parent.tpl');
	else
		header("location: " . $url);
} else {
	echo $CLMS_USER->role; 
}
*/
?>
