/**
 * Created by alicanbalik on 10/24/16.
 */

module.exports = function (sequelize, dataTypes) {
    return sequelize.define('user', { // 1) table name, 2)attributes
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 100]
            }
        }
    }, { //Hooks are function that are called before and after (bulk-) creation/updating/deletion and validation.
        hooks: {
            beforeValidate: function (user, options) { //gets ran just before validation.
                // first check if user.email is a string, not numbers
                if (typeof user.email === 'string') {
                    user.email = user.email.toLowerCase();
                }
            }
        }
    });
};