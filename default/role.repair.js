var roleBuilder = require("role.builder");

module.exports = {
    run: function(creep){
        if (creep.memory.working && creep.carry.energy == 0) {
           creep.memory.working = false;
           creep.say('mining');
        }
        if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
            creep.say('reps incoming');
        }
    
        if (creep.memory.working == true) {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL  && s.structureType != STRUCTURE_RAMPART  });
            
            if (structure != undefined) {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
				
				creep.moveTo(Game.flags.Idel);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
    }
};