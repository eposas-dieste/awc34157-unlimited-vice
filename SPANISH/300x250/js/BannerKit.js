/*!
 *
 *
 * DATE: 01-25-2017
 *
 * - JS BannerKit -
 * @author: Eric Posas, ericposas06@gmail.com 
 * @linkedin: https://www.linkedin.com/in/eric-posas-80367334 
 *
 *
 **/

//GLOBAL PROPERTIES//
var global = {};
global.images = [];
global.imagecount = 0;
global.playthroughs = 0;
global.ebinit = function(){
    if(Func.Test.IE8() || Func.Test.IE9()){
        banner.init();
    }else{    
        if (!EB.isInitialized()){
            EB.addEventListener(EBG.EventName.EB_INITIALIZED, banner.init);
        }else{
            banner.init();
        }
    }
}
global.ebclick = function(){
    //EB.clickthrough();
    //console.log('EB clickthrough.');
};
global.video;
global.videoparams = {};
global.videostate = '';
global.width = 0;
global.height = 0;
global.dimensions;
global.firefoxvideoloaded = false;

//MAIN//
var Main = {};

Main.init = function (videoParams, backUpImgsAndCSS, arrayOfImages, btnPosParams, btnAnimType, reloadPosParams, legalProps, clickAreaDivs){
    //console.log fix 
    if(!window.console) {
        window.console = {}; 
        window.console.log = function(){};
    }
    //create ad
    var ad = new Ad();
    var myArr = [];
    (function(){
        for(var i = 0; i < arrayOfImages.length; i++){
            myArr.push(arrayOfImages[i]);
        }
    })();
    if((Func.Test.IE8() === true) || (Func.Test.IE9() === true && btnPosParams.sizmek === true) || (Func.Test.isMobile() === true && btnPosParams.sizmek === true && videoParams && videoParams.backup === true)){
        if(backUpImgsAndCSS === null){
            ad.dimensions(document.getElementById('size').getAttribute('data-width'), document.getElementById('size').getAttribute('data-height'));
            ad.createAdContainer();
            ad.image('backup', 'jpg');
            Anim.set('backup', {alpha:1});
            if(btnPosParams.atlas === true){
                ad.click_layer(clickTag);
            }
        }else{
            var s = document.getElementsByTagName('link')[0];
            s.href = backUpImgsAndCSS.href;
            ad.dimensions(document.getElementById('size').getAttribute('data-width'), document.getElementById('size').getAttribute('data-height'));
            ad.createAdContainer();
            ad.backupimage('back', 'jpg');
            Anim.set('back', {display:'block', alpha:1});
            for(var q = 0; q < backUpImgsAndCSS.images.length; q++){
                ad.backupimage(backUpImgsAndCSS.images[q], 'png');
                Anim.set(backUpImgsAndCSS.images[q], {alpha:1, display:'block'});
            }
            if(B.borderColor){
                ad.border(B.borderColor);
            }else{
                ad.border("#000");
            }
            if(btnPosParams.atlas === true){
                ad.click_layer(clickTag);
            }
        }
    }else{
        ad.dimensions(document.getElementById('size').getAttribute('data-width'), document.getElementById('size').getAttribute('data-height'));
        ad.createAdContainer();
        ad.image('back', 'jpg');
        
        if(videoParams && Func.Test.isMobile() === false){
            var lc = document.createElement('img');
            if(document.getElementById('container')){
                lc.id = 'loading-circle';
                lc.style.position = 'absolute';
                lc.src = 'img/loading-circle.png';
                document.getElementById('container').appendChild(lc);
                TweenLite.set(lc, {rotation:0, scale:0.25, display:'none'});
                if(global.width > 700 && global.height < 100){
                    TweenLite.set(lc, {scale:0.15});
                }
                switch(global.dimensions){
                    case '160x600':
                        Anim.set('loading-circle', {x:15, y:225});
                        break;
                    case '300x250':
                        Anim.set('loading-circle', {x:88, y:52});
                        break;
                    case '300x600':
                        Anim.set('loading-circle', {x:88, y:225});
                        break;
                    case '728x90':
                        Anim.set('loading-circle', {x:290, y:-18, scale:0.15});
                        break;
                    Anim.set('loading-circle', {x:0, y:0});
                }
                Anim.set('back', {alpha:1, display:'block'});
            }
            ad.video(videoParams);
            global.videoparams = videoParams;
        }else{
            Anim.set('back', {alpha:1, display:'block'});
        }
        
        var imgs = arrayOfImages;
        for(var i = 0; i < imgs.length; i++){
            if(typeof imgs[i][0] === 'object'){
                if(document.getElementById(imgs[i][0][0])){
                    myArr.push(document.getElementById(imgs[i][0][0]).id + '-copy');
                    ad.svg(imgs[i][0][0], true);
                }else{
                    ad.svg(imgs[i][0][0]);
                }
            }else if(typeof imgs[i] === 'object'){
                if(document.getElementById(imgs[i][0])){
                    myArr.push(document.getElementById(imgs[i][0]).id + '-copy');
                    ad.image(imgs[i][0], 'jpg', true);
                }else{
                    ad.image(imgs[i][0], 'jpg');
                }
            }else{
                if(document.getElementById(imgs[i])){
                    myArr.push(document.getElementById(imgs[i]).id + '-copy');
                    ad.image(imgs[i], 'png', true);
                }else{
                    ad.image(imgs[i], 'png');
                }
            }
        }
        
        if(legalProps != null){
            ad.image('legal-link', 'png');
            ad.image('legal-link2', 'png');
            Anim.set('legal-link', {display:'none'});
        }
        
        if(B.borderColor){
            ad.border(B.borderColor);
        }else{
            ad.border("#000");
        }
        
        if(btnPosParams.atlas){
            ad.click_layer(clickTag);
        }else if(btnPosParams.sizmek){
            var atag = document.getElementById('clickTag');
            var atagscript = document.body.getElementsByTagName('script')[0];
            document.body.removeChild(atag);
            document.body.removeChild(atagscript);
            ad.click_layer();
        }
        
        if(btnPosParams.svg === true && Func.Test.Safari() === false){
            ad.svg('button');
            Anim.set('button', {width:btnPosParams.dimensions.w, height:btnPosParams.dimensions.h});
        }else{
            ad.image('button', 'png');
        }
        if(btnAnimType === 'shine'){
            ad.image('button-gleam', 'png');
            if(btnPosParams.hd === false){
                Anim.set('button-gleam', {x:btnPosParams.x, y:btnPosParams.y});
            }else{
                TweenLite.set(document.getElementById('button-gleam').childNodes[0], {position:'absolute', left:(btnPosParams.dimensions.w * 1.84 + 'px'), top:(btnPosParams.dimensions.h * 1.85 + 'px')});
            }
        }else if(btnAnimType === 'glow'){
            ad.image('button-glow', 'png');
            Anim.set('button-glow', {x:btnPosParams.x, y:btnPosParams.y});
        }
        ad.image('reload', 'png');
        
        banner.setButtons(myArr, btnPosParams, btnAnimType, reloadPosParams);
        if(btnPosParams.hd === false){
            Anim.set('button', {x:btnPosParams.x, y:btnPosParams.y});
        }else{
            TweenLite.set(document.getElementById('button').childNodes[0], {position:'absolute', left:(btnPosParams.dimensions.w * 1.84 + 'px'), top:(btnPosParams.dimensions.h * 1.85 + 'px')});
            Anim.set('button', {alpha:1, x:0, y:0});
        }
        Anim.set('reload', {display:'none', x:reloadPosParams.x, y:reloadPosParams.y, scale:reloadPosParams.scale, transformOrigin:reloadPosParams.transformOrigin});
        
        if(legalProps != null){
            
            ad.image('legal-bubble', 'png');
            Anim.set('legal-bubble', {display:'none'});
            ad.image('x', 'png');
            Anim.set('x', {display:'none'});
            
            ad.div('legal-button');
            Anim.set('legal-button', {display:'none', backgroundImage:'url("img/clicktag.png")'});
            Func.id('legal-button').addEventListener('click', banner.openLegal);
            ad.div('x-close');
            Anim.set('x-close', {display:'none', backgroundImage:'url("img/clicktag.png")'});
            Func.id('x-close').addEventListener('click', banner.closeLegal);
            Func.id('x').addEventListener('click', function(){
                if(typeof(ga_id) !== "undefined"){ ga('send', 'event', ga_category, 'click', 'cta-banner'); }
                if(btnPosParams.atlas){
                    window.open(clickTag, '_blank');
                }else if(btnPosParams.sizmek){
                    global.ebclick();
                }
            });
            Func.id('legal-bubble').addEventListener('click', function(){
                if(typeof(ga_id) !== "undefined"){ ga('send', 'event', ga_category, 'click', 'cta-banner'); }
                if(btnPosParams.atlas){
                    window.open(clickTag, '_blank');
                }else if(btnPosParams.sizmek){
                    global.ebclick();
                }
            });
            
            if(legalProps.hotspots[0]){
                ad.div('legal-hotspot-01');
                Anim.set('legal-hotspot-01', {display:'none', backgroundImage:'url("img/clicktag.png")'});
                document.getElementById('legal-hotspot-01').addEventListener('click', function(){
                    window.open(legalProps.urls[0], "_blank");
                });
            }
            if(legalProps.hotspots[1]){
                ad.div('legal-hotspot-02');
                Anim.set('legal-hotspot-02', {display:'none', backgroundImage:'url("img/clicktag.png")'});
                document.getElementById('legal-hotspot-02').addEventListener('click', function(){
                    window.open(legalProps.urls[1], "_blank");
                });
            }
            if(legalProps.hotspots[2]){
                ad.div('legal-hotspot-03');
                Anim.set('legal-hotspot-03', {display:'none', backgroundImage:'url("img/clicktag.png")'});
                document.getElementById('legal-hotspot-03').addEventListener('click', function(){
                    window.open(legalProps.urls[2], "_blank");
                });
            }
            
        }
        
        if(clickAreaDivs){
            for(var a = 0; a < clickAreaDivs.length; a++){
                if(clickAreaDivs[a].elems){
                    ad.div(clickAreaDivs[a].id, clickAreaDivs[a].elems);
                    Anim.set(clickAreaDivs[a].id, {backgroundImage:'url("img/clicktag.png")'});
                }else{
                    ad.div(clickAreaDivs[a].id);
                    Anim.set(clickAreaDivs[a].id, {backgroundImage:'url("img/clicktag.png")'});
                }
            }
        }
    }
};

