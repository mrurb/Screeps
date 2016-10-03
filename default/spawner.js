var spawner = {

    /** @param {Creep} creep **/
    run: function() {
		
        var harvesters = _(Game.creeps).filter( { memory: { role: 'harvester' } } ).size();
 
		var builder = _(Game.creeps).filter( { memory: { role: 'builder' } } ).size();
		var upgrader = _(Game.creeps).filter( { memory: { role: 'upgrader' } } ).size();
		var repair = _(Game.creeps).filter( { memory: { role: 'repair' } } ).size();
		
		       var harvestersarr = _(Game.creeps).filter( { memory: { role: 'harvester' } } );
			   
			   
		//console.log(harvestersarr.toString);
        if (harvesters < 2){
          Game.spawns.Home.createCreep([WORK,CARRY,MOVE], null, {role: "harvester", set: "extractor"})
        } else if (builder < 2){
          Game.spawns.Home.createCreep([WORK,CARRY,MOVE], null, {role: "builder", set: "extractor"})
        } else if (upgrader < 4){
          Game.spawns.Home.createCreep([WORK,CARRY,MOVE], null, {role: "upgrader", set: "extractor"})
        } else if (repair < 1){
          Game.spawns.Home.createCreep([WORK,CARRY,MOVE], null, {role: "repair", set: "extractor"})
        }
		
		/*
		if(Game.spawns['Home'].memory.tick == 5 % 5) {
			console.log(Game.spawns['Home'].memory.tick);
		}
		*/
    }
};

module.exports = spawner;