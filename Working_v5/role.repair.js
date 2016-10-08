var roleBuilder = require("role.builder");

module.exports = {
    run: function(creep){
        if (creep.memory.working && creep.carry.energy == 0) {
           creep.memory.working = false;
           creep.say('mining');
        }
        if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
            creep.say('reps incoming');
        }
    
        if (creep.memory.working == true) {
            
            findTarget(creep);
                    /*
                    var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: function(s){ 
                    if(s.hits < 1000 && (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL)){
                        return true;
                    }else if((s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART)){
                        return true;
                    }else if((s.hits < 10000 && s.structureType == STRUCTURE_RAMPART) ){
                        return true;
                    }else if(s.hits < 10000 && s.structureType == STRUCTURE_WALL){
                        return true;
                    }
                        return true;
                    
                    }});
                    */
                    
                    
            function goToStru(creep, target) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            
            
            function findTarget(creep) {
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.hits < 1000 && (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL)});
                if (target) {
                    goToStru(creep, target);
                    return;
                } 
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => (s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART)});
                if (target) {
                    goToStru(creep, target);
                    return;
                }
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.hits < 10000 && (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL)});
                if (target) {
                    goToStru(creep, target);
                    return;
                }
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.hits < 100000 && (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL)});
                if (target) {
                    goToStru(creep, target);
                    return;
                }
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL)});
                if (target) {
                    goToStru(creep, target);
                    return;
                }
             
            
            }
            
            /* else if(){
                
            }
            */
            
            
            
            
            /*
           else  {
				structure = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL) });
				if (structure != undefined) {
                    if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }
                else {
					roleBuilder.run(creep);
                }
            }*/
        }
        else {
            var target = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_STORAGE;
                    }
            });
            if(target){
                 if(creep.withdraw(target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                
            	creep.moveTo(target[0]);    
            }
            }else{
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
        }
    }
};