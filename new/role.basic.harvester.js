module.exports = {

	/** @param {Creep} creep **/
	run: function(creep) {
		if(creep.memory.sourceId === undefined){
			creep.memory.sourceId = creep.pos.findClosestByPath(FIND_SOURCES).id;
		}


		if (creep.memory.mining){
			if(creep.carry.energy == creep.carry.energyCapacity){
				var tower = creep.room.find(FIND_MY_STRUCTURES, {
					filter: (s) => s.structureType == STRUCTURE_TOWER;
				})[0];
				var deposit = null;
				if(tower.energy < 600 ){
					deposit = tower;
				}
				else{
					deposit = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
						filter: (s) => (s.structureType == STRUCTURE_EXTENSION || s.structureType = STRUCTURE_SPAWN)
					});
				}
				creep.mining = false;
				creep.memory.path = creep.pos.findPathTo(deposit);
				creep.memory.moving = true;
				creep.memory.moveTarget = deposit.id;
			}
			else{
				creep.harvest(Game.getObjectById(creep.memory.sourceId));
			}
		}
		else if (creep.carry.energy == 0 && !creep.memory.moving){
			creep.memory.path = creep.pos.findPathTo(Game.getObjectById(creep.memory.sourceId));
			creep.memory.moving = true;
			creep.memory.moveTarget = creep.memory.sourceId;
		}
		

		if(creep.memory.moving){
			if(creep.pos.isNearTo(Game.getObjectById(creep.memory.moveTarget))){
				creep.memory.moving = false;
				if(creep.memory.moveTarget == creep.memory.sourceId){
					creep.memory.mining = true;
					creep.memory.moveTarget = undefined;
				}
				else{
					if(creep.transfer(creep.memory.moveTarget, RESOURCE_ENERGY) == OK){
						creep.memory.moveTarget = undefined;
					}
				}
			}
			else{
				var res = creep.moveByPath(creep.memory.path);
			}
		}
	}
}