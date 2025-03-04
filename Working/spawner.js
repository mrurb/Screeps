var spawner = {

    /** @param {Room} Room name **/
    run: function(rname) {
		var spawn = Game.rooms[rname].find(FIND_MY_SPAWNS)[0];
		if(spawn){
    		
    		
            var harvesters = _(Game.creeps).filter( { memory: { role: 'harvester' } } ).size();
    		var builders = _(Game.creeps).filter( { memory: { role: 'builder' } } ).size();
    		var upgraders = _(Game.creeps).filter( { memory: { role: 'upgrader' } } ).size();
    		var repairs = _(Game.creeps).filter( { memory: { role: 'repair' } } ).size();
    		var repairs2 = _(Game.creeps).filter( { memory: { role: 'repair2' } } ).size();
    		var attacker = _(Game.creeps).filter( { memory: { role: 'attack' } } ).size();
            var hauler = _(Game.creeps).filter( { memory: { role: 'hauler' } } ).size();
            var hauler2 = _(Game.creeps).filter( { memory: { role: 'hauler2' } } ).size();
    		
    		var maxHarvesters   = 2;
    		var maxBuilders     = 1;
    		var maxUpgraders    = 1;
    		var maxRepairs      = 2;
    		var maxRepairs2      = 0;
    		var energyUse       = 0.75;
    		var maxAttacker     = 0;
    		var maxHauler     = 4;
    		var maxHauler2     = 4;
    		
    		
    		
    		function getCreepBody(rname){
    			var energyc = Game.rooms[rname].energyCapacityAvailable;
    			var creepSetup2 = [];
    			var totalBlocks = ((energyc-200)/50)*energyUse;
    			var worka = Math.floor(totalBlocks*0.3);
    			var carrya = Math.floor(totalBlocks*0.2);
    			var movea = Math.floor(totalBlocks*0.2);
    			    creepSetup2=[WORK, CARRY, MOVE];
        			for(i=0;i < worka; i++){
        				creepSetup2.push(WORK);
        			}
        			for(i=0;i < carrya; i++){
        				creepSetup2.push(CARRY);
        			}
        			for(i=0;i < movea; i++){
        				creepSetup2.push(MOVE);
        			}
        			var harvestersMissing = maxHarvesters - harvesters;
        			//creepSetup2 = [WORK, CARRY, MOVE];
        			
        			if(harvestersMissing == maxHarvesters){
        		        creepSetup2 = [WORK, CARRY, MOVE];
        		    }
        		    //conOut(energyc, worka, carrya, movea);
        		    
        		    if(Game.time % 10 == 1){
            		    var cbody = rname + ", " + totalBlocks + " " + energyc + ": " + (worka + 1) + " " + carrya  + " " + movea + " |";
            		    var x = 0;
            			while(creepSetup2[x]){
            			    cbody+= ", " + creepSetup2[x]; 
            			    x++;
            			}
            			console.log(cbody);
        		    }
        		    
        		    
        		    
    			return creepSetup2;
    		}
    		
    		var test = getCreepBody(rname);
    	
    		
    		var creepSetup = [WORK, CARRY, MOVE];
    		
    		var rampartrep = _(Game.creeps).filter( { memory: { role: 'rampart' } } ).size();
    			   
    			   
    		//console.log(harvestersarr.toString);
            if (harvesters < maxHarvesters){
                  spawn.createCreep(getCreepBody(rname), undefined, {role: "harvester", node: 99, set: "extractor"})
            } else if (builders < maxBuilders){
                  spawn.createCreep(getCreepBody(rname), undefined, {role: "builder", set: "extractor"})
            } else if (upgraders < maxUpgraders){
                  spawn.createCreep(getCreepBody(rname), undefined, {role: "upgrader", set: "extractor"})
            }else if (attacker < maxAttacker){
                 spawn.createCreep( [ATTACK, ATTACK, MOVE, MOVE, MOVE], undefined, {role: "attack" , working: true}  );
            } else if (repairs < maxRepairs){
                if(rampartrep <= 1){
                    spawn.createCreep(creepSetup, undefined, {role: "repair", set: "extractor", rampart: true})
                }else{
                    spawn.createCreep(creepSetup, undefined, {role: "repair", set: "extractor", rampart: false})
                }
              
            } else if (repairs2 < maxRepairs2){
                    spawn.createCreep(creepSetup, undefined, {role: "repair2", set: "extractor"})
            } else if (hauler < maxHauler){
                 spawn.createCreep(getCreepBody(rname), undefined, {role: "hauler"});
            }else if (hauler2 < maxHauler2){
                 spawn.createCreep(getCreepBody(rname), undefined, {role: "hauler2"});
            } 
    		
    		/*
    		if(Game.spawns['Home'].memory.tick == 5 % 5) {
    			console.log(Game.spawns['Home'].memory.tick);
    		}
    		*/
    		
    		
    			function conOut(energyc, worka, carrya, movea){
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
        			var haulerMIssing = maxHauler - hauler;
        			var hauler2Missing = maxHauler2 - hauler2;
        			
            			
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
            			if(hauler != maxHauler){
            			    cbody += "Hauler x" + haulerMissing + " | "; 
            			}
            			if(hauler2 != maxHauler2){
            			    cbody += "hauler2 x" + hauler2Missing + " | "; 
            			}
        			}
        		 
        			
    			console.log(cbody);
    			}
    			}
    		
    		
        }
    }
};

module.exports = spawner;