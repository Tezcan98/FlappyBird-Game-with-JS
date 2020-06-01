var Qtable = [];
for (let i = -160; i < Genislik; i++) {
  Qtable[i] = [];
  for (let j = -Uzunluk-1; j < Uzunluk+1; j++) {
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
  //if (durum[0]==durum[1])
  //  return Math.floor((Math.random() * 2));
  if (durum[0]>=durum[1])
    return 0;
  else
    return 1;
}

var epsilon=0.85;
var ogrenme=0.8;
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
    else{
      rand2=Math.random();
      if (rand2>0.8)
        action=1;
      else
        action=0;
    }
    if(action==1){
      maxH=(kus.jumpspeed*8)-((7*8)/2);
      Odul=Uzunluk-Math.abs(farkY-maxH);
      if(70<farkY-maxH)
        Odul*=5;
      if (kus.jumpspeed!=0)
        kus.jumper();
    }
    else{
        Odul=Uzunluk-Math.abs(farkY + kus.vel); // Yani kuşla engelin aradaki Y farkında kuşun alçalacağı mesafe
        if (farkY + kus.vel<50)
          Odul*=5;

    }
    if(kus.x>=this.x-30 && kus.x<this.x+80)
      if(kus.y>this.bos+70 && kus.y<this.bos+130)
          Odul*=5;
      else
          Odul=-100;
    if (this.y>Uzunluk)
        Odul*=-2;
    Reward(Odul);
  }
}
function Reward(Odul){

  let newX=0;
  if (farkX-engelhız>-110) //yani actiondan sonra borudan geçmiyorsa, borudan geçse yeni FarkX bir sonraki boru ile aradaki mesafe kadar olur
    if(action==1)     //zıplama işlemiyse bir sonraki kontrol 8 zaman birimi sonra oluyor
      newX=farkX-(engelhız*8);
    else
      newX=farkX-engelhız;
  else
    newX=300;
  let newY=0;
  if(action==1) // zıplama yaptıysa yeni Y maksimum zıpladıgı yer, aksi halde kusun düşüş hızı
    newY=farkY-maxH;
  else
    newY=farkY+kus.vel;

  if (newY>=Uzunluk){
    newY=Uzunluk-1;
    farkY=Uzunluk-1;
  }
  if (newY<=-Uzunluk){
      newY=-Uzunluk+1;
      farkY=-Uzunluk+1;
    }
  toplamodul+=Odul;

  document.getElementById('odl').innerText = Odul;
  Qtable[farkX][farkY][action]=Odul+ogrenme*getMax(Qtable[newX][newY]);
}

anychart.onDocumentReady(function () {

  // data
  data = anychart.data.set([
    {x: "E", value: 10}
  ]);

  // set chart type
  var chart = anychart.area();

  chart.title("Her Bölümdeki Toplam Ödül Grafiği");

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
