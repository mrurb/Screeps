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
var roleMiner       = require('role.miner');
var roleMover       = require('role.mover');
//var recycle         = require('recycle');



module.exports.loop = function () {
    
	    var friendly = ["Pandemic_FTP", "Webba", "Mantras"];
	    
	    var creepJson = {
            "E64S58":{"energy":0.70, "creeps":{
                'harvester':{"name":'harvester', "max":1},
                'miner':{"name":'miner', "max":1, "body":['work', 'work', 'work', 'work', 'work', 'work', 'move', 'carry', 'carry', 'carry', 'carry', 'carry', 'carry', 'carry'], 'bratio':{"carry":0.5, "work":0.25}},
                'move':{"name":'move', "max":1, "body":['carry', 'carry', 'carry', 'carry', 'carry', 'carry', 'carry', 'carry', 'carry', 'carry', 'move', 'move', 'move', 'move',  'move', 'move', 'move', 'move',  'move', 'move' ], "bratio":{"carry":0.7, "move":0.30}},
                'attack':{"name":'attack', "max":0, "body":["tough", "tough", "tough", "tough","attack", "move", "move", "move", "attack", "attack", "move"]}, 
                'builder':{"name":'builder', "max":1}, 
                'upgrader':{"name":'upgrader', "max":1}, 
                'repair':{"name":'repair', "max":1}, 
                'hauler2':{"name":'hauler2', "max":4}, 
                'repair2':{"name":'repair2', "max":0},
                'hauler':{"name":'hauler', "max":2}, 
                'claim':{"name":'claimer', "max":0, "body":["claim", "move", "move"]}
                }
                
            }
	    };
	    
	    
    
    /* remove dead creeps  */
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    
    
	/* Room controller */
	for(var rname in Game.rooms) {
	    if(creepJson[rname]){
	        spawner.run(rname, creepJson[rname]);
	    }

	    
	}
	
	
	/* Console output */

	if(Game.time % 10 == 0){
	    for(var rname in Game.rooms) {
	        if(creepJson[rname]){
        	    var conOut = '';
        	    for(var res in creepJson[rname].creeps){
        	        var cSize = _(Game.creeps).filter( { memory: { role: res } } ).size();
        	       conOut += res + ':\t'+ ((res.length <= 6) ? '\t' : '') + cSize + "/" + creepJson[rname].creeps[res].max +  '\n';
        	    }
	        }
	    }
	    console.log(conOut);
	}
    
    
    /* Tower controller */
    var tower = Game.getObjectById('57f4c26e4f6b4a4070acc6a6');
    
    if(tower) {
        if(tower.energy > 600 ){
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
    /*
    , {
                filter: (c) => {
                        return friendly.indexOf(c.owner.username) == -1;
                }
            }*/
    
    var spawn = Game.spawns.Home;
    
    var closestHostile = spawn.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            var homeRoom = spawn.room;
            homeRoom.controller.activateSafeMode();
        }

	
	/* Creep controller */
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if(creep.hits < creep.memory.lastHits) {
             Game.notify('Creep '+creep+' has been attacked at '+creep.pos+'!');
        }
        creep.memory.lastHits = creep.hits;
                
        //if(creep.ticksToLive < 10000){
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
        if(creep.memory.role == 'miner'){
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'move'){
            roleMover.run(creep);
        }
        /*}else{
            if(creep.room.name != Game.spawns.Home.room.name){
                creep.moveTo(Game.spawns.Home)
            }else{
                recycle.run(creep);
            }
        }*/
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

	
