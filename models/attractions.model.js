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
    },
    {
        timestamps: false
    })
    return Attraction;
};