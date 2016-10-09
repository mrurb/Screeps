var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.transferring){
            if (creep.carry.energy == 0){
                creep.memory.transferring = false;
            }
            else{
                var transferResult = creep.transfer(creep.room.controller, RESOURCE_ENERGY)
                if(transferResult == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
        else{
    	    if(creep.carry.energy < creep.carryCapacity) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
            else{
                creep.memory.transferring = true;
            }
        }
	}
};

module.exports = roleUpgrader;