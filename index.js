
document.write('<script type="text/javascript" src="Qlearning.js" ></script>');
var canvas=document.getElementById("mycanvas");

var ctx = canvas.getContext("2d");

const Genislik = 800;
const Uzunluk  = 600;
var kus_resmi = document.getElementById("kus");
var asagi = document.getElementById("asa");
var yukari = document.getElementById("yuk");
var engelhız=6;
var zıpla=0;
var jump_f=false;
var iv;
var puan=0;
var hit = document.getElementById("hit");
var point = document.getElementById("point");
var wing = document.getElementById("wing");

var best=0;
var soundFlag1=true;
var soundFlag2=true;
var soundFlag3=true;

function playOneTime(sound,flag){
  //if(flag){
  //    sound.play();
  //    return false;
  //}
}

class Player{
  constructor(w,h){
    this.w=w;
    this.h=h;
    this.gravity=1;
    this.vel=0;
    this.jumpspeed=15;
    this.x=Genislik/10;
    this.y=Uzunluk/2;
  }

  jumper(){
     jump_f=true;
  }
  death(){
    soundFlag1=playOneTime(hit,soundFlag1)
    //engelhız=0;

    Reward(-10*Uzunluk);
    this.jumpspeed=0;
    this.vel=0;
    this.jumpspeed=15;
    this.x=Genislik/10;
    this.y=Uzunluk/2;
    grafik.push(toplamodul);
    toplamodul=0;
    puan=0;
    engel1.x=400;
    engel2.x=700;
    engel3.x=1000;
    addPoint();
  }
  yercekimi(){
    if(jump_f){
      this.y-=this.jumpspeed;
      this.jumpspeed-=this.gravity;
      zıpla++;

      if (zıpla>7 ){
        jump_f=false;
        zıpla=0;
        this.vel=0;
        this.jumpspeed=15;
        soundFlag3=playOneTime(wing,soundFlag3);
      }
    }else {
      this.vel+=this.gravity
      this.y+=this.vel;
      soundFlag3=true;
    }
    if (this.y>Uzunluk){

         this.death();
    }
  }
  draw(){
    ctx.drawImage(kus_resmi, this.x, this.y,this.w,this.h);
  }
  update(){
    this.draw();
    this.yercekimi();
  }

};
class Engel{
  constructor(free,x){
    this.bos=free;
    this.x=x;
  }
  draw(){
    ctx.fillStyle= '#af0';
    ctx.drawImage(asa, this.x, this.bos-500,100,Uzunluk);
    ctx.drawImage(yuk, this.x, this.bos+250,100,Uzunluk);
  }
  update(){
    this.x-=engelhız;
    if(this.x<-100){
      r=Math.floor(Math.random() * Uzunluk/2);
      this.bos=r;
      this.x=Genislik;
    }
    this.toslama();
    this.draw();
  }

  toslama(){
    if(kus.x>=this.x-30 && kus.x<this.x+80){
      if(kus.y>this.bos+70 && kus.y<this.bos+200){
        puan++; // aradan geçesiye loopa 22 kez giriyor sonuç için 22ye bolucez
        if (puan>best)
          best=puan;
        Reward(Genislik*100);
        soundFlag2=playOneTime(point,soundFlag2);
      }
      else
        kus.death();
    }else {
      soundFlag2=true;
    }
  }
}
document.addEventListener("keydown",event =>{
  if (kus.jumpspeed!=0)
    kus.jumper();
});

let kus = new Player(60,60);
var r=Math.floor(Math.random() * Uzunluk/2);
let engel1=new Engel(r,400);
r=Math.floor(Math.random() * Uzunluk/2);
let engel2=new Engel(r,700);
r=Math.floor(Math.random() * Uzunluk/2);
let engel3=new Engel(r,1000);

kus.draw();
engel1.draw();
engel2.draw();
engel3.draw();

ctx.fillStyle= '#000';
ctx.font = "60px Arial";
ctx.fillText(puan,Genislik/2-100, Uzunluk/2);

function gameLoop()
{
  ctx.clearRect(0,0,Genislik,Uzunluk);

  ctx.font = "30px Arial";
  ctx.fillText(parseInt(puan/16),Genislik/2-10, Uzunluk/2);

  engel1.update();
  engel2.update();
  engel3.update();
  kus.update();
  train();

  ctx.fillStyle= '#000';
  ctx.font = "20px Arial";
  ctx.fillText("En Yüksek Skor:"+ parseInt(best/16),Genislik-250, 100);

}

var oyun=setInterval(gameLoop, 0.003);

var oyun2=setInterval(gameLoop, 0.003);
var oyun3=setInterval(gameLoop, 0.0003);
var yavasF=false;
function yavas(){

     clearInterval(oyun);
     if(yavasF){
       oyun=setInterval(gameLoop, 0.0000001);
       oyun2=setInterval(gameLoop, 0.003);
       oyun3=setInterval(gameLoop, 0.0003);

       yavasF=false;
     }
     else{
       clearInterval(oyun3);
       clearInterval(oyun2);

       oyun=setInterval(gameLoop, 25);
       yavasF=true;
     }
}
