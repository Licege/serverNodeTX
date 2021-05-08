const { prepareImageUrl } = require('../utils');

module.exports.makeNews = (newsData) => {
  if (!newsData) return null

  const { imageSrc, ...restNewsData } = newsData

  const preparedImageSrc = prepareImageUrl(imageSrc)

  return { ...restNewsData, imageSrc: preparedImageSrc }
}