module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: { notNull: { msg: 'USERNAME!' } }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: 'NAME!' } }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { message: 'EMAIL!' } 
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { message: 'PASSWORD!' } 
            }
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other'),
            allowNull: false,
            validate: {
                notNull: { message: 'GENDER!' } 
            }
        },
        image: {
            type: DataTypes.STRING
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: { message: 'DOB!' } 
            }
        },
        
    },
    {
        timestamps: false
    })
    return User;
};