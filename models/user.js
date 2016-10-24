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
    });
};