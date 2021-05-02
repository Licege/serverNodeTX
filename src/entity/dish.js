const { STORAGE_SRC } = process.env

const prepareImageUrl = url => {
  if (!url) return ''

  return `${STORAGE_SRC}/${url.replace('\\', '/')}`
}

module.exports.makeDish = (dishData) => {
  if (!dishData) return null

  const { imageSrc, ...restDishData } = dishData

  const preparedImageSrc = prepareImageUrl(imageSrc)

  return { ...restDishData, imageSrc: preparedImageSrc }
}