Main.replay = function (){
    Main.adjustclips(banner.elems);
    banner.animate();
};

Main.adjustclips = function (arr){
    for(var i = 0; i < arr.length; i++){
        Anim.set(arr[i], {alpha:0, x:0, y:0, scale:1});
    }
    Anim.set('reload', {display:'none'});
    Anim.set('button', {display:'none'});
    if(Func.id('button-gleam')){
        Anim.set('button-gleam', {display:'none'});
    }
    if(Func.id('button-glow')){
        Anim.set('button-glow', {display:'none'});
    }
    if(Func.id('legal-hotspot-01')){
        Anim.displayNone('legal-hotspot-01');
    }
    if(Func.id('legal-hotspot-02')){
        Anim.displayNone('legal-hotspot-02');
    }
    if(Func.id('legal-hotspot-03')){
        Anim.displayNone('legal-hotspot-03');
    }
    if(Func.id('legal-link') && Func.id('legal-button')){
        Anim.displayNone('legal-link');
        Anim.displayNone('legal-button');
    }
    (function resetSplitImages(){
        var divs = banner.divsToArrayByDataType('splitImage');
        for(var i = 0; i < divs.length; i++){
            if(document.getElementById(divs[i]).style.backgroundColor !== 'red'){
                Anim.set(divs[i], {alpha:0, x:0, y:0, scale:1});
            }
        }
    })();
};

//AD//
var Ad = new Function();

Ad.prototype.dimensions = function(w, h){
    this.width = w;
    this.height = h;
    global.width = w;
    global.height = h;
    global.dimensions = w + 'x' + h;
};

Ad.prototype.width = 0;

Ad.prototype.height = 0;

Ad.prototype.createAdContainer = function(){
    var container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
    container.style.width = this.width + "px";
    container.style.height = this.height + "px";
    container.style.position = "relative";
    container.style.overflow = "hidden";
};

Ad.prototype.border = function(color){
    var border = document.createElement('div');
    border.id = 'border';
    document.getElementById('container').appendChild(border);
    border.style.border = "1px solid " + color;
    border.style.width = (this.width - 2) + "px";
    border.style.height = (this.height - 2) + "px";
    border.style.position = "absolute";
}

Ad.prototype.div = function(id, elems){
    var div = document.createElement('div');
    var div_inner = document.createElement('div');
    document.getElementById('container').appendChild(div);
    div.id = id;
    div.style.position = "absolute";
    div.appendChild(div_inner);
    div_inner.id = id + "-inner";
    div_inner.style.position = "absolute";
    if(elems){
        for(var i = 0; i < elems.length; i++){
            var elem = document.createElement('div');
            elem.id = elems[i];
            div.appendChild(elem);
            div.style.position = 'absolute';
            elem.id = elems[i];
            elem.style.position = "absolute";
            var img = document.createElement('img');
            img.src = 'img/' + elem.id + '.png';
            elem.appendChild(img);
        }
    }
};

Ad.prototype.video = function(object){
    var div = document.createElement('div');
    div.id = object.id;
    document.getElementById('container').appendChild(div);
    var vid = document.createElement('video');
    div.appendChild(vid);
    vid.width = object.width;
    var src = document.createElement('source');
    vid.appendChild(src);
    if(Func.Test.Firefox() === true){
        src.src = 'vid/' + object.video + '.mp4' + (object.duration ? object.duration : '');
    }else{
        src.src = 'vid/' + object.video + '.m4v' + (object.duration ? object.duration : '');
    }
    global.video = vid;
    div.style.position = 'absolute';
    div.style.opacity = 0;
    div.style.display = 'none';
}

Ad.prototype.image = function(id, type, copy){
    var div = document.createElement('div');
    if(document.getElementById('container')){
        document.getElementById('container').appendChild(div);
    }
    var img = document.createElement('img');
    global.images.push(img);
    if(copy){
        div.id = id + '-copy';
    }else{
        div.id = id;
    }
    div.appendChild(img);
    img.src = 'img/' + id + '.' + type;
    div.style.position = "absolute";
    div.style.opacity = 0;
    if(Func.Test.IE8() === false){
        img.addEventListener('load', function(){
            global.imagecount++;
            if(global.imagecount === global.images.length){
                banner.replayAd();
            }
        });
    }
};

