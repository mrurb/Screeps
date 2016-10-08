var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleRepairer = require('role.miner');
var roleHome = require('role.gohome');
var spawnBehavior = require("behavior.spawn")

module.exports.loop = function () {
	Game.util = require("util");
	Game.spawnBehavior = spawnBehavior;

	var towers = _.filter(Game.structures, (structure) => {
		return structure.structureType == STRUCTURE_TOWER
	});
	for (var i = 0; i < towers.length; i++) {
		var tower = towers[i];		
		if(tower) {

			var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
			if(closestHostile) {
				tower.attack(closestHostile);
			}
			else{
				if(tower.energy > tower.energyCapacity*0.8)
				{
					var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
						filter: (structure) => structure.hits < structure.hitsMax
					});
					if(closestDamagedStructure) {
						tower.repair(closestDamagedStructure);
					}
				}
			}
		}
	}


	for(var spawn in Game.spawns){
		spawnBehavior.pollSpawn(Game.spawns[spawn]);
	}
	
	
	for(var name in Game.creeps) {
		var creep = Game.creeps[name];
		if(creep.memory.role == "harvester"){
		    roleHarvester.run(creep);
		}
		else if(creep.memory.role == "upgrader"){
		    roleUpgrader.run(creep);
		}
		else if(creep.memory.role == "builder"){
		    roleBuilder.run(creep);
		}
		else if(creep.memory.role == "repairer"){
		    roleRepairer.run(creep);
		}
		else if(creep.memory.role == "miner"){
			roleMiner.run(creep);
		}
		else if(creep.memory.role == "gohome"){
			roleHome.run(creep);
		}
	}
	
	for(var name in Memory.creeps) {
	    if(!Game.creeps[name]) {
	        delete Memory.creeps[name];
	        console.log('Clearing non-existing creep memory:', name);
	    }
	}
}

function getNextExtensionLocation(room){
    var row = 1;
    var direction = 1;
}