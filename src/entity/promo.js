const { prepareImageUrl } = require('../utils');

module.exports.makePromo = (promoData) => {
  if (!promoData) return null

  const { imageSrc, ...restPromoData } = promoData

  const preparedImageSrc = prepareImageUrl(imageSrc)

  return { ...restPromoData, imageSrc: preparedImageSrc }
}