/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('recycle');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    
    run: function(creep){
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN);
                    }
            });
            if(targets.length > 0) {
                    /*
                    if(!creep.memory.dieing){
                        creep.memory.dieing = true;
                    }
                    */
                    if(targets[0].recycleCreep(creep) == ERR_NOT_IN_RANGE){
                        creep.moveTo(targets[0]);
                    }
            }
    }
};

