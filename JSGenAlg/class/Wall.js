class Wall{
    //basic boundry creator using matterjs and displayed with P5
    constructor(x,y,w,h,a){
        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle(x,y,w,h,{isStatic:true, angle:a});
        World.add(world, this.body);
    }

    show(){
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x,pos.y);
        rotate(angle);
        rectMode(CENTER);
        stroke(255);
        fill(50);
        rect(0,0,this.w,this.h);
        pop();
    }
};