module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
      'Token',
      {
        tokenId: DataTypes.STRING,
        role: DataTypes.STRING
      }
  )

  Token.associate = models => {
    Token.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' })
  }

  return Token
}