class Road{
    constructor(start_x, start_y,length){
        this.length = length;
        this.components = []; //list of all memebers of the road.
        this.end_x = start_x;
        this.end_y = start_y;

        for(var i = 0; i < length; i++){
            this.addMember(i*0.4);
        }
    }

    show(){
        for(var i = 0; i < this.length; i++){
            this.components[i].show();
        }
    }

    addMember(t){
        var angle = noise(t)-0.5;
        this.components.push(new Wall(this.end_x,this.end_y,100,10,angle));
        this.end_x += 100*Math.cos(angle);
        this.end_y += 100*Math.sin(angle);
    }

}