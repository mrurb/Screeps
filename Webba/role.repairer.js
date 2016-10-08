var roleUpgrader= require("role.upgrader")

var roleRepairer = {

	/** @param {Creep} creep **/
	run: function(creep) {
		if (creep.memory.working && creep.carry.energy == 0) {
		   creep.memory.working = false;
		}
		else if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
		    creep.memory.working = true;
		}
		
		if (creep.memory.working) {
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
						structure.hits < structure.hitsMax;
				}
			});
			if (targets.length > 0) { 
				var target = targets[0];
				if (creep.repair(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			}
			else {
				roleUpgrader.run(creep);
			}
		}
		else {
			var source = creep.pos.findClosestByPath (FIND_SOURCES);
			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo (source);
			}
		}
	}
};

module.exports = roleRepairer;