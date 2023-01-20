const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
});

sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });

const db = {};
db.sequelize = sequelize; //export the Sequelize instance (actual connection pool)

db.user = require('./users.model.js')(sequelize, DataTypes);
db.badge = require('./badges.model.js')(sequelize, DataTypes);
db.category = require('./categories.model.js')(sequelize, DataTypes);
db.attraction = require('./attractions.model.js')(sequelize, DataTypes);

db.user.belongsToMany(db.badge, { through: 'UserBadges' });
db.badge.belongsToMany(db.user, { through: 'UserBadges' });

db.attraction.belongsToMany(db.category, {through: 'AttractionCategories'})
db.category.belongsToMany(db.attraction, {through: 'AttractionCategories'})

module.exports = db;
db.sequelize.sync()
    .then(() => {
        console.log("DB is successfully synchronized");
    })
    .catch(e => {
        console.log(e);
    });

module.exports = db;