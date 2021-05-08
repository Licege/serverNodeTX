const { prepareImageUrl } = require('../utils');

module.exports.makeDish = (dishData) => {
  if (!dishData) return null

  const { imageSrc, ...restDishData } = dishData

  const preparedImageSrc = prepareImageUrl(imageSrc)

  return { ...restDishData, imageSrc: preparedImageSrc }
}