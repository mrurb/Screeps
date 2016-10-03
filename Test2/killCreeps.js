module.exports = {
    killAllCreeps: function(){
         for(var name in Game.creeps){
            var creep = Game.creeps[name];
            creep.suicide;
        }
    }
};

/*
require('killCreeps').();
*/