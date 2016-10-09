/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('util');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    ChangeRole: function(startRole, endRole, count){
        var c = 0;
        for(var name in Game.creeps) {
            if(c == count){
                break;
            }  
            var creep = Game.creeps[name];
            if(creep.memory.role == startRole){
                creep.memory.role = endRole;
                c++;  
            }
        }
    },
    
    
    DumpRolesTable: function(){
        var roles = {}
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(roles[creep.memory.role] == undefined){
                roles[creep.memory.role] = 1
            }
            else
            {
                roles[creep.memory.role] += 1; 
            }
        }
        for (var role in roles){
            console.log(role, roles[role]);
        }
    }
}