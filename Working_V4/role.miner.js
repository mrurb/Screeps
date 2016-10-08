

var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.carry.energy == 0  && creep.memory.offload){
            creep.memory.offload = false;
            creep.say("loading")
        }
        if(creep.carry.energy == creep.carryCapacity && !creep.memory.offload){
            creep.memory.offload = true;
            creep.say("off-loading")
        }
    
    
        
        if(!creep.memory.offload) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
            creep.say('mining');
        }
        else {
            
            /*var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) && structure.energy < structure.energyCapacity;
                    }
            });
            */
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) && _.sum(structure.store) < structure.storeCapacity;
                    }
            });
            console.log(targets);
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }else{
            	
            	
            }
        }
    }
};

module.exports = roleMiner;