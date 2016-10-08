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
            if(creep.memory.rampart){
                    structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (
                    s.hits < s.hitsMax && s.structureType == STRUCTURE_RAMPART) 
                    || (s.hits < 1000 && s.structureType == STRUCTURE_RAMPART) 
                    || (s.hits < 1000 && s.structureType == STRUCTURE_WALL)
                    //|| (s.hits < 10000 && s.structureType == STRUCTURE_RAMPART) 
                    || (s.hits < 10000 && s.structureType == STRUCTURE_WALL)
                    //|| (s.hits < s.hitsMax && s.structureType == STRUCTURE_RAMPART) 
                    //|| (s.hits < s.hitsMax && s.structureType == STRUCTURE_WALL)
                    });
            }else{
                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) =>   (s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART)  });
            }
            
            if (structure != undefined) {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            } else {
				structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL) });
				if (structure != undefined) {
                    if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }
                else {
					roleBuilder.run(creep);
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
};