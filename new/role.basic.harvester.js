function getDeposit(creep){
	var tower = creep.room.find(FIND_MY_STRUCTURES, {
		filter: (s) => (s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity)
	})[0];
	var deposit = null;
	if(tower != undefined && tower.energy < 600 ){
		deposit = tower;
	}
	else{
		deposit = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
			filter: (s) => ((s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) && s.energy < s.energyCapacity && s.room == creep.room)
		});
	}
	if(deposit == undefined){
		deposit = creep.room.find(FIND_MY_STRUCTURES, {
			filter: (s) => (s.structureType == STRUCTURE_SPAWN)
		})[0];
	}
	return deposit;
}


module.exports = {

	/** @param {Creep} creep **/
	run: function(creep) {
		if(creep.memory.sourceId === undefined){
			creep.memory.sourceId = creep.pos.findClosestByPath(FIND_SOURCES).id;
		}


		if (creep.memory.mining){
			if(creep.carry.energy == creep.carryCapacity){
				var deposit = getDeposit(creep);
				creep.memory.mining = false;
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
		else if (!creep.memory.moving){
			var deposit = getDeposit(creep);
			if (!creep.pos.isNearTo(deposit)){
				creep.memory.path = creep.pos.findPathTo(deposit);
				creep.memory.moving = true;
				creep.memory.moveTarget = deposit.id;
			}
			else{
				creep.transfer(deposit, RESOURCE_ENERGY);
			}
		}
		

		if(creep.memory.moving){
			if(creep.pos.isNearTo(Game.getObjectById(creep.memory.moveTarget))){
				if(creep.memory.moveTarget == creep.memory.sourceId){
					creep.memory.moving = false;
					creep.memory.mining = true;
					creep.memory.moveTarget = undefined;
				}
				else{
					creep.transfer(Game.getObjectById(creep.memory.moveTarget), RESOURCE_ENERGY)
					creep.memory.moving = false;
					creep.memory.moveTarget = undefined;
				}
			}
			else{
				var res = creep.moveByPath(creep.memory.path);
			}
		}
	}
}