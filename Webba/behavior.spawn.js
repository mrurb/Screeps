/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('behavior.spawn');
 * mod.thing == 'a thing'; // true
 */
var spawnBehavior = {
	getBodyParts: function(spawn, partRatios, energyPercentage){
		var maxEnergy = spawn.room.energyCapacityAvailable;
		var costPerRatio = _.sum(_.map(partRatios, function(no, part){
			return BODYPART_COST[part] * no;
		}));
		var multiplier = Math.floor(maxEnergy * energyPercentage / costPerRatio);
		var body = [];
		for (var part in partRatios){
			body = body.concat(_.times(partRatios[part] * multiplier, _.constant(part)));
		}
		return body;
	},

	spawnCreep: function(spawn, creepType){
		var memWrite = {role: creepType};
		if (creepType == "miner"){
			memwrite.source = 0;
		}
		spawn.createCreep(this.getBodyParts(spawn, spawn.memory.creepParts[creepType], spawn.memory.energyPercentage[creepType]), undefined, memWrite);
	},

	pollSpawn: function(spawn){
		for (var role in spawn.memory.creepMax){
			if(spawn.memory.creepMax[role] > this.getCreepCount(spawn, role)){
				this.spawnCreep(spawn, role);
				break;
			}
		}
	},

	getCreepCount: function(spawn, creepType){
		return _.filter(spawn.room.find(FIND_MY_CREEPS), function(creep){ return creep.memory.role == creepType }).length;
	},

	initSpawn: function(spawn){
		spawn.memory.creepParts = {};
		spawn.memory.creepParts.harvester = { work: 1, move: 1, carry: 1};
		spawn.memory.creepParts.upgrader = { work: 1, move: 1, carry: 1};
		spawn.memory.creepParts.builder = { work: 1, move: 1, carry: 1};
		spawn.memory.creepParts.repairer = { work: 1, move: 1, carry: 1};
		spawn.memory.creepParts.miner = { work: 2, move: 1, carry: 1};
		spawn.memory.creepMax = {};
		spawn.memory.creepMax.harvester = 1;
		spawn.memory.creepMax.upgrader = 2;
		spawn.memory.creepMax.builder = 2;
		spawn.memory.creepMax.repairer = 1;
		spawn.memory.creepMax.miner = 2;
		spawn.memory.energyPercentage = {};
		spawn.memory.energyPercentage.harvester = 1;
		spawn.memory.energyPercentage.upgrader = 1;
		spawn.memory.energyPercentage.builder = 1;
		spawn.memory.energyPercentage.repairer = 1;
		spawn.memory.energyPercentage.miner = 1;
	}
}

module.exports = spawnBehavior;