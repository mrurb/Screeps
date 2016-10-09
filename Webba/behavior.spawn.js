/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('behavior.spawn');
 * mod.thing == 'a thing'; // true
 */
var spawnBehavior = {
	getBodyParts: function(spawn, useRatio, partRatios, energyPercentage){
		var multiplier = 1;
		if (useRatio)
		{
			var maxEnergy = spawn.room.energyCapacityAvailable;
			var costPerRatio = _.sum(_.map(partRatios, function(no, part){
				return BODYPART_COST[part] * no;
			}));
			multiplier = Math.floor(maxEnergy * energyPercentage / costPerRatio);
		}
		var body = [];
		for (var part in partRatios){
			body = body.concat(_.times(partRatios[part] * multiplier, _.constant(part)));
		}
		return body;
	},

	spawnCreep: function(spawn, creepType){
		var memWrite = {role: creepType, spawnedBy: spawn.id};
		return spawn.createCreep(this.getBodyParts(spawn, spawn.memory.template[creepType].useRatio, spawn.memory.template[creepType].parts, spawn.memory.template[creepType].energyRatio), undefined, memWrite);
	},

	pollSpawn: function(spawn){
		for (var role in spawn.memory.template){
			if(spawn.memory.template[role].maxCount > this.getCreepCount(spawn, role)){
				return this.spawnCreep(spawn, role);
			}
		}
		return undefined;
	},

	getCreepCount: function(spawn, creepType){
		return _.filter(Game.creeps, function(creep){ return (creep.memory.role == creepType && creep.memory.spawnedBy == spawn.id) }).length;
	},

	initSpawn: function(spawn){
		spawn.memory.template.harvester = {}
		spawn.memory.template.harvester.useRatio = true;
		spawn.memory.template.harvester.parts = { work: 1, move: 1, carry: 1};
		spawn.memory.template.harvester.maxCount = 2;
		spawn.memory.template.harvester.energyRatio = 0.5;
		spawn.memory.template.upgrader = {}
		spawn.memory.template.upgrader.useRatio = true;
		spawn.memory.template.upgrader.parts = { work: 1, move: 1, carry: 1};
		spawn.memory.template.upgrader.maxCount = 2;
		spawn.memory.template.upgrader.energyRatio = 0.5;
		spawn.memory.template.builder = {}
		spawn.memory.template.builder.useRatio = true;
		spawn.memory.template.builder.parts = { work: 1, move: 1, carry: 1};
		spawn.memory.template.builder.maxCount = 1;
		spawn.memory.template.builder.energyRatio = 0.5;
		spawn.memory.template.miner = {}
		spawn.memory.template.miner.useRatio = true;
		spawn.memory.template.miner.parts = { work: 2, move: 1, carry: 1};
		spawn.memory.template.miner.maxCount = 0;
		spawn.memory.template.miner.energyRatio = 0.5;
	}
}

module.exports = spawnBehavior;