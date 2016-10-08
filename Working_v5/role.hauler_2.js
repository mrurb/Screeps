var roleBuilder     = require('role.builder');

var roleHauler2 = {

    /** @param {Creep} creep **/
    run: function(creep) {

      

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            if(creep.memory.trip == null){creep.memory.trip=0}
            creep.memory.trip = creep.memory.trip + 1;
            creep.say('harvesting'+ creep.memory.trip);
			
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if(creep.memory.upgrading) {
            if(creep.room.name != 'E64S58'){
                creep.moveTo(Game.flags.Home);
			
            }else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity) || (structure.structureType == STRUCTURE_STORAGE && _.sum(structure.store) < structure.storeCapacity);
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
                if(targets.length == 0){
            	    roleBuilder.run(creep);
                }
            }
        }
        else {
            if(creep.room.name == 'E64S58'){
				creep.moveTo(Game.flags.haul2);

            }else{
                var sources = creep.room.find(FIND_SOURCES);
    		   
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1]);
        				
                    }
    		    
            }
            
        }
    }
};

module.exports = roleHauler2;