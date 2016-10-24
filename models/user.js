/**
 * Created by alicanbalik on 10/24/16.
 */
var bcrypt = require('bcrypt');
var _ = require('underscore');

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
        salt: {
            type: dataTypes.STRING
        },
        password_hash: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 100]
            },
            set: function (value) {
                var salt = bcrypt.genSaltSync(10);
                var hashedPassword = bcrypt.hashSync(value, salt);

                this.setDataValue('password', value);
                this.setDataValue('salt', salt);
                this.setDataValue('password_hash', hashedPassword);
            }
        }
    }, { // Hooks are function that are called before and after (bulk-) creation/updating/deletion and validation.
        // http://docs.sequelizejs.com/en/v3/api/hooks/
        hooks: {
            beforeValidate: function (user, options) { //gets ran just before validation.
                // first check if user.email is a string, not numbers
                if (typeof user.email === 'string') {
                    user.email = user.email.toLowerCase();
                }
            }
        },
        instanceMethods: {
            toPublicJSON: function () {
                var json = this.toJSON();
                return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
            }
        }
    });
};