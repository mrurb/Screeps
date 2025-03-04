var roleHarvester   = require('role.harvester');
var roleUpgrader    = require('role.upgrader');
var roleBuilder     = require('role.builder');
var roleRepair      = require('role.repair');
var roleRepair2     = require('role.repair_2');
var spawner         = require('spawner');
var roleAttack      = require('role.attack');
var roleHauler      = require('role.hauler');
var roleHauler2     = require('role.hauler_2');
var roleClaim       = require('role.claim');


module.exports.loop = function () {
    
    /* remove dead creeps  */
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    
    
	/* Room controller */
	for(var rname in Game.rooms) {
	    spawner.run(rname);
	}
	
	
	/* Console output */

	if(Game.time % 10 == 0){
	    var carr = [['harvester', 2],
	    ['builder', 1], 
	    ['upgrader', 1], 
	    ['repair', 2], 
	    ['repair2', 0],
	    ['attack', 0], 
	    ['hauler', 4], 
	    ['hauler2', 4]]
	    var conOut = '';
	    for(var res in carr){
	        var cSize = _(Game.creeps).filter( { memory: { role: carr[res][0] } } ).size();
	        conOut += carr[res][0] + ':\t'+ ((carr[res][0].length <= 6) ? '\t' : '') + cSize + "/" + carr[res][1] +  '\n';
	    }
	    console.log(conOut);
	}
    
    
    /* Tower controller */
    var tower = Game.getObjectById('57f4c26e4f6b4a4070acc6a6');
    
    if(tower) {
        if(tower.energy > 500 ){
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => (structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL) || (structure.hits < 2000 && structure.structureType === STRUCTURE_WALL) });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
        }
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

	
	/* Creep controller */
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
		if(creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
        if(creep.memory.role == 'repair2') {
            roleRepair2.run(creep);
        }
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        if(creep.memory.role == 'hauler2') {
            roleHauler2.run(creep);
        }
        if(creep.memory.role == 'attack') {
            roleAttack.run(creep);
        }
        if(creep.memory.role == 'claim'){
            roleClaim.run(creep);
        }
		
    }
    
    
    
   
};
/*
 function killAllCreeps(){
        for(var name in Game.creeps){
            var creep = Game.creeps[name];
            creep.suicide;
        }
        
module.exports = {
    killAllCreeps: killAllCreeps;
};
*/

	
