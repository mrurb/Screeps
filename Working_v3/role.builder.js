var roleUpgrader    = require('role.upgrader');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {

            var targets = creep.room.find(FIND_CONSTRUCTION_SITES, { filter: (s) => s.structureType != STRUCTURE_ROAD });
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }else if(targets.length==0){
				var targets2 = creep.room.find(FIND_CONSTRUCTION_SITES);
				if(creep.build(targets2[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets2[0]);
                }else if(targets.length==0){
				
                roleUpgrader.run(creep);
            
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

module.exports = roleBuilder;