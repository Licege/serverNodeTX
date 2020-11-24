const { sequelize } = require('./models').init();

afterAll(() => sequelize.close());
