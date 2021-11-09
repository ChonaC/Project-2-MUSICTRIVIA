const User = require("./User");
const Song = require("./Song");

User.hasMany(Song, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Song.belongsTo(User, {
    foreignKey: "user_id",
});

module.exports = {
    Song,
    User,
};
