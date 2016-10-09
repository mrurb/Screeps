var spawner = {

    /** @param {Room} Room name **/
    run: function(rname, creepJson) {
		var spawn = Game.rooms[rname].find(FIND_MY_SPAWNS)[0];
		
		if(spawn){
		        var harvesters = _(Game.creeps).filter( { memory: { role: 'harvester' } } ).size();
	            if(harvesters == 0 && creepJson.creeps.miner.max != 0 && creepJson.creeps.harvester.max == 0 && Game.rooms[rname].energyAvailable < 1000){
	                var miners = _(Game.creeps).filter( { memory: { role: 'miner' } } ).size();
	                var mover = _(Game.creeps).filter( { memory: { role: 'move' } } ).size();
	                
	                if(miners == 0 || mover == 0){
	                    creepJson.creeps.harvester.max = 1;
	                }
                 }
		    
		    
		    
		    
		    function getCreepBody(rname, bratio){
    			var energyc = Game.rooms[rname].energyCapacityAvailable;
    			var creepSetup2 = [];
    			var totalBlocks = ((energyc)/50)*creepJson.energy;
    			
			
			    if(!bratio.move){
			         creepSetup2.push(MOVE);
			         totalBlocks - 1;
			    }
			    
			    
			    for(var x in bratio){
			        var worka = Math.floor(totalBlocks*bratio[x])-1;
			        creepSetup2 = creepSetup2.concat(_.times(worka, function(){return x;}));
			    }
    			
    			if(creepJson.creeps.harvester.max != 0){
        			var harvesters = _(Game.creeps).filter( { memory: { role: 'harvester' } } ).size();
        			var harvestersMissing = creepJson.creeps.harvester.max - harvesters;
        			
        			if(harvestersMissing == creepJson.creeps.harvester.max){
        		        creepSetup2 = [WORK, CARRY, MOVE];
        		    }
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
   
			return creepSetup2;
    		
		    }
		    
		    for(var creepRole in creepJson.creeps){
		        var maxCreeps = creepJson.creeps[creepRole].max;
	            var cSize = _(Game.creeps).filter( { memory: { role: creepRole } } ).size();
	            
	            
	            
	            
	           
	            if (cSize < maxCreeps){
	               if(creepJson.creeps[creepRole].bratio){
	                    //console.log("3");
	                    spawn.createCreep(getCreepBody(rname, creepJson.creeps[creepRole].bratio), undefined, {role: creepRole, node: 99});
                        break;
	                }
	                else if(creepJson.creeps[creepRole].body){
	                    //console.log("2");
                        spawn.createCreep(creepJson.creeps[creepRole].body, undefined, {role: creepRole, node: 99});
                        break;
	                }else{
	                    //console.log("1")
	                    bratio = {"carry":0.33, "work":0.16, "move":0.33};
                        spawn.createCreep(getCreepBody(rname, bratio), undefined, {role: creepRole, node: 99});
                        break;
	                }
                } 
                
	    	}
        }
    }
};

module.exports = spawner;