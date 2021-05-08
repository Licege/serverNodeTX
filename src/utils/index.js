const parseLink = (data, fieldsWithLink = ['imageSrc']) => {
    if (!data || typeof data === 'number' || typeof data === 'boolean') return null

    if (data instanceof Array) {
        return data.map(item => {
           return Object.keys(item).forEach(key => fieldsWithLink.includes(key)
                ? item[key] = process.env.STORAGE_SRC + item[key]
                : item
           )
        })
    }

    if (typeof data === 'string') {
        return process.env.STORAGE_SRC + data
    }

    return Object.keys(data).reduce((newObj, key) => {
        return fieldsWithLink.includes(key)
            ? { ...newObj, [key]: process.env.STORAGE_SRC + data[key] }
            : newObj
    }, {})
}

const { STORAGE_SRC } = process.env

const prepareImageUrl = url => {
    if (!url) return ''

    return `${STORAGE_SRC}/${url.replace('\\', '/')}`
}

module.exports = { parseLink, prepareImageUrl }