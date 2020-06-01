var Qtable = [];
for (let i = -150; i < Genislik; i++) {
  Qtable[i] = [];
  for (let j = -1*Uzunluk-1; j < Uzunluk+1; j++) {
    Qtable[i][j] = [];
    for (let z = 0; z < 2; z++) {
      Qtable[i][j][z] = 0;
    }
  }
}
var toplamodul=0;
function getXY(){
  let m1=[engel1.x-kus.x,kus.y-(engel1.bos)];
  if (m1[0]<-110){
    m1[0]=Genislik;
  }
  let m2=[engel2.x-kus.x,kus.y-(engel2.bos)];
  if (m2[0]<-110){
    m2[0]=Genislik
  }
  let m3=[engel3.x-kus.x,kus.y-(engel3.bos)];
  if (m3[0]<-110){
    m3[0]=Genislik
  }
  if ((m1[0]<m2[0]) && (m1[0]<m3[0])){
    return m1;
  }
  else
    if((m2[0]<m1[0]) && (m2[0]<m3[0]))
      return m2;
    else
      return m3;
}
function getMax(durum){
  if (durum[0]>=durum[1])
    return 0;
  else
    return 1;
}

var epsilon=0.8;
var ogrenme=0.7;
var gamma=0.8;
var farkX;
var farkY;
function train(){
  let Engel=getXY();
  farkX=Engel[0];
  farkY=Engel[1];
  document.getElementById('engelcoord').innerText = Engel;
  if(jump_f==false){
    rand=Math.random();
    if (rand<epsilon)
      action=getMax(Qtable[farkX][farkY]);
    else
      action=Math.floor(Math.random() * 2);

    if(action==1){
      maxH=(kus.jumpspeed*8)-((7*8)/2);
      if(farkY-100 < maxH){
        Odul=farkY*1000;
      //  action=0;
      //  Odul=Uzunluk-farkY- kus.vel;
      }
      else{
        Odul=Uzunluk-farkY;
       
      }
      if (kus.jumpspeed!=0)
        kus.jumper();
    }
    else{
      if(farkY>165)
        Odul=-1000*farkY;
        //action=1;
      //  Odul=Uzunluk-farkY;
      //  if (kus.jumpspeed!=0)
      //    kus.jumper();
      else
        Odul=Uzunluk-farkY- kus.vel; // Yani kuşla engelin aradaki Y farkında kuşun alçalacağı mesafe
    }
    Reward(Odul);
  }
}
function Reward(Odul){
  Qtable[farkX][farkY][action]=Odul+ogrenme*
}

anychart.onDocumentReady(function () {

  // data
  data = anychart.data.set([
    {x: "P1", value: 10}
  ]);

  // set chart type
  var chart = anychart.area();

  chart.title("Append Point Demo");

  // set data
  var area = chart.splineArea(data);

  // set container and draw chart
  chart.container("container").draw();
});

var grafik=[];
function addPoint() {
  // first index for new point
  newIndex = (data.mapAs().getRowsCount())+1;

  // append data
  data.append({

    // x value
    x: "new P" + newIndex,
    // random value from 1 to 100
    value : grafik[grafik.length-1]
  });
};
