class DNA{
    constructor(new_genome){
        this.genome = [];

        if(Array.isArray(new_genome)){//if an array is passed, just make the new genome equal to that array
            this.genome = new_genome;
        }
        else{//push a random number between 0 and 1 into the genome, creating a totally random new genome of a length equal to the number passed into the function
            for(var i = 0; i < new_genome; i++){
                this.genome.push(Math.random());
            }
        }
    }

    //creates a new DNA object whose genome is a combination of the DNA this method is acting on and dna passed to it, returns the new DNA object
    createChild(DNA_2){
        var new_genome = [];

        //selects genes randomly (50/50) from each parent to be used in the new genome
        for(var i = 0; i < this.genome.length; i++){
            if(Math.random() > 0.5){
                new_genome.push(this.genome[i])
            }
            else{
                new_genome.push(DNA_2.genome[i])
            }
        }
        var new_DNA = new DNA(new_genome);

        return new_DNA;
    }

    //creates random changes to the DNA based on a mutation rate
    mutate(){
        var mutation_rate = 0.01;
        for(var i = 0; i < this.genome.length; i++){
            if(Math.random() < mutation_rate){
                this.genome[i] = Math.random();
            }
        }
    }
};