Ad.prototype.backupimage = function(id, type){
    var div = document.createElement('div');
    document.getElementById('container').appendChild(div);
    var img = document.createElement('img');
    div.id = id;
    div.appendChild(img);
    img.src = 'img/' + id + '.' + type;
    div.style.position = "absolute";
    div.style.opacity = 0;
};

Ad.prototype.svg = function(id, copy){
    var svg = document.createElement('img');
    if(copy){
        svg.id = id + '-copy';
    }else{
        svg.id = id;
    }
    svg.src = 'img/' + id + '.svg';
    document.getElementById('container').appendChild(svg);
    svg.style.position = 'absolute';
    svg.style.opacity = 0;
    svg.setAttribute('preserveAspectRatio', 'xMinYMin none');
}

Ad.prototype.click_layer = function(url){
    if(url){
        var a = document.createElement('a'), img = document.createElement('img');
        document.getElementById('container').appendChild(a);
        a.style.width = this.width + "px";
        a.style.height = this.height + "px";
        a.style.position = "absolute";
        a.style.top = "0px";
        a.style.backgroundImage = 'url("img/clicktag.png")';
        a.addEventListener('click', function(){
            if(typeof(ga_id) !== "undefined"){ ga('send', 'event', ga_category, 'click', 'cta-banner'); }
            window.open(clickTag, '_blank');
        });
        img.src = 'img/clicktag.png';
        img.style.position = 'absolute';
        img.style.left = '-3px';
        img.style.top = '-3px';
        a.appendChild(img);
    }else{
        var sizmekClickLayer = document.createElement('div');
        document.getElementById('container').appendChild(sizmekClickLayer);
        sizmekClickLayer.style.width = this.width + "px";
        sizmekClickLayer.style.height = this.height + "px";
        sizmekClickLayer.style.position = "absolute";
        sizmekClickLayer.style.top = "0px";
        sizmekClickLayer.setAttribute('target', '_blank');
        sizmekClickLayer.style.backgroundImage = 'url("img/clicktag.png")';
        sizmekClickLayer.style.cursor = 'pointer';
        sizmekClickLayer.addEventListener('click', function(){
            if(typeof(ga_id) !== "undefined"){ ga('send', 'event', ga_category, 'click', 'cta-banner'); }
            global.ebclick();
        });
    }
};

banner.scrollingLegal = false;
banner.addScrollableLegal = function(bool){
    if(bool === true){
        var el = document.createElement('div');
        var im = document.createElement('img');
        el.id = 'legal_text_div';
        im.id = 'legal_text_image';
        im.src = 'img/legaltext.png';
        el.appendChild(im);
        document.getElementById('container').appendChild(el);
        banner.scrollingLegal = true;
    }
}

banner.CTA = {};
banner.CTA.animations = {};
banner.CTA.animations.rolldown_over = function(id,toHeight){
    if(banner.adState === 'ended'){
        Anim.to(id,0.25,{height:toHeight});
    }
}

banner.CTA.animations.rolldown_out = function(id){
    Anim.to(id,0.15,{height:0});
}

banner.buttonDimensions = {};

banner.CTA.createCTA = function(type, id, btn_text, props_obj, hide){
        if(props_obj && props_obj.buttonWidth && props_obj.buttonHeight){
            banner.buttonDimensions = {width:props_obj.buttonWidth, height:props_obj.buttonHeight, left:props_obj.left, top:props_obj.top};
        }else{
            banner.buttonDimensions = {width:92, height:26, top:0, left:0};
        }
        var btn_holder = document.createElement('div');
        document.getElementById('container').appendChild(btn_holder);
        btn_holder.id = id;
        if(props_obj && props_obj.buttonWidth){
            btn_holder.style.width = props_obj.buttonWidth + 'px';
        }else{
            btn_holder.style.width = '92px';
        }
        if(type === 'rolldown'){
            btn_holder.style.height = '0px';
        }else if(props_obj && props_obj.buttonHeight){
            btn_holder.style.height = (props_obj.buttonHeight + 10) + 'px';
        }else{
            btn_holder.style.height = '30px';
        }
        if(props_obj && props_obj.left){btn_holder.style.left = props_obj.left + 'px';}else{btn_holder.style.left = '0px';}
        if(props_obj && props_obj.top){btn_holder.style.top = props_obj.top + 'px';}else{btn_holder.style.top = '0px';}
        btn_holder.style.position = 'absolute';
        btn_holder.style.overflow = 'hidden';
        
        var btn_over = document.createElement('div');
        btn_holder.appendChild(btn_over);
        if(props_obj && props_obj.buttonColor){
            btn_over.style.backgroundColor = props_obj.buttonColor;
        }else{
            btn_over.style.backgroundColor = 'white';
        }
        btn_over.style.opacity = 1;
        if(props_obj && props_obj.borderRadius){
            btn_over.style.borderRadius = props_obj.borderRadius + 'px';
        }else{
            btn_over.style.borderRadius = '3px';
        }
        if(props_obj && props_obj.borderColor){
            btn_over.style.border = '1px solid ' + props_obj.borderColor;
            if(props_obj.borderLineWidth){
                btn_over.style.border = props_obj.borderLineWidth + 'px' + ' solid ' + props_obj.borderColor;
            }
        }else{
            btn_over.style.border = '1px solid #ea7400';
        }
        if(props_obj && props_obj.buttonHeight){
            btn_over.style.height = props_obj.buttonHeight + 'px';
        }else{
            btn_over.style.height = '24px';
        }
    
        var btn_inner = document.createElement('div');
        btn_over.appendChild(btn_inner);
        btn_inner.innerHTML = btn_text;
        btn_inner.style.fontFamily = 'Arial';
        if(props_obj && props_obj.textWeight){
            btn_inner.style.fontWeight = props_obj.textWeight;
        }
        if(props_obj && props_obj.textSize){
            btn_inner.style.fontSize = props_obj.textSize + 'px';
        }else{
            btn_inner.style.fontSize = '9px';
        }
        if(props_obj && props_obj.textColor){
            btn_inner.style.color = props_obj.textColor;
        }else{
            btn_inner.style.color = '#ea7400';
        }
        if(Func.Test.Firefox()){
            if(props_obj && props_obj.textTop){
                btn_inner.style.marginTop = props_obj.textTop + 'px';
            }else{
                btn_inner.style.marginTop = (parseInt(btn_inner.style.fontSize, 10) - 2) + 'px';
            }
        }else{
            if(props_obj && props_obj.textTop){
                btn_inner.style.marginTop = props_obj.textTop + 'px';
            }else{
                btn_inner.style.marginTop = (parseInt(btn_inner.style.fontSize, 10) - 1) + 'px';
            }
        }
        btn_inner.style.textAlign = 'center';
        if(hide === true){
            btn_holder.style.opacity = 0;
        }
}

banner.playthroughs = 0;
banner.adState = '';
banner.start = function(){
    banner.adState = 'started';
}

banner.end = function(){
    if(banner.playthroughs > 0){
        if(typeof(ga_id) !== "undefined"){ ga('send', 'event', ga_category, 'animation-refresh', 'ended'); }
    }else{
        if(typeof(ga_id) !== "undefined"){ ga('send', 'event', ga_category, 'animation', 'ended'); }
    }
    banner.adState = 'ended';
    banner.playthroughs++;
}

