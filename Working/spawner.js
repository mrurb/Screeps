var spawner = {

    /** @param {Room} Room name **/
    run: function(rname) {
		//var spawn = Game.rooms[rname].find[FIND_MY_SPAWNS[0];
		
        var harvesters = _(Game.creeps).filter( { memory: { role: 'harvester' } } ).size();
		var builders = _(Game.creeps).filter( { memory: { role: 'builder' } } ).size();
		var upgraders = _(Game.creeps).filter( { memory: { role: 'upgrader' } } ).size();
		var repairs = _(Game.creeps).filter( { memory: { role: 'repair' } } ).size();
		var attacker = _(Game.creeps).filter( { memory: { role: 'attack' } } ).size();
        var hauler = _(Game.creeps).filter( { memory: { role: 'hauler' } } ).size();
		
		var maxHarvesters   = 4;
		var maxBuilders     = 1;
		var maxUpgraders    = 3;
		var maxRepairs      = 3;
		var energyUse       = 1;
		var maxAttacker     = 1;
		var maxHauler     = 0;
		
		
		
		function getCreepBody(){
			var energyc = Game.rooms[rname].energyCapacityAvailable;
			var creepSetup2 = [];
			var totalBlocks = ((energyc-200)/50)*energyUse;
			var worka = Math.floor(totalBlocks*0.3);
			var carrya = Math.floor(totalBlocks*0.2);
			var movea = Math.floor(totalBlocks*0.2);
		//	if(worka<1||carrya<1||movea<1){
			    creepSetup2=[WORK, CARRY, MOVE];
			//}else{
    			for(i=0;i < worka; i++){
    				creepSetup2.push(WORK);
    			}
    			for(i=0;i < carrya; i++){
    				creepSetup2.push(CARRY);
    			}
    			for(i=0;i < movea; i++){
    				creepSetup2.push(MOVE);
    			}
    			
    			
		//	}
			
			
			
			if(Game.time % 10 == 1){
			    var cbody = "" + energyc + ": " + (worka + 1) + " " + carrya  + " " + movea + " |";
    			var x = 0;
    			while(creepSetup2[x]){
    			    cbody+= ", " + creepSetup2[x]; 
    			    x++;
    			}
    			
    			
    			var harvestersMissing = maxHarvesters - harvesters;
    			var buildersMissing = maxBuilders - builders;
    			var upgradersMissing = maxUpgraders - upgraders;
    			var repairMissing = maxRepairs - repairs;
    			var attackMissing = maxAttacker - attacker;
    			
        			
    			if(harvestersMissing > 0 || buildersMissing > 0 || upgradersMissing > 0 || repairMissing > 0){
        			cbody += "\n Missing: ";
        			if(harvesters != maxHarvesters){
        			    cbody += "Harvester x" + harvestersMissing + " | "; 
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
        			if(attacker != maxAttacker){
        			    cbody += "Attackers x" + attackMissing + " | "; 
        			}
    			}
    		    if(harvestersMissing == 0){
    		        creepSetup2 = [WORK, CARRY, MOVE];
    		    }
    			
			console.log(cbody);
			}
			//creepSetup2 = [WORK, CARRY, MOVE];
			return creepSetup2;
		}
	
		
		var creepSetup = [WORK, CARRY, MOVE];
		
		var rampartrep = _(Game.creeps).filter( { memory: { role: 'rampart' } } ).size();
			   
			   
		//console.log(harvestersarr.toString);
        if (harvesters < maxHarvesters){
          Game.spawns.Home.createCreep(getCreepBody(), undefined, {role: "harvester", node: 99, set: "extractor"})
        } else if (builders < maxBuilders){
          Game.spawns.Home.createCreep(getCreepBody(), undefined, {role: "builder", set: "extractor"})
        } else if (upgraders < maxUpgraders){
          Game.spawns.Home.createCreep(getCreepBody(), undefined, {role: "upgrader", set: "extractor"})
        } else if (repairs < maxRepairs){
            if(rampartrep <= 1){
                Game.spawns.Home.createCreep(creepSetup, undefined, {role: "repair", set: "extractor", rampart: true})
            }else{
                Game.spawns.Home.createCreep(creepSetup, undefined, {role: "repair", set: "extractor", rampart: false})
            }
          
        } else if (hauler < maxHauler){
        // Game.spawns.Home.createCreep(getCreepBody(), undefined, {role: "hauler"});
        } else if (attacker < maxAttacker){
         Game.spawns.Home.createCreep( [ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE], undefined, {role: "attack" , working: true}  );
        }
		
		/*
		if(Game.spawns['Home'].memory.tick == 5 % 5) {
			console.log(Game.spawns['Home'].memory.tick);
		}
		*/
    }
};

module.exports = spawner;