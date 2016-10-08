var roleBuilder = require("role.builder");
var roleUpgrader = require("role.upgrader");

var roleHarvester = {

	/** @param {Creep} creep **/
	run: function(creep) {
		if(creep.carry.energy < creep.carryCapacity) {
			var sources = creep.room.find(FIND_SOURCES);
			if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				if(creep.fatigue == 0) {
					creep.moveTo(sources[0]);
				}
			}
		}
		else {
			if(creep.fatigue == 0){
				var targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_EXTENSION || 
									structure.structureType == STRUCTURE_SPAWN ||
	                                structure.structureType == STRUCTURE_TOWER) &&
							structure.energy < structure.energyCapacity;
					}
				});
				if(targets.length > 0) {
					if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[0]);
					}
				}
				else{
					roleUpgrader.run(creep);
				}
			}
		}
	}
};

module.exports = roleHarvester;