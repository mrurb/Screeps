var roleBuilder     = require('role.builder');

var roleHarvester = {

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
            if(creep.memory.node == 99){
            var node0 = _(Game.creeps).filter( { memory: { node: 0 } } ).size();
            var node1 = _(Game.creeps).filter( { memory: { node: 0 } } ).size();
            if(node0 < 2){
                creep.memory.node = 0;
                creep.say('node 0');
            }else{
                 creep.memory.node = 0;
                creep.say('node 1');
                
            }
            }
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.node]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.node]);
            }
        }
        else {
            if(creep.memory.node != 99){
                creep.memory.node = 99;
            }
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                
                                structure.structureType == STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }else{
            	roleBuilder.run(creep);
            }
        }
    }
};

module.exports = roleHarvester;