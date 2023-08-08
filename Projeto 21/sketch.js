
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var ball;
var ground;

function preload()
{
	
}

function setup() {
	createCanvas(800, 700);

	engine = Engine.create();
	world = engine.world

	var ball_options={
		isStatic: false,
		restitution: 0.3,
		friction: 0,
		density:1.2
	};

	var ground_options ={
		isStatic: true
	  };

	  ball = Bodies.circle(100,109,20,ball_options);
	  World.add(world,ball);
	
	  ground = Bodies.rectangle(200,390,2000,20,ground_options);
	  World.add(world,ground);

	  lixeira1 = Bodies.rectangle(400,390,15,400, ground_options)
	  World.add(world,lixeira1)

	  lixeira2 = Bodies.rectangle(600,390,15,400, ground_options)
	  World.add(world,lixeira2)

	  ellipseMode(RADIUS);
	  rectMode(CENTER);
  
}

function keyPressed(){

	if(keyCode == 32){
		Matter.Body.applyForce(ball, {x:0, y:0}, {x:40, y:-70})
	}

}


function draw() {
  rectMode(CENTER);
  background("green");
  Engine.update(engine);

  ellipse(ball.position.x, ball.position.y, 20);
  rect(ground.position.x, ground.position.y, 2000, 20 );
  rect(lixeira1.position.x, lixeira1.position.y, 15, 400);
  rect(lixeira2.position.x, lixeira2.position.y, 15, 400);

 
}



