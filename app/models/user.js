module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            notEmpty: true,
        },
        email: {
            type: DataTypes.STRING,
            isEmail: true,
            notEmpty: true,
        },
        password: {
            type: DataTypes.STRING,
            notEmpty: true,
        },
        role: {
            type: DataTypes.INTEGER(2),
            notEmpty: true,
            defaultValue: 1,
        },
        status: {
            type: DataTypes.INTEGER(2),
            notEmpty: true,
            defaultValue: 1,
        },
    });
    return user;
};
