var hashList = ['video','download'];
var dftSubpage = 0;
var theHash = window.location.hash;
theHash = window.location.hash.substr(1,window.location.hash.length);
var checkHash=0;
for(a=0; a<hashList.length; a++){
  if(theHash == hashList[a]){
    checkHash=1;
    break;
  }
}
if(checkHash == '0'){
  theHash = hashList[dftSubpage];
}
goSubpage(theHash, false);

var freezeBtn=false;
$('.subPageTag li').click(function(){
  if(!$(this).hasClass('active') && !freezeBtn){
    goSubpage($(this).attr('id'), true);
  }
});

function goSubpage(trg, anim){
  var animTime = anim ? 300 : 0;
  freezeBtn=true;
  if(theHash!=trg){
    theHash=trg;
    window.location.hash = '#'+theHash;
  }
  $('.subPageTag li').not('.subPageTag li#'+trg).removeClass('active');
  $('.subPageTag li#'+trg).addClass('active');
  $('.subPages > div > div').not('.subPages > div > div#subpage_'+trg).stop().slideUp(animTime,function(){
    $(this).removeClass('active');
  })
  $('.subPages > div > div#subpage_'+trg).stop().slideDown(animTime,function(){
    $(this).addClass('active');
    collapseBox($('.collapse'),'reset',false);
    freezeBtn=false;
  });

}

$('.collapseBtn').click(function(){
  if($(this).parent().children('.collapseBody').is(":visible")){
    collapseBox($(this).parent(),'close',true);
  }else{
    collapseBox($(this).parent(),'open',true);
  }
});
function collapseBox(trg,act,anim){
  var animTime = anim ? 300 : 0;
  if(act=='close' || act=='reset'){
    trg.children('.collapseBody').stop().slideUp(animTime,function(){
      $(this).parent().removeClass('opened').addClass('closed');
    });
    if(act=='reset'){
      $('.collapse.defaultOpen').children('.collapseBody').stop().slideDown(animTime,function(){
        $(this).parent().removeClass('closed').addClass('opened');
      });
    }
  }else{
    trg.children('.collapseBody').stop().slideDown(animTime,function(){
      $(this).parent().removeClass('closed').addClass('opened');
    });
  }
}

function check_openV(trg){
  $.get(
    "./video_interceptor.php?trg=" + trg,
    function(data){
      if(data == '0'){
        alert("Authen failure");
      } else {
        openVideo(data);
      }
    }
  );
}

function openVideo(pre_text){
  $('body').prepend(pre_text);
  $('video').bind("ended", function() {
      this.currentTime = 0;
    this.pause();
  });
  $('.videoLb').fadeIn(300, function(){
    setTimeout(function(){try{$('.videoLb video').get(0).play()}catch(err){}},1000);
    $('.videoLb .hitArea, .videoLb .closeBtn').click(function(){
      $('.videoLb').fadeOut(300, function(){
        $(this).remove();
      });
    });
  });
}
