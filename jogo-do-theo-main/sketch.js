var edges;
var foguete_voando, foguete_explosão, foguete;
var meteoroImg, meteoroGroup;
var espaçoImg, espaço;
var pontos = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var explosãoImg, explosão;
var gameOverImg, gameOver;
var coraçãoImg;
var vidas = [];
var moedaImg, moedaGroup;
var alienGroup, alienImg;
var laserAzul, laserAzulImg, laserAzulGroup;
var lazerVermelho, laserVermelhoImg, laserVermelhoGroup;
var ganhou, ganhouImg;
var v = 0;
var AlienGrupo = [];
var laserVermelhoGrupo = [];
var planeta, palnetaImg;

function preload(){

    espaçoImg = loadImage("espaço");
    meteoroImg = loadImage("meteoro.png");
    foguete_voando = loadAnimation("foguete_voando.png");
    foguete_explosão = loadAnimation("foguete_explosao.png");
    gameOverImg = loadImage("gameOver.png");
    coraçãoImg = loadImage("coração.png");
    moedaImg = loadImage("moeda.png");
    alienImg = loadImage("alien.png");
    laserAzulImg = loadImage("laser azul.png");
    laserVermelhoImg = loadImage("laser vermelho.png");
    planetaImg = loadImage("planeta.png");
    ganhouImg = loadImage("You Win.png");
}

function setup() {
    createCanvas(600,600);

    edges = createEdgeSprites();

    espaço = createSprite(300,300);
    espaço.addImage(espaçoImg);
    espaço.velocityY = 1;

    planeta = createSprite(300, -height*2);
    planeta.addImage(planetaImg);
    planeta.velocityY = 0
    planeta.scale = 5;

    foguete = createSprite(300,300);
    foguete.addAnimation("voando", foguete_voando);
    foguete.addAnimation("explosão", foguete_explosão);
    foguete.scale = 0.35

    for(var i = 0; i < 3; i ++){
      var vida = createSprite(50 + 55*i, 50)
      vida.addImage(coraçãoImg)
      vida.scale = 0.2
      vidas.push(vida)
    }

    meteoroGroup = new Group();
    moedaGroup = new Group();
    alienGroup = new Group();
    laserAzulGroup = new Group();
    
    gameOver = createSprite(300,300);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;

    ganhou = createSprite(300,300);
    ganhou.addImage(ganhouImg);
    ganhou.visible = false;

    foguete.setCollider("circle",0,0,150);
    //foguete.debug = true;
    //alien.debug = true;



}

function atirarAlien(){
 
 if(World.frameCount>142 && World.frameCount % 100==0 &&
   AlienGrupo[AlienGrupo.length-1] !== undefined ) {

  laserVermelho = createSprite(AlienGrupo[AlienGrupo.length-1].x, 100)
  laserVermelho.addImage(laserVermelhoImg)
  laserVermelho.scale = 0.1
  laserVermelho.velocityY= 7
  laserVermelhoGrupo.push(laserVermelho)
  laserVermelho.lifetime = 200

 }

}

function gerarMoeda(){

    if(World.frameCount % 80 == 0){   
        var moeda = createSprite(Math.round(random(50, 550)), 10, 10);
        moeda.addImage(moedaImg);
        moeda.velocityY = 10;
        moeda.lifetime = 700;
        moeda.scale = 0.08;
        moedaGroup.add(moeda);
        moeda.lifetime = 200

    }

}

function gerarAlien(){

  if(World.frameCount % 140 == 0){   
    var alien = createSprite(300,10);
    alien.addImage(alienImg);
    alien.velocityX = 6;
    alien.scale = 0.3;
    AlienGrupo.push(alien);

}
}

function atirarFoguete(){
  laserAzul= createSprite(50,20)
  laserAzul.y= foguete.y
  laserAzul.x= foguete.x
  laserAzul.addImage(laserAzulImg)
  laserAzul.scale=0.5
  laserAzul.velocityY= -7
  laserAzulGroup.add(laserAzul)
  laserAzul.lifetime = 100
}

function gerarMeteoro(){

  if(World.frameCount % 80 == 0){   
    var meteoro = createSprite(Math.round(random(50, 550)), 10, 10);
    meteoro.addImage(meteoroImg);
    meteoro.velocityY = 3;
    meteoro.lifetime = 200;
    meteoro.scale = 0.1;
    meteoroGroup.add(meteoro);
  

}

}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    
    meteoroGroup.destroyEach();
    moedaGroup.destroyEach();
    
    espaço.velocityY = 1;
    
    foguete.changeAnimation("voando",foguete_voando);
    
    
  }

  function fim(){
    if(foguete.isTouching(planeta)){
      meteoroGroup.destroyEach();
      moedaGroup.destroyEach();
      ganhou.visible = true;
      espaço.velocityY = 0;
      planeta.velocityY = -1;


    }
  }

  atirarFoguete();
   

function draw() {
    //reset();


    
    background("black");

   for(var i=0; i < AlienGrupo.length; i++){
      if( AlienGrupo[i] !== undefined){
        AlienGrupo[i].bounceOff(edges)   
      }
   }

    if (gameState===PLAY){

        v = getFrameRate() / 60 + 3;
        espaço.velocityY = v;
      
        foguete.y = World.mouseY;
        foguete.x = World.mouseX;
      
        meteoroGroup.setVelocityYEach(v);
        moedaGroup.setVelocityYEach(v);
        espaço.velocityY = v
      
        if(espaço.y > 600){
            espaço.y = height/4;
          }
      
        
        gerarMeteoro();
        gerarMoeda();
        gerarAlien();
        atirarAlien();
        fim();
        

        if(pontos >= 50){
          planeta.velocityY = v;

          meteoroGroup.setVelocityYEach(0);
          meteoroGroup.destroyEach();

          moedaGroup.setVelocityYEach(0);
          moedaGroup.destroyEach();

         

        }

        if(keyDown("space")){
          atirarFoguete();
        }

        

        laserAzulGroup.overlap(meteoroGroup, function(coletor,coletado){
          coletado.remove()
          coletor.remove()
  
        })



        for(var i=0; i < laserVermelhoGrupo.length; i++){

          if(laserVermelhoGrupo[i].isTouching(foguete)){
              laserVermelhoGrupo[i].destroy();
              vidas[vidas.length-1].destroy();
              vidas.pop();
          }
        }


        for(var i=0; i < AlienGrupo.length; i++){
          if(AlienGrupo[i] !== undefined){
          if(laserAzulGroup.isTouching(AlienGrupo[i])){
              laserAzulGroup.destroyEach();
              AlienGrupo[i].destroy();
              AlienGrupo[i] = undefined;
              pontos+=20
          }
        }
        }


        foguete.overlap(meteoroGroup, function(coletor,coletado){
          coletado.remove()
          vidas[vidas.length-1].destroy();
          vidas.pop();
  
        })

        if(vidas.length ==0){
          gameState = END
        }

      }
      else if (gameState === END) {
        
        
        espaço.velocityY = 0;
        foguete.velocityY = 0;
        meteoroGroup.setVelocityYEach(0);
        moedaGroup.setVelocityYEach(0);
        foguete.changeAnimation("explosão", explosão);
        
        
        meteoroGroup.setLifetimeEach(-1);
        
        gameOver.visible = true;
        
        if(mousePressedOver(gameOver)) {
          reset();
        }
      }

      foguete.overlap(moedaGroup, function(coletor,coletado){
        coletado.remove()
        pontos++

      })
        
        

      



    drawSprites()
    textSize(40);
    fill("white");
    text("Pontos: "+ pontos,400, 50);
}