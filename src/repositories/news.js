const { News: NewsModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')
const { makeNews } = require('../entity/news');

const News = createBasicMethods(NewsModel)

module.exports = {
    ...News,
    findById: async (id, { transaction = null, attributes = null, paranoid = true } = {}) => {
        const news = await News.findById(id, { transaction, attributes, paranoid })
        return makeNews(news)
    },
    one: async (where, { transaction = null, attributes = null, include = null, paranoid = true } = {}) => {
        const news = await News.one(where, { transaction, attributes, include, paranoid })
        return makeNews(news)
    },
    all: async (where,
                {
                    transaction,
                    attributes,
                    limit,
                    offset,
                    include,
                    group,
                    order,
                    paranoid
                } = {}) => {
        const news = await News.all(where,
          {
              transaction,
              attributes,
              limit,
              offset,
              include,
              group,
              order,
              paranoid
          })

        return news.map(newsItem => makeNews(newsItem));
    },
    create: async (values, transaction) => {
        const news = await News.create(values, transaction)
        return makeNews(news);
    }
}