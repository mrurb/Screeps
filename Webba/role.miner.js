var roleHarvester = require("role.harvester");

var roleMiner = {

	/** @param {Creep} creep **/
	run: function(creep) {
		if(creep.carry.energy < creep.carryCapacity) {
			var sources = creep.room.find(FIND_SOURCES);
			if(creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[creep.memory.source]);
			}
		}
		else {
			var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) &&
						_.sum(structure.store) < structure.storeCapacity;
				}
			});
			if(targets.length > 0) {
				if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
			}
			else{
				roleHarvester.run(creep);
			}
		}
	}
};

module.exports = roleMiner;