var roleUpgrader= require("role.upgrader")

var roleBuilder = {

	/** @param {Creep} creep **/
	run: function(creep) {
		if (creep.memory.working && creep.carry.energy == 0) {
		   creep.memory.working = false;
		}
		else if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
		    creep.memory.working = true;
		}
		
		if (creep.memory.working) {
			var constructionSite = creep.pos.findClosestByPath (FIND_CONSTRUCTION_SITES);
			if (constructionSite != undefined) { 
				if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
					creep.moveTo(constructionSite);
				}
			}
			else {
				roleUpgrader.run(creep);
			}
		}
		else {
			var sources = Game.spawns.Spawn1.room.find(FIND_SOURCES);
			if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[1]);
			}
		}
	}
};

module.exports = roleBuilder;

// var roleUpgrader= require("role.upgrader")

// var roleBuilder = {

// 	/** @param {Creep} creep **/
// 	run: function(creep) {
// 		if (creep.memory.working && creep.carry.energy == 0) {
// 		   creep.memory.working = false;
// 		}
// 		else if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
// 		    creep.memory.working = true;
// 		}
		
// 		if (creep.memory.working) {
// 			if(creep.memory.path == undefined)
// 			{
// 				var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
// 					filter: (structure) => {
// 						return structure.owner == "Webba";
// 					}
// 				});
// 				if (constructionSite != undefined) { 
// 					if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
// 						creep.memory.path = creep.pos.findPathTo(constructionSite);
// 					}
// 				}
// 			}
// 			else{
// 				if (creep.memory.path.length > 1){
// 					var pathResult = creep.moveByPath(creep.memory.path);
// 					if(pathResult == PATH_END){
						
// 					}
// 				}
// 			}
// 		}
// 		else {
// 			var source = creep.pos.findClosestByPath (FIND_SOURCES);
// 			if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
// 				creep.moveTo (source);
// 			}
// 		}
// 	}
// };

// module.exports = roleBuilder;