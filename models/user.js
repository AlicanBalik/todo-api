/**
 * Created by alicanbalik on 10/24/16.
 */
var bcrypt = require('bcrypt');
var _ = require('underscore');

module.exports = function (sequelize, dataTypes) {
    //instead of return, define a variable named user so we can use it in classMethods.
    var user = sequelize.define('user', { // 1) table name, 2)attributes
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
        classMethods: {
            authenticate: function (body) {
                return new Promise(function (resolve, reject) {
                    if (typeof body.email !== 'string' || typeof body.password !== 'string') {
                        return reject();
                    }
                    user.findOne({
                        where: {
                            email: body.email
                        }
                    }).then(function (user) {
                        if (!user) {
                            // return res.status(401).send(); //401 = auth is possible, but failed.
                            return reject();
                        }

                        if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
                            // return res.status(401).send(); //401 = auth is possible, but failed.
                           return reject();
                        }
                        resolve(user);
                        // ^ resolve.json(user.toPublicJSON());
                    }, function (err) {
                        // resolve.status(500).send();
                        reject();
                    });
                });
            }
        },
        instanceMethods: {
            toPublicJSON: function () {
                var json = this.toJSON();
                return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
            }
        }
    });

    return user; //we did return it here instead of very top.
};