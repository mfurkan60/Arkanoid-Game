$(function(){

    var svg=Pablo('#ground').svg({
        width:1100,
        height:750
    });

    var top;
    var topX=550;//
    var topY=500;//
    var topR=10;//

    var alanX1=0;
    var alanX2=1100;

    var alanY1=0;
    var alanY2=750;

    top=svg.circle({//daire oluşturmaya yarayan metot
        cx:topX,
        cy:topY,
        r:topR,
        fill:'#060'
    });

    var yon=[+1,-1];

    var yonX=yon[Math.floor(Math.random()*2)]//0  yada 1 değerini alacak
    var yonY=yon[Math.floor(Math.random()*2)];

    var yay;
    var yayX=500;
    var yayY=700;

    yay=svg.rect({//yayı oluşturan dikdörtgen
        x:yayX,
        y:yayY,
        width:240,height:40,
        fill:'#FF7A4D'
    });

    //console.log(yay);

    var w=85;
    var h=25;

    var tuglaArray=new Array();

    for(var tY=50;tY<350;tY=tY+45){
        for(var tX=35;tX<1065;tX=tX+105){
            var randomCiz=Math.floor(Math.random()*2);
            if(randomCiz==1)
            tuglaOlustur(tX,tY);
        }
    }

    var guc=1;
    
    setInterval(function(){

        top.attr({cx:topX,cy:topY});

        
        topX=topX+yonX;
        topY=topY+yonY;

        

        if(topX==alanX1+10||topX==alanX2-10)
        {
            yonX=yonX*-1;
        }

        if(topY==alanY1+10||topY==alanY2-10)//
        {
            yonY=yonY*-1;
        }

        if(topY==690 && (topX>yayX-10 && topX<yayX+250))//yay ile çarpışma
        {
            yonY=yonY*-1;
        }

         


        for(var i=0;i<tuglaArray.length;i++)
        {
            if((tuglaArray[i].guc>0) && ((topY==tuglaArray[i].y+h+topR && (topX>tuglaArray[i].x-topR && topX<tuglaArray[i].x+w+topR))||(topY==tuglaArray[i].y-topR && (topX>tuglaArray[i].x-topR && topX<tuglaArray[i].x+w+topR)))){
                yonY=yonY*-1;
                tuglaArray[i].sanal.remove();
                tuglaArray[i].guc=0;
            }

            if((tuglaArray[i].guc>0) && ((topX==tuglaArray[i].x-topR && (topY>tuglaArray[i].y-topR && topY<tuglaArray[i].y+h+topR))||(topX==tuglaArray[i].x+w+topR && (topY>tuglaArray[i].y-topR && topY<tuglaArray[i].y+h+topR)))){
                yonX=yonX*-1;
                tuglaArray[i].sanal.remove();
                tuglaArray[i].guc=0;
            }
        }
        
        

    },2);

        $(document).mousemove(function(e){
            yayX=e.clientX;

            if(yayX<860)
                yay.attr({x:yayX});
        })

        $(document).keydown(function(event){ 
            var code=event.which;

            if(code==37){ 
                yayX=yayX-5;

                if(yayX>0)
                    yay.attr({x:yayX});
            }

            if(code==39){
                yayX=yayX+5;

                if(yayX<860)
                    yay.attr({x:yayX});
            }
            
            
        })

        var tugla;

        function tuglaOlustur(tx,ty)//tuğla oluşturan fonksiyon
        {
            var sanalTugla=svg.rect({
                x:tx,
                y:ty,
                width:w,height:h,
                fill:'#FF2626'
            })

            var tugla={
                x:tx,
                y:ty,
                guc:1,
                sanal:sanalTugla
            }

            tuglaArray.push(tugla);
            
            
        }
    


})