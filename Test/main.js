var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair = require('role.repair');
var spawner = require('spawner')

module.exports.loop = function () {
    
    
	
	for(var rname in Game.rooms) {
	    spawner.run(rname);
	}
	
	
	
	if(Game.time % 10 == 0){
		var harvesters = _(Game.creeps).filter( { memory: { role: 'harvester' } } ).size();
		var builder = _(Game.creeps).filter( { memory: { role: 'builder' } } ).size();
		var upgrader = _(Game.creeps).filter( { memory: { role: 'upgrader' } } ).size();
		var repair = _(Game.creeps).filter( { memory: { role: 'repair' } } ).size();
		console.log('Harvester:\t' +  harvesters + '\nBuilders:\t' + builder + '\nUpgraders:\t' + upgrader + '\nrepair:\t\t' + repair);
	}

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
		
    }
	
	
}