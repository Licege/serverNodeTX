module.exports = (sequelize, DataTypes) => {
  const Vacancy = sequelize.define(
      'Vacancy',
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        requirements: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        description: DataTypes.TEXT,
        salaryFrom: DataTypes.INTEGER,
        salaryTo: DataTypes.INTEGER,
        imageSrc: DataTypes.STRING
      }
  )

  return Vacancy
}