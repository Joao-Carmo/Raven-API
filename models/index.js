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
db.preferences = require('./preferences.model.js')(sequelize,DataTypes);
db.user_badges = require('./user_badges.model.js')(sequelize,DataTypes);
db.saved_attractions = require('./saved_attractions.model.js')(sequelize,DataTypes);
db.attraction_categories = require('./attraction_categories.model.js')(sequelize,DataTypes);


db.user.belongsToMany(db.badge, { through: db.user_badges });
db.badge.belongsToMany(db.user, { through: db.user_badges });

db.attraction.belongsToMany(db.category, {through: db.attraction_categories})
db.category.belongsToMany(db.attraction, {through: db.attraction_categories})

db.user.belongsToMany(db.attraction, {through: db.saved_attractions})
db.attraction.belongsToMany(db.user, {through: db.saved_attractions})

db.user.belongsToMany(db.category, {through: db.preferences})
db.category.belongsToMany(db.user, {through: db.preferences})

module.exports = db;
db.sequelize.sync()
    .then(() => {
        console.log("DB is successfully synchronized");
    })
    .catch(e => {
        console.log(e);
    });

module.exports = db;