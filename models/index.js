const dbConfig = require('../config/db.config.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
    ,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

(async () => {
    try {
        await sequelize.authenticate;
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
})();

const db = {};
db.sequelize = sequelize;

db.user = require('./users.model.js')(sequelize, DataTypes);
db.badge = require('./badges.model.js')(sequelize, DataTypes);

db.user.belongsToMany(db.badge, { through: db.userBadges})
db.badge.belongsToMany(db.user, { through: db.userBadges})

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('DB is successfully synchronized')
    } catch (error) {
        console.log(error)
    }
})();

module.exports = db;