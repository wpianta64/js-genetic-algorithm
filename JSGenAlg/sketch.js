//genetic algorithm for making a cannon shoot a target
var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body;
    Bodies = Matter.Bodies;

// declaring global variables
let engine;
let world;
let population;
let gens;
let best;
let road;

//end declaration of variables

function setup(){
    createCanvas(10000,5000);
    engine = Engine.create();
    world = engine.world;
    gens = 0;

    best = "";
    road = new Road(0,3000,100);    

    textSize(120);

    Engine.run(engine);
    population = new Population(50,4);
}

function draw(){
    fill(20)
    rect(0,0,width,height-1000)

    road.show();

    var still_going = false;
    for(var i = 0; i < population.pop_members.length; i++){
        population.pop_members[i].show();
        if(population.pop_members[i].body.velocity.x > 0.27){
            still_going = true;
        }
    }

    //information/text
    fill(220);
    rect(0,height-1000,width,1000);

    stroke(0);
    fill(0);
    text("Generation: "+ gens,100,4100);
    text(best, 1000, 4100);
    
    

    if(!still_going){
        best = population.resetPop();
        gens++;
    }    
}
