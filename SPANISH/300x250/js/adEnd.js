banner.adEndProps = {};

banner.adEnd = function(){
    A.impact('btn', 0, B.tOrigin);
    if(B.scrollingLegal === false){
        if(B.legalBubble === true){
            A.dCall(B.adEndProps.openDelay, function(){
                A.visible('bubble');
                A.dCall(B.adEndProps.closeDelay, function(){
                    B.adState = 'ended';
                    A.invisible('bubble');
                    B.showReload(1);
                });
            });
        }else{
            B.adState = 'ended';
            A.invisible('bubble');
                B.showReload(1);
        }
    }else{
        A.dCall(B.adEndProps.openDelay, function(){
        A.set('bubble', {alpha:1});
            A.set('xclose', {alpha:1});
            TweenLite.set('#legal_text_image', {display:'block'});
            TweenLite.to('#legal_text_image', 1, {y:banner.legalTextPositions[1], delay:1});
            A.dCall(B.adEndProps.closeDelay, function(){
                A.set('bubble', {alpha:0});
                A.set('xclose', {alpha:0});
                TweenLite.set('#legal_text_image', {display:'none', y:0});
                B.adState = 'ended';
                B.showReload(1);
            });
        });
    }
}
