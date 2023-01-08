module.exports = (sequelize, DataTypes) => {
    const Badge = sequelize.define('badge', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: 'NAME!' } }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: {msg: 'IMAGE!'}}
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { message: 'TEXT!' } 
            }
        }
    },
    {
        timestamps: false
    })
    return Badge;
};