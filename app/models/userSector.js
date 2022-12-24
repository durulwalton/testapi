module.exports = (sequelize, DataTypes) => {
    const userSector = sequelize.define("userSector", {
        name: {
            type: DataTypes.STRING,
            notEmpty: true,
        },
        sectorid: {
            type: DataTypes.INTEGER(150),
            defaultValue: false,
        },
        isaggreterms: {
            type: DataTypes.BOOLEAN,
            notEmpty: true,
        },
        userid: {
            type: DataTypes.INTEGER(150),
            notEmpty: true,
        },
        status: {
            type: DataTypes.INTEGER(2),
            notEmpty: true,
            defaultValue: 1,
        },
    });
    // userSector.associate = function (models) {
    //     userSector.belongsTo(models.user);
    //     userSector.hasMany(models.sector);
    // };
    return userSector;
};
