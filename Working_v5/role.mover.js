var roleBuilder     = require('role.builder');

var roleMover = {

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
            
            var target = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_STORAGE;
                    }
            });
            
            if(creep.withdraw(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                
            	creep.moveTo(target[0]);    
            }
        }
        else {
            if(creep.memory.node != 99){
                creep.memory.node = 99;
            }
            
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter:(structure) => { return (structure.structureType == STRUCTURE_TOWER) && structure.energy < 600;}});
            
            if(targets) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }else{
            	 var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter:(structure) => { return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;}});
                
                if(targets) {
                    if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets);
                    }
                }else{
                	var targets = creep.room.find(FIND_STRUCTURES, {filter:(structure) => {return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;}});
                
                    if(targets.length > 0) {
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                        }
                    }else{
                    	roleBuilder.run(creep);
                    }
                }
            }
        }
    }
};

module.exports = roleMover;