banner.prelimDone = false;

banner.randomRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

banner.shuffleArray = function (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

banner.showAndHideLegal = function(){
    A.fadeIn('bubble');
    A.dCall(2.5,function(){
        A.fadeOut('bubble');
        B.end();
    });
}

banner.showButton = function(delay){
    if(banner.buttonProps.hd === true){
        Func.id('button').childNodes[0].id = 'button-inner';
        Anim.set('button', {alpha:1, display:'block'});
        Anim.impact('button-inner', delay, "50% 50%");
    }else{
        console.log(banner.buttonProps.hd);
        Anim.impact('button', delay, "50% 50%");
    }
    if(Func.id('button-gleam')){
        Anim.set('button-gleam', {display:'block', delay:delay + 0.5});
    }else if(Func.id('button-glow')){
        Anim.set('button-glow', {display:'block', delay:delay + 0.5});
    }
}

banner.showReload = function (delay){
    Anim.set('reload', {x:banner.reloadProps.x, y:banner.reloadProps.y, scale:banner.reloadProps.scale});
    Anim.impact('reload', delay, banner.reloadProps.transformOrigin);
    banner.addReloadListeners();
};

banner.hideReload = function(){
    banner.removeReloadListeners();
    Anim.set('reload', {y:-50, rotation:0});
}

banner.buttonProps = {};

banner.setButtons = function (arr, btnProps, btnAnimType, reloadBtnProps){
    banner.buttonProps = btnProps;
    if(btnAnimType === 'grow'){
        if(btnProps.overrideClick !== true){
            Func.id('button').addEventListener('click', function(){
                if(typeof(ga_id) !== "undefined"){ ga('send', 'event', ga_category, 'click', 'cta-button'); }
                if(btnProps.atlas){
                    window.open(clickTag, '_blank');
                }else if(btnProps.sizmek){
                    global.ebclick();
                }
            });
        }
        Func.id('button').addEventListener('mouseover', function(){
            Anim.to('button', 0.25, {scale:1.05});
        });
        Func.id('button').addEventListener('mouseout', function(){
            Anim.to('button', 0.5, {scale:1});
        });
    }else if(btnAnimType === 'press'){
        if(btnProps.overrideClick !== true){
            Func.id('button').addEventListener('click', function(){
                if(typeof(ga_id) !== "undefined"){ ga('send', 'event', ga_category, 'click', 'cta-button'); }
                if(btnProps.atlas){
                    window.open(clickTag, '_blank');
                }else if(btnProps.sizmek){
                    global.ebclick();
                }
            });
        }
        Func.id('button').addEventListener('mouseover', function(){
            if(btnProps.svg === true && Func.Test.Safari() === false){
                Func.id('button').setAttribute('src', 'img/button-pressed.svg');
            }else{
                Func.id('button').childNodes[0].setAttribute('src', 'img/button-pressed.png');
            }
        });
        Func.id('button').addEventListener('mouseout', function(){
            if(btnProps.svg === true && Func.Test.Safari() === false){
                Func.id('button').setAttribute('src', 'img/button.svg');
            }else{
                Func.id('button').childNodes[0].setAttribute('src', 'img/button.png');
            }
        });
    }else if(btnAnimType === 'shine' && document.getElementById('button-gleam')){
        if(btnProps.overrideClick !== true){
            Func.id('button').addEventListener('click', function(){
                if(typeof(ga_id) !== "undefined"){ ga('send', 'event', ga_category, 'click', 'cta-button'); }
                if(btnProps.atlas){
                    window.open(clickTag, '_blank');
                }else if(btnProps.sizmek){
                    global.ebclick();
                }
            });
            Func.id('button-gleam').addEventListener('click', function(){
                if(typeof(ga_id) !== "undefined"){ ga('send', 'event', ga_category, 'click', 'cta-button'); }
                if(btnProps.atlas){
                    window.open(clickTag, '_blank');
                }else if(btnProps.sizmek){
                    global.ebclick();
                }
            });
        }
        Func.id('button-gleam').addEventListener('mouseover', function(){
            if(document.querySelector && document.querySelector('#button-gleam:hover')){
                glow();
            }else{
                TweenLite.set(Func.id('button-gleam'), {scaleY:1, alpha:1, x:btnProps.x, y:btnProps.y});
                TweenLite.to(Func.id('button-gleam'), 1, {scaleY:1, alpha:0, transformOrigin:"50% 0px"});
            }
        });
        function glow(){
            if(document.querySelector('#button-gleam:hover') && document.querySelector('#button-gleam:hover').length != 0){
                var delay;
                if(arguments){ delay = arguments[0]; }
                TweenLite.set(Func.id('button-gleam'), {scaleY:1, alpha:1, x:btnProps.x, y:btnProps.y});
                TweenLite.to(Func.id('button-gleam'), 1, {scaleY:1, alpha:0, delay:delay, onComplete:glow, onCompleteParams:[0.2], transformOrigin:"50% 0px"});
            }
        }
    }else if(btnAnimType === 'glow' && document.getElementById('button-glow')){
        if(btnProps.overrideClick !== true){
            Func.id('button').addEventListener('click', function(){
                if(typeof(ga_id) !== "undefined"){ ga('send', 'event', ga_category, 'click', 'cta-button'); }
                if(btnProps.atlas){
                    window.open(clickTag, '_blank');
                }else if(btnProps.sizmek){
                    global.ebclick();
                }
            });
            Func.id('button-glow').addEventListener('click', function(){
                if(typeof(ga_id) !== "undefined"){ ga('send', 'event', ga_category, 'click', 'cta-button'); }
                if(btnProps.atlas){
                    window.open(clickTag, '_blank');
                }else if(btnProps.sizmek){
                    global.ebclick();
                }
            });
        }
        Func.id('button-glow').addEventListener('mouseover', function(){
            Anim.to('button-glow', 0.5, {alpha:1});
        });
        Func.id('button-glow').addEventListener('mouseout', function(){
            Anim.to('button-glow', 0.5, {alpha:0});
        });
    }
    
    banner.elems = arr;
    banner.reloadProps = {x:reloadBtnProps.x, y:reloadBtnProps.y, scale:reloadBtnProps.scale, transformOrigin:reloadBtnProps.transformOrigin, reverse:reloadBtnProps.reverse, hardRefresh:reloadBtnProps.hardRefresh};
}

banner.elems = [];

banner.showPrelimLegal = function(delay){
    Anim.set('legal-bubble', {alpha:1, display:'block', delay:delay});
    Func.id('legal-bubble').addEventListener('click', function(){
        if(typeof(ga_id) !== "undefined"){ ga('send', 'event', ga_category, 'click', 'cta-banner'); }
        if(btnProps.atlas){
            window.open(clickTag, '_blank');
        }else if(btnProps.sizmek){
            global.ebclick();
        }
    });
    Anim.set('legal-link', {display:'block', alpha:1, delay:delay, onStart:function(){
        Func.switchImg('legal-link', 'img/legal-link2.png');
    }});
    if(document.getElementById('legal-hotspot-01')){
        Anim.set('legal-hotspot-01', {display:'block', delay:delay});
    }
    if(document.getElementById('legal-hotspot-02')){
        Anim.set('legal-hotspot-02', {display:'block', delay:delay});
    }
    if(document.getElementById('legal-hotspot-03')){
        Anim.set('legal-hotspot-03', {display:'block', delay:delay});
    }
}

banner.closePrelimLegal = function(delay){
    Anim.set('legal-bubble', {display:'none', delay:delay, onStart:function(){
        Func.switchImg('legal-link', 'img/legal-link.png');
    }});
    if(document.getElementById('legal-hotspot-01')){
        Anim.set('legal-hotspot-01', {display:'none', delay:delay});
    }
    if(document.getElementById('legal-hotspot-02')){
        Anim.set('legal-hotspot-02', {display:'none', delay:delay});
    }
    if(document.getElementById('legal-hotspot-03')){
        Anim.set('legal-hotspot-03', {display:'none', delay:delay});
    }
    
    Anim.set('legal-button', {display:'block', delay:delay});
    
    banner.showReload(delay);
}

banner.openLegal = function(){
    if(document.getElementById('custom-button')){
        Anim.set('custom-button', {display:'none'});
    }
    Anim.set('legal-bubble', {alpha:1, display:'block'});
    Anim.set('legal-link', {display:'block', alpha:1});
    Func.switchImg('legal-link', 'img/legal-link2.png');
    
    Anim.set('legal-button', {display:'none'});
    Anim.set('x-close', {display:'block'});
    Anim.set('x', {display:'block', alpha:1});
    
    if(document.getElementById('legal-hotspot-01')){
        Anim.set('legal-hotspot-01', {display:'block'});
    }
    if(document.getElementById('legal-hotspot-02')){
        Anim.set('legal-hotspot-02', {display:'block'});
    }
    if(document.getElementById('legal-hotspot-03')){
        Anim.set('legal-hotspot-03', {display:'block'});
    }
}

banner.closeLegal = function(){
    if(document.getElementById('custom-button')){
        Anim.set('custom-button', {display:'block'});
    }
    Anim.set('legal-bubble', {display:'none'});
    Func.switchImg('legal-link', 'img/legal-link.png');
    
    Anim.set('legal-button', {display:'block'});
    Anim.set('x-close', {display:'none'});
    Anim.set('x', {display:'none'});
    
    if(document.getElementById('legal-hotspot-01')){
        Anim.set('legal-hotspot-01', {display:'none'});
    }
    if(document.getElementById('legal-hotspot-02')){
        Anim.set('legal-hotspot-02', {display:'none'});
    }
    if(document.getElementById('legal-hotspot-03')){
        Anim.set('legal-hotspot-03', {display:'none'});
    }
}

banner.addReloadListeners = function(){
    Func.id('reload').addEventListener('mouseover', banner.reloadMouseOver);
    Func.id('reload').addEventListener('mouseout', banner.reloadMouseOut);
    Func.id('reload').addEventListener('click', function(){
        if(typeof(ga_id) !== "undefined"){ ga('send', 'event', ga_category, 'click', 'replay'); }
        location.reload();
    });
}

banner.reloadMouseOver = function(){
    if(banner.reloadProps.reverse === true){
        Anim.to('reload', 0.5, {rotation:-360, transformOrigin:banner.reloadProps.transformOrigin});
        if(banner.legalOpen === true){
            if(B.hideReloadOnBubbleOpen === true){
                A.set('reload', {alpha:0});
            }else{
                A.set('reload', {alpha:0.5});
            }
        }
    }else{
        Anim.to('reload', 0.5, {rotation:360, transformOrigin:banner.reloadProps.transformOrigin});
        if(banner.legalOpen === true){
            if(B.hideReloadOnBubbleOpen === true){
                A.set('reload', {alpha:0});
            }else{
                A.set('reload', {alpha:0.5});
            }
        }
    }
}

banner.reloadMouseOut = function(){
    Anim.to('reload', 0.5, {rotation:0, transformOrigin:banner.reloadProps.transformOrigin});
    if(banner.legalOpen === true){
        if(B.hideReloadOnBubbleOpen === true){
            A.set('reload', {alpha:0});
        }else{
            A.set('reload', {alpha:0.5});
        }
    }
}

banner.legalOpen = false;

banner.reloadProps = '';

banner.replayAd = function(){
    if(global.video){
        document.getElementsByTagName('source').src = 'img/' + global.videoparams.video + global.videoparams.type + (global.videoparams.duration ? global.videoparams.duration : '');
        global.video.load();
        Anim.set('loading-circle', {display:'none'});
        (function checkLoad(){
            var loadcirc = document.getElementById('loading-circle');
            if(global.videostate === 'loaded'){
                global.video.load();
                playVid();
            }else if(global.video.readyState === 4){
                playVid();
            }else if(Func.Test.Firefox() === true){
                global.video.addEventListener('canplaythrough', function(){
                    if(global.firefoxvideoloaded === false){
                        playVid();
                        global.firefoxvideoloaded = true;
                    }
                });
            }else{
                setTimeout(checkLoad, 500);
            }
            function playVid(){
                Anim.set('loading-circle', {display:'none'});
                global.videostate = 'loaded';
                global.video.play();
                Main.replay(banner.elems);
                banner.hideReload();
            }
        })();
    }else{
        Main.replay(banner.elems);
        banner.hideReload();
    }
}

banner.removeReloadListeners = function(){
    Func.id('reload').removeEventListener('mouseover', banner.reloadMouseOver);
    Func.id('reload').removeEventListener('mouseout', banner.reloadMouseOut);
    Func.id('reload').removeEventListener('click', function(){});
}

banner.div = function(id, positioning, actions, hide){
    if(!document.getElementById(id)){
        var div = document.createElement('div');
        div.id = id;
        div.className = 'div';
        div.style.position = 'absolute';
        if(id === 'btn_div' && positioning === 'auto'){
            if(banner.buttonDimensions.width){
                div.style.width = banner.buttonDimensions.width + 'px';
                div.style.height = banner.buttonDimensions.height + 2 + 'px';
                div.style.left = banner.buttonDimensions.left + 'px';
                div.style.top = banner.buttonDimensions.top + 'px';
            }
        }else if(positioning){
            div.style.width = positioning.width + 'px';
            div.style.height = positioning.height + 'px';
            div.style.left = positioning.left + 'px';
            div.style.top = positioning.top + 'px';
        }
        div.style.cursor = 'pointer';
        div.style.backgroundColor = 'green';
        div.style.opacity = 0.5;
        document.getElementById('container').appendChild(div);
        if(actions){
            if(id === 'btn_div'){
                div.addEventListener('click', function(){
                    if(typeof(ga_id) !== "undefined"){ ga('send', 'event', ga_category, 'cta-button', 'click'); }
                    window.open(clickTag,'_blank');
                });
            }else if(id === 'legal_div' && actions === 'auto'){
                div.addEventListener('click', function(){
                    if(banner.adState === 'ended'){
                        if(typeof(ga_id) !== "undefined"){ ga('send', 'event', ga_category, 'legal', 'click'); }
                        Anim.set('bubble',{alpha:1});
                        Anim.set('x',{alpha:1});
                        if(B.hideReloadOnBubbleOpen === true){
                            Anim.set('reload', {alpha:0});
                        }else{
                            Anim.set('reload', {alpha:0.5});
                        }
                        banner.legalOpen = true;
                    }
                });
            }else if(id === 'x_div' && actions === 'auto'){
                div.addEventListener('click', function(){
                    Anim.set('bubble',{alpha:0});
                    Anim.set('x',{alpha:0});
                    Anim.set('reload', {alpha:1});
                    banner.legalOpen = false;
                });
            }else{
                div.addEventListener('click', actions.click);
            }
            div.addEventListener('mouseover', actions.mouseover);
            div.addEventListener('mouseout', actions.mouseout);
        }
        if(hide === true){
            div.style.opacity = 0;
        }
    }
}

banner.divsToArrayByClassName = function(classNm){
    var divs = document.getElementsByTagName('div');
    var arr = [];
    for(var i = 0; i < divs.length; i++){
        var divClassName = divs[i].className;
        if(divClassName === classNm){
            arr.push(divs[i].id);
        }
    }
    return arr;
}

banner.divsToArrayByDataType = function(dataTp){
    var divs = document.getElementsByTagName('div');
    var arr = [];
    for(var i = 0; i < divs.length; i++){
        if(divs[i].getAttribute('data-type') === dataTp){
            arr.push(divs[i].id);
        }
    }
    return arr;
}

banner.storedSplitImageArrays = {};

banner.splitImage = function(image, id, positioning, hide, addClassName){
    if(!document.getElementById(id)){
        banner.storedSplitImageArrays[id] = {image:image, id:id, positioning:positioning, class:addClassName};
        var div = document.createElement('div');
        div.id = id;
        div.setAttribute('data-type', 'splitImage');
        if(addClassName){
            div.className = addClassName;
        }
        div.style.position = 'absolute';
        div.style.display = 'block';
        if(positioning.width){
            div.style.width = positioning.width + 'px';
        }else{
            div.style.width = document.getElementById('size').getAttribute('data-width') + 'px';
        }
        div.style.height = positioning.height + 'px';
        div.style.left = positioning.left + 'px';
        div.style.top = positioning.top + 'px';
        div.style.cursor = 'pointer';
        if(hide !== true){
            div.style.backgroundColor = 'red';
        }else{
            div.style.opacity = 0;
        }
        if(Func.Test.Firefox()){
            div.style.background = "url('img/" + image + ".png')" + (positioning.left ? (positioning.left * -1) : 0) + 'px ' + (positioning.top ? (positioning.top * -1) : 0) + 'px ' + 'no-repeat';
        }else{
            div.style.backgroundImage = "url('img/" + image + ".png')";
            if(positioning.left){
                div.style.backgroundPositionX = (positioning.left * -1) + 'px';
            }
            if(positioning.top){
                div.style.backgroundPositionY = (positioning.top * -1) + 'px';
            }
        }
        div.style.pointerEvents = 'none';
        div.style.backgroundSize = document.getElementById('size').getAttribute('data-width') + 'px';
        document.getElementById('container').appendChild(div);
    }
}


//ANIM//
var Anim = {}, A = Anim;

Anim.setVideo = function (x, y, currentTime, callback){
    if(document.getElementById('video')){
        TweenLite.set(document.getElementById('video'), {x:x, y:y, alpha:1, display:'block', delay:0.2});
        if(currentTime !== null){
            if(Func.Test.Firefox() === false && Func.Test.IE10_Plus() === false && Func.Test.IE9() === false){
                document.getElementsByTagName('video')[0].currentTime = currentTime;
            }else{
                Anim.dCall(1, function(){
                    document.getElementsByTagName('video')[0].currentTime = currentTime + 1;
                });
            }
        }
        document.getElementsByTagName('video')[0].addEventListener('ended', callback);
    }
}

Anim.pauseVideo = function(sec){
    Anim.dCall(sec, function(){
        if(document.getElementById('video')){
            document.getElementsByTagName('video')[0].pause();
        }
    });
}

Anim.playVideo = function(sec){
    Anim.dCall(sec, function(){
        if(document.getElementById('video')){
            document.getElementsByTagName('video')[0].play();
        }
    });
}

Anim.to = function (elem, dur, params){
    Anim.set(elem, {alpha:1, display:'block'});
    TweenLite.to(Func.id(elem), dur, params);
}

Anim.from = function (elem, dur, params){
    Anim.set(elem, {alpha:1, display:'block'});
    TweenLite.from(Func.id(elem), dur, params);
}

Anim.set = function (elem, params){
    if(document.getElementById(elem)){
        TweenLite.set(Func.id(elem), params);
    }
}

Anim.visible = function (elem){
    if(typeof elem == 'object'){
        for(var i = 0; i < elem.length; i++){
            if(document.getElementById(elem[i])){
                Anim.set(elem[i], {alpha:1});
            }
        }
    }else{
        if(document.getElementById(elem)){
            Anim.set(elem, {alpha:1});
        }
    }
}

Anim.invisible = function (elem){
    if(typeof elem == 'object'){
        for(var i = 0; i < elem.length; i++){
            if(document.getElementById(elem[i])){
                Anim.set(elem[i], {alpha:0});
            }
        }
    }else{
        if(document.getElementById(elem)){
            Anim.set(elem, {alpha:0});
        }
    }
}

Anim.displayNone = function(elem){
    if(typeof elem == 'object'){
        for(var i = 0; i < elem.length; i++){
            if(document.getElementById(elem[i])){
                Anim.set(elem[i], {display:'none'});
            }
        }
    }else{
        if(document.getElementById(elem)){
            Anim.set(elem, {display:'none'});
        }
    }
}

Anim.displayBlock = function(elem){
    if(typeof elem == 'object'){
        for(var i = 0; i < elem.length; i++){
            if(document.getElementById(elem[i])){
                Anim.set(elem[i], {display:'block'});
            }
        }
    }else{
        if(document.getElementById(elem)){
            Anim.set(elem, {display:'block'});
        }
    }
}

Anim.fadeinfromleft = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.from(elem[i - 1], 0.5, {x:-10, alpha:0, ease:Power1.easeOut, delay:(delay * (i - 1))});
            }
            Anim.from(elem[elem.length - 1], 0.5, {x:-10, alpha:0, ease:Power1.easeOut, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.from(elem[i], 0.5, {x:-10, alpha:0, ease:Power1.easeOut, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.from(elem, 0.5, {x:-10, alpha:0, delay:delay, onComplete:onComplete});
       }else{
           Anim.from(elem, 0.5, {x:-10, alpha:0, delay:delay});
       }
   }
}

Anim.fadeouttoleft = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.to(elem[i - 1], 0.5, {x:-10, alpha:0, ease:Power1.easeIn, delay:(delay * (i - 1))});
            }
            Anim.to(elem[elem.length - 1], 0.5, {x:-10, alpha:0, ease:Power1.easeIn, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.to(elem[i], 0.5, {x:-10, alpha:0, ease:Power1.easeIn, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.to(elem, 0.5, {x:-10, alpha:0, ease:Power1.easeIn, delay:delay, onComplete:onComplete});
       }else{
           Anim.to(elem, 0.5, {x:-10, alpha:0, ease:Power1.easeIn, delay:delay});
       }
   }
}

Anim.fadeinfromright = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.from(elem[i - 1], 0.5, {x:10, alpha:0, ease:Power1.easeOut, delay:(delay * (i - 1))});
            }
            Anim.from(elem[elem.length - 1], 0.5, {x:10, alpha:0, ease:Power1.easeOut, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.from(elem[i], 0.5, {x:10, alpha:0, ease:Power1.easeOut, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.from(elem, 0.5, {x:10, alpha:0, delay:delay, onComplete:onComplete});
       }else{
           Anim.from(elem, 0.5, {x:10, alpha:0, delay:delay});
       }
   }
}

Anim.fadeouttoright = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.to(elem[i - 1], 0.5, {x:10, alpha:0, ease:Power1.easeIn, delay:(delay * (i - 1))});
            }
            Anim.to(elem[elem.length - 1], 0.5, {x:10, alpha:0, ease:Power1.easeIn, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.to(elem[i], 0.5, {x:10, alpha:0, ease:Power1.easeIn, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.to(elem, 0.5, {x:10, alpha:0, delay:delay, ease:Power1.easeIn, onComplete:onComplete});
       }else{
           Anim.to(elem, 0.5, {x:10, alpha:0, ease:Power1.easeIn, delay:delay});
       }
   }
}
//

Anim.fadeinfrombottom = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.from(elem[i - 1], 0.5, {y:10, alpha:0, ease:Power1.easeOut, delay:(delay * (i - 1))});
            }
            Anim.from(elem[elem.length - 1], 0.5, {y:10, alpha:0, ease:Power1.easeOut, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.from(elem[i], 0.5, {y:10, alpha:0, ease:Power1.easeOut, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.from(elem, 0.5, {y:10, alpha:0, delay:delay, onComplete:onComplete});
       }else{
           Anim.from(elem, 0.5, {y:10, alpha:0, delay:delay});
       }
   }
}

Anim.fadeouttobottom = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.to(elem[i - 1], 0.5, {y:10, alpha:0, ease:Power1.easeIn, delay:(delay * (i - 1))});
            }
            Anim.to(elem[elem.length - 1], 0.5, {y:10, alpha:0, ease:Power1.easeIn, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.to(elem[i], 0.5, {y:10, alpha:0, ease:Power1.easeIn, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.to(elem, 0.5, {y:10, alpha:0, delay:delay, ease:Power1.easeIn, onComplete:onComplete});
       }else{
           Anim.to(elem, 0.5, {y:10, alpha:0, ease:Power1.easeIn, delay:delay});
       }
   }
}

Anim.fadeinfromtop = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.from(elem[i - 1], 0.5, {y:-10, alpha:0, ease:Power1.easeOut, delay:(delay * (i - 1))});
            }
            Anim.from(elem[elem.length - 1], 0.5, {y:-10, alpha:0, ease:Power1.easeOut, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.from(elem[i], 0.5, {y:-10, alpha:0, ease:Power1.easeOut, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.from(elem, 0.5, {y:-10, alpha:0, delay:delay, onComplete:onComplete});
       }else{
           Anim.from(elem, 0.5, {y:-10, alpha:0, delay:delay});
       }
   }
}

Anim.fadeouttotop = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.to(elem[i - 1], 0.5, {y:-10, alpha:0, ease:Power1.easeIn, delay:(delay * (i - 1))});
            }
            Anim.to(elem[elem.length - 1], 0.5, {y:-10, alpha:0, ease:Power1.easeIn, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.to(elem[i], 0.5, {y:-10, alpha:0, ease:Power1.easeIn, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.to(elem, 0.5, {y:-10, alpha:0, delay:delay, ease:Power1.easeIn, onComplete:onComplete});
       }else{
           Anim.to(elem, 0.5, {y:-10, alpha:0, ease:Power1.easeIn, delay:delay});
       }
   }
}

//
Anim.slideoffright = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.to(elem[i - 1], 1, {x:750, ease:Power1.easeIn, delay:(delay * (i - 1))});
            }
            Anim.to(elem[elem.length - 1], 1, {x:750, ease:Power1.easeIn, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.to(elem[i], 1, {x:750, ease:Power1.easeIn, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.to(elem, 1, {x:750, ease:Power1.easeIn, delay:delay, onComplete:onComplete});
       }else{
           Anim.to(elem, 1, {x:750, ease:Power1.easeIn, delay:delay});
       }
   }
}

Anim.slideoffleft = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.to(elem[i - 1], 1, {x:-750, ease:Power1.easeIn, delay:(delay * (i - 1))});
            }
            Anim.to(elem[elem.length - 1], 1, {x:-750, ease:Power1.easeIn, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.to(elem[i], 1, {x:-750, ease:Power1.easeIn, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.to(elem, 1, {x:-750, ease:Power1.easeIn, delay:delay, onComplete:onComplete});
       }else{
           Anim.to(elem, 1, {x:-750, ease:Power1.easeIn, delay:delay});
       }
   }
}

Anim.slideoffdown = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.to(elem[i - 1], 1, {y:750, ease:Power1.easeIn, delay:(delay * (i - 1))});
            }
            Anim.to(elem[elem.length - 1], 1, {y:750, ease:Power1.easeIn, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.to(elem[i], 1, {y:750, ease:Power1.easeIn, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.to(elem, 1, {y:750, ease:Power1.easeIn, delay:delay, onComplete:onComplete});
       }else{
           Anim.to(elem, 1, {y:750, ease:Power1.easeIn, delay:delay});
       }
   }
}

Anim.slideofftop = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.to(elem[i - 1], 1, {y:-750, ease:Power1.easeIn, delay:(delay * (i - 1))});
            }
            Anim.to(elem[elem.length - 1], 1, {y:-750, ease:Power1.easeIn, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.to(elem[i], 1, {y:-750, ease:Power1.easeIn, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.to(elem, 1, {y:-750, ease:Power1.easeIn, delay:delay, onComplete:onComplete});
       }else{
           Anim.to(elem, 1, {y:-750, ease:Power1.easeIn, delay:delay});
       }
   }
}

Anim.slideoffup = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.to(elem[i - 1], 1, {y:-750, ease:Power1.easeIn, delay:(delay * (i - 1))});
            }
            Anim.to(elem[elem.length - 1], 1, {y:-750, ease:Power1.easeIn, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.to(elem[i], 1, {y:-750, ease:Power1.easeIn, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.to(elem, 1, {y:-750, ease:Power1.easeIn, delay:delay, onComplete:onComplete});
       }else{
           Anim.to(elem, 1, {y:-750, ease:Power1.easeIn, delay:delay});
       }
   }
}

Anim.slideinfrombottom = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.from(elem[i - 1], 1, {y:750, ease:Power1.easeOut, delay:(delay * (i - 1))});
            }
            Anim.from(elem[elem.length - 1], 1, {y:750, ease:Power1.easeOut, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.from(elem[i], 1, {y:750, ease:Power1.easeOut, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.from(elem, 1, {y:750, ease:Power1.easeOut, delay:delay, onComplete:onComplete});
       }else{
           Anim.from(elem, 1, {y:750, ease:Power1.easeOut, delay:delay});
       }
   }
}

Anim.slideinfromtop = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.from(elem[i - 1], 1, {y:-750, ease:Power1.easeOut, delay:(delay * (i - 1))});
            }
            Anim.from(elem[elem.length - 1], 1, {y:-750, ease:Power1.easeOut, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.from(elem[i], 1, {y:-750, ease:Power1.easeOut, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.from(elem, 1, {y:-750, ease:Power1.easeOut, delay:delay, onComplete:onComplete});
       }else{
           Anim.from(elem, 1, {y:-750, ease:Power1.easeOut, delay:delay});
       }
   }
}

Anim.slideinfromleft = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.from(elem[i - 1], 1, {x:-750, ease:Power1.easeOut, delay:(delay * (i - 1))});
            }
            Anim.from(elem[elem.length - 1], 1, {x:-750, ease:Power1.easeOut, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.from(elem[i], 1, {x:-750, ease:Power1.easeOut, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.from(elem, 1, {x:-750, ease:Power1.easeOut, delay:delay, onComplete:onComplete});
       }else{
           Anim.from(elem, 1, {x:-750, ease:Power1.easeOut, delay:delay});
       }
   }
}

Anim.slideinfromright = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.from(elem[i - 1], 1, {x:750, ease:Power1.easeOut, delay:(delay * (i - 1))});
            }
            Anim.from(elem[elem.length - 1], 1, {x:750, ease:Power1.easeOut, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.from(elem[i], 1, {x:750, ease:Power1.easeOut, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.from(elem, 1, {x:750, ease:Power1.easeOut, delay:delay, onComplete:onComplete});
       }else{
           Anim.from(elem, 1, {x:750, ease:Power1.easeOut, delay:delay});
       }
   }
}

Anim.fadeinfrombottom = function (elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.from(elem[i - 1], 0.5, {y:10, alpha:0, ease:Power1.easeOut, delay:(delay * (i - 1))});
            }
            Anim.from(elem[elem.length - 1], 0.5, {y:10, alpha:0, ease:Power1.easeOut, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.from(elem[i], 0.5, {y:10, alpha:0, ease:Power1.easeOut, delay:(delay * i)});
            }
        }
   }else{
       if(onComplete){
           Anim.from(elem, 0.5, {y:10, alpha:0, delay:delay, onComplete:onComplete});
       }else{
           Anim.from(elem, 0.5, {y:10, alpha:0, delay:delay});
       }
   }
}

