var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {

      

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
			
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if(creep.memory.upgrading) {
            if(creep.room.name != 'E64S58'){
                creep.moveTo(Game.flags.Home);
			
            }else{
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);

                }
            }
        }
        else {
            if(creep.room.name == 'E64S58'){
				creep.moveTo(Game.flags.minerFlag);

            }else{
                var sources = creep.room.find(FIND_SOURCES);
			
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
				
            }
            }
            
        }
    }
};

module.exports = roleHauler;