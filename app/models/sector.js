module.exports = (sequelize, DataTypes) => {
    const sector = sequelize.define("sector", {
        name: {
            type: DataTypes.STRING,
            notEmpty: true,
        },
        parentid: {
            type: DataTypes.INTEGER(150),
            notEmpty: true,
            defaultValue: 0,
        },
        status: {
            type: DataTypes.INTEGER(2),
            notEmpty: true,
            defaultValue: 1,
        },
    });
    return sector;
};