Anim.impact = function(elem, delay, transO, onComplete){
    if(typeof elem == 'object' && typeof transO == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.from(elem[i - 1], 0.3, {scale:0, ease:Back.easeOut, delay:(delay * (i - 1)), transformOrigin:transO[i - 1]});
            }
            Anim.from(elem[elem.length - 1], 0.3, {scale:0, ease:Back.easeOut, delay:(delay * (elem.length - 1)), transformOrigin:transO[elem.length - 1], onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.from(elem[i], 0.3, {scale:0, ease:Back.easeOut, delay:(delay * i), transformOrigin:transO[i]});
            }
        }
   }else{
       if(onComplete){
           Anim.from(elem, 0.3, {scale:0, ease:Back.easeOut, delay:delay, transformOrigin:transO, onComplete:onComplete});
       }else{
           Anim.from(elem, 0.3, {scale:0, ease:Back.easeOut, delay:delay, transformOrigin:transO});
       }
   }
}

Anim.shrink = function(elem, delay, transO, onComplete){
    if(typeof elem == 'object' && typeof transO == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.to(elem[i - 1], 0.5, {scale:0, ease:Power1.easeIn, delay:(delay * (i - 1)), transformOrigin:transO[i - 1]});
            }
            Anim.to(elem[elem.length - 1], 0.5, {scale:0, ease:Power1.easeIn, delay:(delay * (elem.length - 1)), transformOrigin:transO[elem.length - 1], onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.to(elem[i], 0.5, {scale:0, ease:Power1.easeIn, delay:(delay * i), transformOrigin:transO[i]});
            }
        }
   }else{
       if(onComplete){
           Anim.to(elem, 0.5, {scale:0, ease:Power1.easeIn, delay:delay, transformOrigin:transO, onComplete:onComplete});
       }else{
           Anim.to(elem, 0.5, {scale:0, ease:Power1.easeIn, delay:delay, transformOrigin:transO});
       }
   }
}

