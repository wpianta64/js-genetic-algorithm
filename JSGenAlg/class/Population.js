//the population class holds a list of all members of the population.

class Population{
    //creates a randomly generated population of maximum members and with DNA lengths of DNA_length.
    constructor(max_population, DNA_length){
        this.pop_members = [];
        this.max_pop = max_population;

        for(var i = 0; i < max_population; i++){
            this.pop_members.push(new Projectile(-50,2600,new DNA(DNA_length)));
        }

        this.sortPop();
    }

    //sorts according to fitness with highest at front.
    sortPop(){
        this.pop_members = this.pop_members.sort((a,b) => {
            return b.evaluateFitness() - a.evaluateFitness();
        });

        this.best_member = this.pop_members[0];
    }

    //sorts the array with the highest fitness at the front!!
    //"natural" selection to decide who the survivors are.
    cull(){
        this.sortPop();

        var len = this.pop_members.length;
        var num_culled = 0;

        var avg_fitness = 0;

        for(var i = 0; i < len; i++){
            avg_fitness += this.pop_members[i].evaluateFitness();
        }

        avg_fitness = avg_fitness / len;

        for(var i = 0; i < len; i++){
            if(this.pop_members[i-num_culled].evaluateFitness() < avg_fitness && Math.random()>0.03){
                World.remove(world,this.pop_members[i-num_culled].body);
                this.pop_members.splice(i-num_culled,1); //deletes the element at i
                num_culled++;
            }
        }
        return num_culled;
    }
    
    //creates new members to fill spaces left by culled members
    repopulate(){
        var mating_pool = [];
        for(var i = 0; i < this.pop_members.length; i++){
            for(var j = 0; j < 1/*((this.pop_members.length-i)*(this.pop_members.length-i))/4*/;j++){ 
                //add the i to the mating pool an 
                //amount of times equal to the total population length - i 
                mating_pool.push(i);
            }
        }

        while(this.pop_members.length < this.max_pop){
            //this ABOMINATION of a function simply creates a new population member that is a child of 2 of the current population members. 
            var mate_1 = Math.floor(Math.random()*mating_pool.length);
            var mate_2 = Math.floor(Math.random()*mating_pool.length);

            while(mate_2 == mate_1){
                var mate_2 = Math.floor(Math.random()*mating_pool.length);
            }

            var new_pop_member = new Projectile(-50,2600,this.pop_members[mating_pool[mate_1]].DNA.createChild(this.pop_members[mating_pool[mate_2]].DNA));

            this.pop_members.push(new_pop_member);
        }
    }

    resetPop(){
        this.cull();
        this.repopulate();
        
        var best = this.best_member.readout();

        for(var i = 0; i < this.pop_members.length; i++){
                this.pop_members[i].reset();
            }   
            return best;
    }

        getBest(){
            this.sortPop();
            return this.best_member;
    }
}

