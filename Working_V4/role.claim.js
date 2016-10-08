var roleBuilder     = require('role.builder');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
    
        if(creep.room.name == 'E64S58'){
            creep.moveTo(Game.flags.haulFlag)
        }else{
            if(creep.room.controller) {
                var contr = creep.claimController(creep.room.controller);
                if(contr == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }else if(contr == ERR_GCL_NOT_ENOUGH){
                    if(creep.room.controller) {
                        if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller);    
                        }
                    }
                }
            }
        }
    }

};

module.exports = roleHarvester;