Anim.fadeIn = function(elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.from(elem[i - 1], 0.5, {alpha:0, delay:(delay * (i - 1))});
            }
            Anim.from(elem[elem.length - 1], 0.5, {alpha:0, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.from(elem[i], 0.5, {alpha:0, delay:(delay * i)});
            }
        }
    }else{
        if(onComplete){
            Anim.from(elem, 0.5, {alpha:0, delay:delay, onComplete:onComplete});
        }else{
            Anim.from(elem, 0.5, {alpha:0, delay:delay});
        }
    }
}

Anim.fadeOut = function(elem, delay, onComplete){
    if(typeof elem == 'object'){
        if(onComplete){
            for(var i = 1; i < elem.length; i++){
                Anim.to(elem[i - 1], 0.5, {alpha:0, delay:(delay * (i - 1))});
            }
            Anim.to(elem[elem.length - 1], 0.5, {alpha:0, delay:(delay * (elem.length - 1)), onComplete:onComplete});
        }else{
            for(var i = 0; i < elem.length; i++){
                Anim.to(elem[i], 0.5, {alpha:0, delay:(delay * i)});
            }
        }
    }else{
        if(onComplete){
            Anim.to(elem, 0.5, {alpha:0, delay:delay, onComplete:onComplete});
        }else{
            Anim.to(elem, 0.5, {alpha:0, delay:delay});
        }
    }
}

