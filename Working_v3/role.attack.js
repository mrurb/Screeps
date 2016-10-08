module.exports = {
    run: function(creep){
        if (creep.memory.working) {
            var target2 = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, { filter: (s) => s.structureType != STRUCTURE_CONTROLLER && s.structureType == STRUCTURE_TOWER});
            var target3 = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, { filter: (s) => s.structureType != STRUCTURE_CONTROLLER});
            var target = creep.pos.findClosestByPath (FIND_HOSTILE_CREEPS);
            if (target != undefined) {
                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    creep.say("♫DUN DUN♫", true);
                }
            }
            else if (target2 != undefined) {
                if (creep.attack(target2) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target2);
                    creep.say("♫DUN DUN♫", true);
                }
            }else if (target3 != undefined) {
                if (creep.attack(target3) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target3);
                    creep.say("♫DUN DUN♫", true);
                }
            }
            else {
                creep.moveTo(Game.flags.AttackF);
                var flag = creep.moveTo(Game.flags.AttackF);
                creep.moveTo(flag);
            }
        }
    }
};