module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Session', {
    sid: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    userId: DataTypes.INTEGER,
    data: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    expires: DataTypes.DATE
  })
}