var spawner = {

    /** @param {Creep} creep **/
    run: function(rname) {
		//var spawn = Game.rooms[rname].find[FIND_MY_SPAWNS[0];
		
        var harvesters = _(Game.creeps).filter( { memory: { role: 'harvester' } } ).size();
        var harvesters2 = _(Game.creeps).filter( { memory: { role: 'harvester2' } } ).size();
		var builders = _(Game.creeps).filter( { memory: { role: 'builder' } } ).size();
		var upgraders = _(Game.creeps).filter( { memory: { role: 'upgrader' } } ).size();
		var repairs = _(Game.creeps).filter( { memory: { role: 'repair' } } ).size();
		
		var maxHarvesters   = 2;
        var maxHarvesters2  = 2;
		var maxBuilders     = 2;
		var maxUpgraders    = 4;
		var maxRepairs      = 1;
		
		
		
		
		function getCreepBody(){
			var energyc = Game.rooms[rname].energyCapacityAvailable;
			var creepSetup2 = [];
			var totalBlocks = (energyc/50)*0.75;
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
			
			
			
			if(Game.time % 10 == 1){
			    var cbody = "" + energyc + ": " + worka + " " + carrya + " " + movea + " |";
    			var x = 0;
    			while(creepSetup2[x]){
    			    cbody+= ", " + creepSetup2[x]; 
    			    x++;
    			}
    			
    			
    			var harvestersMissing = maxHarvesters - harvesters;
    			var harvesters2Missing = maxHarvesters2 - harvesters2;
    			var buildersMissing = maxBuilders - builders;
    			var upgradersMissing = maxUpgraders - upgraders;
    			var repairMissing = maxRepairs - repairs;
    			
        			
    			if(harvestersMissing > 0 || harvesters2Missing > 0 || buildersMissing > 0 || upgradersMissing > 0 || repairMissing > 0){
        			cbody += "\n Missing: ";
        			if(harvesters != maxHarvesters){
        			    cbody += "Harvester x" + harvestersMissing + " | "; 
        			}
        			if(harvesters2 != maxHarvesters2){
        			    cbody += "Harvester2 x" + harvesters2Missing + " | "; 
        			}
        			if(builders != maxBuilders){
        			    cbody += "Builders x" + buildersMissing + " | "; 
        			}
        			if(upgraders != maxUpgraders){
        			    cbody += "Upgraders x" + upgradersMissing + " | "; 
        			}
        			if(repairs != maxRepairs){
        			    cbody += "Repairs x" + repairMissing + " | "; 
        			}
    			}
    			
    			
			console.log(cbody);
			}
			//creepSetup2 = [WORK, CARRY, MOVE];
			return creepSetup2;
		}
	
		
		var creepSetup = [WORK, CARRY, MOVE];
		
		var harvestersarr = _(Game.creeps).filter( { memory: { role: 'harvester' } } );
			   
			   
		//console.log(harvestersarr.toString);
        if (harvesters < maxHarvesters){
          Game.spawns.Home.createCreep(getCreepBody(), null, {role: "harvester", set: "extractor"})
        } else if (builders < maxBuilders){
          Game.spawns.Home.createCreep(getCreepBody(), null, {role: "builder", set: "extractor"})
        } else if (upgraders < maxUpgraders){
          Game.spawns.Home.createCreep(getCreepBody(), null, {role: "upgrader", set: "extractor"})
        } else if (repairs < maxRepairs){
          Game.spawns.Home.createCreep(getCreepBody(), null, {role: "repair", set: "extractor"})
        }else if (harvesters2 < maxHarvesters2){
          Game.spawns.Home.createCreep(getCreepBody(), null, {role: "harvester2", set: "extractor"})
        }
		
		/*
		if(Game.spawns['Home'].memory.tick == 5 % 5) {
			console.log(Game.spawns['Home'].memory.tick);
		}
		*/
    }
};

module.exports = spawner;