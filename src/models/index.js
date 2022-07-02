const Project = require("./Project");
const User = require("./User");

Project.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

User.hasMany(Project, {
  foreignKey: "userId",
});

module.exports = { User, Project };
