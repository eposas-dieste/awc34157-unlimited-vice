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
  var e=[1,[2],3,4,'overlay','flareleft','flaretop'];
  var b={x:0, y:0, atlas:true, dimensions:{w:90, h:22}};
  var r={x:0, y:0, scale:0.5, transformOrigin:"15px 21px", reverse:false, hardRefresh:true};
  Main.init(null,null,e,b,'',r,null,null);
  B.prelim();
  F.HDify(['overlay',1,2,3,4,'flareleft','flaretop']);
}
//set preliminary steps -- has to do with splitImg functions
B.prelim=function(){
  if(B.prelimDone===false){B.setUpDivs();}
  B.prelimDone=true;
}
//animate the banner ad
B.animate=function(){
  A.visible(['back','overlay','flareleft','flaretop']);
  B.addScrollableLegal(false);
  // global 'delay'
  var d=3,f=1;
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
    TweenLite.killTweensOf('#flareleft');
    TweenLite.killTweensOf('#flaretop');
    A.set('flareleft', {alpha:1,x:0,y:0});
    A.set('flaretop', {alpha:1,x:0,y:0});
    // left flare
    A.from('flareleft', dur, {alpha:0,y:50,ease:Power1.easeIn,onComplete:function(){
      A.to('flareleft', dur, {alpha:0.5,y:-75,scaleY:1.5,ease:Power1.easeOut,onComplete:function(){
        TweenLite.to('#flareleft', dur/2, {alpha:0});
      }});
    }});
    // top flare
    A.from('flaretop', dur, {alpha:0,x:-50,ease:Power1.easeIn,onComplete:function(){
      A.to('flaretop', dur, {alpha:0.5,x:100,scaleX:1.5,ease:Power1.easeOut,onComplete:function(){
        TweenLite.to('#flaretop', dur/2, {alpha:0});
      }});
    }});
  }
}