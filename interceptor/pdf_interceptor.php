<?php

require_once('/var/www/inc.php');

$student_list = array("StudentEN", "Student","ParentEN","Parent", "MD_Tutorial", "MD_Tutorial"); //2
$teacher_list = array("Teacher", "TeacherEN", "DIYTools", "TeacherClass", "UserClass", "MDMTeacherEN", "MDMTeacher", "FlippedTeacher"); //4
$admin_list=array("Admin", "SchoolChannel", "MDMAndroidEN", "MDMAndroid", "MDMPushEN", "MDMPush", "MDMIPadEN", "MDMIPad", "BYOD_Admin_Setup_GuideEN", "DEP_Implement_iPad_MacEN", "DEP_Implement_iPad_MacTC", "InstallationGuide_iPadEN", "VPP_Implement_iPad_MacEN", "VPP_Implement_iPad_MacTC");

function isIn($fname, $list){
	$num = count($list);
	$re = -1;
	for($i=0;$i<$num;$i++){
		$re = strcmp($list[$i], $fname);
		if($re == 0)
			return TRUE;
	}
	return FALSE;
}

$url = "https://login.uat.hkteducation.com/login/Authn/UserPassword";
if(isset($_GET['fname'])){
	$fname = $_GET['fname'];
    if($CLMS_USER->role == 1 || $CLMS_USER->role == 2 || $CLMS_USER->role == 4 || $CLMS_USER->role == 8){
        if(isIn($fname, $student_list)){
            header("location: " . $CLMS_CFG->wwwroot . "/hkt/portal/hkt_help/doc/" . $fname . "UM_HKT.pdf");
        } 
        else if(($CLMS_USER->role == 4 || $CLMS_USER->role == 8) && isIn($fname, $teacher_list)){
            header("location: " . $CLMS_CFG->wwwroot . "/hkt/portal/hkt_help/doc/" . $fname . "UM_HKT.pdf");
        } 
        else if($CLMS_USER->role == 8 && isIn($fname, $admin_list)){
            header("location: " . $CLMS_CFG->wwwroot . "/hkt/portal/hkt_help/doc/" . $fname . "UM_HKT.pdf");
        } else {
            header("location: " . $url);
        } 
    } else {
        header("location: " . $url);
    }        
} else {
	header("location: " . $url);
}
?>
