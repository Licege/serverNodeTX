const { sequelize } = require('./src/models').init();

afterAll(() => sequelize.close());
