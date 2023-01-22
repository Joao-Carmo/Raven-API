module.exports = (sequelize, DataTypes) => {
    const Attraction = sequelize.define('Attraction', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: 'NAME!' } }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: 'ADDRESS!' } }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: 'DESCRIPTION!' } }
        },
        image: {
            type: DataTypes.BLOB("long"),
            allowNull: false
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: { notNull: { msg: 'LONGITUDE!' }}
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: { notNull: { msg: 'LATITUDE!' }}
        },
    },
    {
        timestamps: false
    })
    return Attraction;
};