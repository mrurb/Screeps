var spawner = {

    /** @param {Room} Room name **/
    run: function(rname, creepJson) {
		var spawn = Game.rooms[rname].find(FIND_MY_SPAWNS)[0];
		
		if(spawn){
		    
		    function getCreepBody(rname){
    			var energyc = Game.rooms[rname].energyCapacityAvailable;
    			var creepSetup2 = [];
    			var totalBlocks = ((energyc)/50)*creepJson.energy;
    			var worka = Math.floor(totalBlocks*0.33)-1;
    			var carrya = Math.floor(totalBlocks*0.42)-1;
    			var movea = Math.floor(totalBlocks*0.24)-1;
    			    creepSetup2=[WORK, CARRY, MOVE];
        			for(i=0;i < worka; i++){
        				creepSetup2.push(WORK);
        			}
        			
        			for(i=0;i < movea; i++){
        				creepSetup2.push(MOVE);
        			}
        			for(i=0;i < carrya; i++){
        				creepSetup2.push(CARRY);
        			}
        			
        			var missingBody = totalBlocks - creepSetup2.length;
        			if(creepSetup2 > 0){
        			    creepSetup2.push(MOVE);
        			}
        			
        			
        			var harvesters = _(Game.creeps).filter( { memory: { role: 'harvester' } } ).size();
        			var harvestersMissing = creepJson.creeps.harvester.max - harvesters;
        			//creepSetup2 = [WORK, CARRY, MOVE];
        			
        			if(harvestersMissing == creepJson.creeps.harvester.max){
        		        creepSetup2 = [WORK, CARRY, MOVE];
        		    }
        		    var totalMax = 0;
        		    for(var x in creepJson.creeps){
        		        totalMax += creepJson.creeps[x].max;
        		    }
        		    var creepLow = Game.creeps.length * 0.5;
        		    if(totalMax < creepLow){
        		         creepSetup2 = [WORK, CARRY, MOVE];
            		         if(Game.time % 10 == 2){
            		             console.log("ceeepLow");
            		         }     
        		    }
        		    
        		    //conOut(energyc, worka, carrya, movea);
        		    
        		    
        		    
        		    
        		    
    			return creepSetup2;
    		}
		    
		    
		    if(Game.time % 10 == 1){
		        var energyCc = Game.rooms[rname].energyCapacityAvailable;
            			console.log(energyCc + ", " + getCreepBody(rname));
        		    }
		    
		    var creepSetup = [WORK, CARRY, MOVE];
		   
		    
		    
		    
		    for(var creepRole in creepJson.creeps){
		        var maxCreeps = creepJson.creeps[creepRole].max;
	            var cSize = _(Game.creeps).filter( { memory: { role: creepRole } } ).size();
	            
	           
	            if (cSize < maxCreeps){
	                if(creepJson.creeps[creepRole].body){
                        spawn.createCreep(creepJson.creeps[creepRole].body, undefined, {role: creepRole, node: 99});
                        break;
	                }else{
                        spawn.createCreep(getCreepBody(rname), undefined, {role: creepRole, node: 99});
                        break;
	                }
                } 
                
	    	}
        }
    }
};

module.exports = spawner;