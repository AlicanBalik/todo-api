/**
 * Created by alicanbalik on 10/17/16.
 */

//this function special function that gets passed 2 arguements by sequelize //first sequelize instance, second datatype for defining models.
module.exports = function (sequelize, dataTypes) {
    return sequelize.define('todo', {
        description: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                //notEmpty: true //means description cannot be an empty string.
                len: [1, 250] //check the input if length is 1 or greater and 250 and less.
            }
        },
        completed: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            //http://docs.sequelizejs.com/en/v3/docs/models-definition/
            defaultValue: false //if user doesn't enter completed variable, program makes it false(0) by default.
        }
    });

};