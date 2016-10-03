var roleHarvester   = require('role.harvester');
var roleUpgrader    = require('role.upgrader');
var roleBuilder     = require('role.builder');
var roleRepair      = require('role.repair');
var spawner         = require('spawner');
var roleAttack      = require('role.attack');
var roleHauler      = require('role.hauler');


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
		var harvesters = _(Game.creeps).filter( { memory: { role: 'harvester' } } ).size();
		var builder = _(Game.creeps).filter( { memory: { role: 'builder' } } ).size();
		var upgrader = _(Game.creeps).filter( { memory: { role: 'upgrader' } } ).size();
		var repairs = _(Game.creeps).filter( { memory: { role: 'repair' } } ).size();
		var repairs = _(Game.creeps).filter( { memory: { role: 'repair' } } ).size();
		var attacker = _(Game.creeps).filter( { memory: { role: 'attack' } } ).size();
		console.log('Harvester:\t' +  harvesters + '\nBuilders:\t' + builder + '\nUpgraders:\t' + upgrader + '\nrepair:\t\t' + repairs+ '\nAttackers:\t' + attacker);
	}
    
    
    /* Tower controller */
    var tower = Game.getObjectById('TOWER_ID');
    
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax});
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
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
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        if(creep.memory.role == 'attack') {
            roleAttack.run(creep);
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

	
