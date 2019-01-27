class Projectile{
    //projectile class for genetic algorithm
    //DNA Length = 4 - radius, force agle, restitution, angular velocity

    constructor(x,y,dna){
        this.DNA = dna;
        this.r = this.DNA.genome[0]*25+10; //radius between 10 and 35
        this.force = 0.04;
        this.f_angle = Math.PI*this.DNA.genome[1]/2;
        this.start_x = x;
        this.start_y = y;
        this.trail = [] //array of vectors that contain points to draw a trail behind the ball

        //creates matter.js body and adjusts properties
        this.body = Bodies.circle(x,y,this.r,{restitution:this.DNA.genome[2]});
        World.add(world, this.body);
        this.body.collisionFilter.group = -1; //makes it so the projectiles dont collide with one another

        //sets forces and initial positions
        
        this.reset();
    }

    //sets the body back to its initial state
    reset(){
        this.DNA.mutate();//every time a projectile is reset, it should have a chance to mutate
        this.trail = [this.body.position];
        Body.setVelocity(this.body, {x:0.3,y:0});
        Body.setPosition(this.body, {x:this.start_x,y:this.start_y})
        Body.applyForce(this.body, this.body.position, {x: Math.cos(this.f_angle)*this.force, y: 0-Math.sin(this.f_angle)*this.force});
    }

    evaluateFitness(){
        return this.body.position.x;
    }

    show(){
        var pos = this.body.position;
        var angle = this.body.angle;

        if(this.trail.length > 7){
            this.trail.splice(0,1);
        }
        this.trail.push({x:this.body.position.x,y:this.body.position.y});

        stroke(this.body.speed*10,0,0);
        for(var i = 0; i < this.trail.length-1; i++){
            strokeWeight(3*i);
            line(this.trail[i].x, this.trail[i].y,this.trail[i+1].x,this.trail[i+1].y);
        }

        strokeWeight(1);
        push();
        fill(170);
        stroke(255);

        translate(pos.x,pos.y);
        rotate(angle);

        ellipse(0,0,this.r*2);
        line(0,0,Math.cos(angle)*this.r,Math.sin(angle)*this.r);
        pop();
    }

    readout(){
        var printer = "Genes:\n";
        printer += "Radius: " + this.r.toFixed(2) + "\n";
        printer += "Force Angle: " + this.f_angle.toFixed(2) + "\n";
        printer += "Restitution: " + this.body.restitution.toFixed(2) + "\n";
        printer += "Angular Velocity: " + (this.DNA.genome[3]*2).toFixed(2) + "\n";
        printer += "Distance: " + this.body.position.x.toFixed(2) + "\n";

        return printer;
    }
};