Anim.dCall = function(delay, func){
    TweenLite.delayedCall(delay, func);
}

//FUNC//
if(typeof Func === 'undefined'){
    var Func = {}, F = Func;
    Func.Test = {};
    Func.T = Func.Test;
}

Func.id = function (id){
    return document.getElementById(id);
};

Func.childOfId = function (id){
    return document.getElementById(id).childNodes[0];
};

Func.switchImg = function (id, src){
    document.getElementById(id).childNodes[0].setAttribute('src', src);
}

Func.changePosition = function(id, nestinglevel){
    var clone = document.getElementById(id).cloneNode(true);
    var container = document.getElementById('container');
    container.removeChild(document.getElementById(id));
    container.insertBefore(clone, container.childNodes[nestinglevel]);
}

Func.HDify = function(id){
    if(typeof id == 'object'){
        for(var i = 0; i < id.length; i++){
            TweenLite.set(Func.childOfId(id[i]), {scale:0.5, x:((document.getElementById('size').getAttribute('data-width')/2) * -1), y:((document.getElementById('size').getAttribute('data-height')/2) * -1)});
        }
    }else{
        TweenLite.set(Func.childOfId(id), {scale:0.5, x:((document.getElementById('size').getAttribute('data-width')/2) * -1), y:((document.getElementById('size').getAttribute('data-height')/2) * -1)});
    }
}

Func.Test.Safari = function(){
    var uagent = navigator.userAgent.toLowerCase();
    if(/safari/.test(uagent) && !/chrome/.test(uagent)){
        return true;
    }else{
        return false;
    }
}

Func.Test.IE8 = function(){
    if (window.attachEvent && !window.addEventListener) {
        // "bad" IE
        return true;
    }else{
        return false;
    }
};

Func.Test.IE9 = function(){
    if(/MSIE 9/i.test(navigator.userAgent)){
        return true;
    }else{
        return false;
    }
};

Func.Test.IE10_Plus = function(){
    if (/MSIE 10/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/12./i.test(navigator.userAgent)){
        //this is some subset of Internet Explorer/Edge
        return true;
    }else{
        return false;
    }
};

Func.Test.Firefox = function(){
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
        return true;
    }else{
        return false;
    }
};

Func.Test.isMobile = function(){
    if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/iPhone|iPod/i) || navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)){
        return true;
    }else{
        return false;
    }
}
        
        