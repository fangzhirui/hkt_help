
<?php

	require_once('/var/www/inc.php');
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
		$txt = '{"TeacherClass.48.zh.pdf":{"path":"/resources/download/als/TeacherClass/TeacherClass.48.zh.pdf","auth":[4,8]},"UserClass.48.en.pdf":{"path":"/resources/download/als/UserClass/UserClass.48.en.pdf","auth":[4,8]},"Admin.8.zh.pdf":{"path":"/resources/download/cls/Admin/Admin.8.zh.pdf","auth":[8]},"Parent.148.en.pdf":{"path":"/resources/download/cls/Parent/Parent.148.en.pdf","auth":[1,4,8]},"Parent.148.zh.pdf":{"path":"/resources/download/cls/Parent/Parent.148.zh.pdf","auth":[1,4,8]},"Student.248.en.pdf":{"path":"/resources/download/cls/Student/Student.248.en.pdf","auth":[2,4,8]},"Student.248.zh.pdf":{"path":"/resources/download/cls/Student/Student.248.zh.pdf","auth":[2,4,8]},"Teacher.48.en.pdf":{"path":"/resources/download/cls/Teacher/Teacher.48.en.pdf","auth":[4,8]},"Teacher.48.zh.pdf":{"path":"/resources/download/cls/Teacher/Teacher.48.zh.pdf","auth":[4,8]},"DIYTools.48.zh.pdf":{"path":"/resources/download/diytools/DIYTools/DIYTools.48.zh.pdf","auth":[4,8]},"FlippedTeacher.48.zh.pdf":{"path":"/resources/download/flipped/FlippedTeacher/FlippedTeacher.48.zh.pdf","auth":[4,8]},"BYOD_Admin_Setup_Guide.8.en.pdf":{"path":"/resources/download/mdm/BYOD_Admin_Setup_Guide/BYOD_Admin_Setup_Guide.8.en.pdf","auth":[8]},"DEP_Implement_iPad_Mac.8.en.pdf":{"path":"/resources/download/mdm/DEP_Implement_iPad_Mac/DEP_Implement_iPad_Mac.8.en.pdf","auth":[8]},"DEP_Implement_iPad_Mac.8.zh.pdf":{"path":"/resources/download/mdm/DEP_Implement_iPad_Mac/DEP_Implement_iPad_Mac.8.zh.pdf","auth":[8]},"InstallationGuide_iPad.8.en.pdf":{"path":"/resources/download/mdm/InstallationGuide_iPad/InstallationGuide_iPad.8.en.pdf","auth":[8]},"MDMAndroid.8.en.pdf":{"path":"/resources/download/mdm/MDMAndroid/MDMAndroid.8.en.pdf","auth":[8]},"MDMAndroid.8.zh.pdf":{"path":"/resources/download/mdm/MDMAndroid/MDMAndroid.8.zh.pdf","auth":[8]},"MDMAppleClassroom.8.en.pdf":{"path":"/resources/download/mdm/MDMAppleClassroom/MDMAppleClassroom.8.en.pdf","auth":[8]},"MDMAppleClassroom.8.zh.pdf":{"path":"/resources/download/mdm/MDMAppleClassroom/MDMAppleClassroom.8.zh.pdf","auth":[8]},"MDMIPad.8.en.pdf":{"path":"/resources/download/mdm/MDMIPad/MDMIPad.8.en.pdf","auth":[8]},"MDMIPad.8.zh.pdf":{"path":"/resources/download/mdm/MDMIPad/MDMIPad.8.zh.pdf","auth":[8]},"MDMPush.8.en.pdf":{"path":"/resources/download/mdm/MDMPush/MDMPush.8.en.pdf","auth":[8]},"MDMPush.8.zh.pdf":{"path":"/resources/download/mdm/MDMPush/MDMPush.8.zh.pdf","auth":[8]},"MDMTeacher.48.en.pdf":{"path":"/resources/download/mdm/MDMTeacher/MDMTeacher.48.en.pdf","auth":[4,8]},"MDMTeacher.48.zh.pdf":{"path":"/resources/download/mdm/MDMTeacher/MDMTeacher.48.zh.pdf","auth":[4,8]},"MD_Tutorial.248.en.pdf":{"path":"/resources/download/mdm/MD_Tutorial/MD_Tutorial.248.en.pdf","auth":[2,4,8]},"MD_Tutorial.248.zh.pdf":{"path":"/resources/download/mdm/MD_Tutorial/MD_Tutorial.248.zh.pdf","auth":[2,4,8]},"VPP_Implement_iPad_Mac.8.en.pdf":{"path":"/resources/download/mdm/VPP_Implement_iPad_Mac/VPP_Implement_iPad_Mac.8.en.pdf","auth":[8]},"VPP_Implement_iPad_Mac.8.zh.pdf":{"path":"/resources/download/mdm/VPP_Implement_iPad_Mac/VPP_Implement_iPad_Mac.8.zh.pdf","auth":[8]},"AdminUM.8.zh.pdf":{"path":"/resources/download/parentapp/AdminUM/AdminUM.8.zh.pdf","auth":[8]},"ParentUM.841.zh.pdf":{"path":"/resources/download/parentapp/ParentUM/ParentUM.841.zh.pdf","auth":[8,4,1]},"SchoolChannel.8.zh.pdf":{"path":"/resources/download/sc/SchoolChannel/SchoolChannel.8.zh.pdf","auth":[8]}}';

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
