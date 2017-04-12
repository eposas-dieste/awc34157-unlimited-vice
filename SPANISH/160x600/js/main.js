var banner={}, B=banner;
window.onload=function(){B.init();}
//optionally set a different border color
B.borderColor='#959595';
//hide reload button once user clicks the legal div to open the legal bubble?
B.hideReloadOnBubbleOpen=true;
//sets 'transformOrigin' of CTA button
B.tOrigin=(302/2)+'px '+(346/2)+'px';
//is there a legal bubble in this particular creative?
B.legalBubble=false;
//initialize ad
B.init=function(){
  var e=[1,[2],3,4,'overlay','flare','flare'];
  var b={x:0, y:0, atlas:true, dimensions:{w:90, h:22}};
  var r={x:0, y:0, scale:0.35, transformOrigin:"15px 21px", reverse:false, hardRefresh:true};
  Main.init(null,null,e,b,'',r,null,null);
  B.prelim();
  F.HDify(['overlay',1,2,3,4]);
}
//set preliminary steps -- has to do with splitImg functions
B.prelim=function(){
  if(B.prelimDone===false){B.setUpDivs();}
  B.prelimDone=true;
}
//animate the banner ad
B.animate=function(){
  A.visible(['back','overlay','flare']);
  B.addScrollableLegal(false);
  // global 'delay'
  var d=3,f=2;
  var flareleft={ystart:500,yend:30};
  var flaretop={xstart:-30,xend:70};
  // flip 'flare' left and set 'flare top'
  TweenLite.set('#flare', {x:flaretop.xstart,scaleX:0.7});
  TweenLite.set('#flare-copy', {rotation:-90,x:-67,y:flareleft.ystart});
  // append cta btn div
  var b=document.createElement('img');
  b.id='btn';
  b.src='img/btn.png';
  b.classList.add('hvr-wobble-horizontal');
  document.body.appendChild(b);
  // animation
  flares(f);
  (function f_in_out(num){
    var n = num;
    A.fadeIn(n,0,function(){
      if(n > 2){flares(f);}
      if(n > 3){
        flares(f);
        showCTA();
        B.showReload(3);
      }
      A.dCall(d,function(){
        if(n < 4){
          A.fadeOut(n,0,function(){
            n++;
            f_in_out(n);
          });
        }
      });
    });
  }(1));
  function showCTA(){
    b.style.visibility='visible';
    TweenLite.from('#btn',0.5,{alpha:0,force3D:false});
  }
  function flares(dur){
    TweenLite.killTweensOf('#flare');
    TweenLite.killTweensOf('#flare-copy');
    // left flare
    TweenLite.to('#flare-copy', dur/4, {alpha:1,onComplete:function(){
      TweenLite.to('#flare-copy', 3*(dur/4), {alpha:0});
    }});
    TweenLite.to('#flare-copy', dur, {y:flareleft.yend,ease:Power1.easeOut,onComplete:function(){TweenLite.set('#flare-copy',{y:flareleft.ystart});}});
    // top flare
    TweenLite.to('#flare', dur/4, {alpha:1,onComplete:function(){
      TweenLite.to('#flare', 3*(dur/4), {alpha:0});
    }});
    TweenLite.to('#flare', dur, {x:flaretop.xend,ease:Power1.easeOut,onComplete:function(){TweenLite.set('#flare',{x:flaretop.xstart});}});
  }
}