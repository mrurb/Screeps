var spawner = {

    /** @param {Creep} creep **/
    run: function(rname) {
		//var spawn = Game.rooms[rname].find[FIND_MY_SPAWNS[0];
		
        var harvesters = _(Game.creeps).filter( { memory: { role: 'harvester' } } ).size();
		var builders = _(Game.creeps).filter( { memory: { role: 'builder' } } ).size();
		var upgraders = _(Game.creeps).filter( { memory: { role: 'upgrader' } } ).size();
		var repairs = _(Game.creeps).filter( { memory: { role: 'repair' } } ).size();
		
		
		
		function getCreepBody(){
			var energyc = Game.rooms[rname].energyCapacityAvailable;
			var creepSetup2 = [];
			var totalBlocks = energyc/50;
			var worka = Math.floor(totalBlocks*0.3);
			var carrya = Math.floor(totalBlocks*0.2);
			var movea = Math.floor(totalBlocks*0.2);
			if(worka<1||carrya<1||movea<1){
			    creepSetup2=[WORK, CARRY, MOVE];
			}else{
    			for(i=0;i < worka; i++){
    				creepSetup2.push(WORK);
    			}
    			for(i=0;i < carrya; i++){
    				creepSetup2.push(CARRY);
    			}
    			for(i=0;i < movea; i++){
    				creepSetup2.push(MOVE);
    			}
    			
    			
			}
			
			
			
			
			var cbody = "" + energyc + ": " + worka + " " + carrya + " " + movea + " |";
    			var x = 0;
    			while(creepSetup2[x]){
    			    cbody+= ", " + creepSetup2[x]; 
    			    x++;
    			}
			console.log(cbody);
			
			
			return creepSetup2;
		}
	
		
		var creepSetup = [WORK, CARRY, MOVE];
		
		       var harvestersarr = _(Game.creeps).filter( { memory: { role: 'harvester' } } );
			   
			   
		//console.log(harvestersarr.toString);
        if (harvesters < 4){
          Game.spawns.Home.createCreep(getCreepBody(), null, {role: "harvester", set: "extractor"})
        } else if (builders < 2){
          Game.spawns.Home.createCreep(getCreepBody(), null, {role: "builder", set: "extractor"})
        } else if (upgraders < 4){
          Game.spawns.Home.createCreep(getCreepBody(), null, {role: "upgrader", set: "extractor"})
        } else if (repairs < 4){
          Game.spawns.Home.createCreep(getCreepBody(), null, {role: "repair", set: "extractor"})
        }
		
		/*
		if(Game.spawns['Home'].memory.tick == 5 % 5) {
			console.log(Game.spawns['Home'].memory.tick);
		}
		*/
    }
};

module.exports = spawner;