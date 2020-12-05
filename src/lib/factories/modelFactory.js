module.exports = Model => ({
    bulkCreate: async (values, transaction) => {
        const collections = await Model.bulkCreate(values, { transaction, returning: true })
        return collections.map(collection => collection.get({ plain: true }))
    },

    create: async (values, transaction) => {
        const newObj = await Model.create(values, { transaction, returning: true })
        return newObj.get({ plain: true })
    },

    update: async (where, values, transaction) => {
        await Model.update(values, { where, transaction, limit: 1 })
        return undefined
    },

    updateAll: async (where, values, transaction) => {
        await Model.update(values, { where, transaction })
        return undefined
    },

    findById: async (id, { transaction = null, attributes = null, paranoid = true } = {}) =>
        await Model.findOne({
            where: { id },
            transaction,
            attributes,
            paranoid,
            raw: true
        }),

    one: async (where, { transaction = null, attributes = null, include = null, paranoid = true } = {}) =>
        await Model.findOne({
            where,
            transaction,
            attributes,
            include,
            paranoid,
            raw: true
        }),

    all: async (
        where,
        {
            transaction = null,
            attributes = null,
            limit = null,
            offset = null,
            include = null,
            group = null,
            order = null,
            paranoid = true
        } = {}
    ) => await Model.findAll({
                where,
                transaction,
                attributes,
                limit,
                offset,
                include,
                group,
                order,
                paranoid,
                raw: true
            }),

    oneAttrId: async (where, transaction) => {
        const data = await Model.findOne({ where, attributes: ['id'], transaction })

        if (!data) return null
        return data.id
    },

    allAttrId: async (where, transaction) => {
        const colections = await Model.findAll({
            where,
            transaction,
            attributes: ['id'],
            raw: true
        });

        return colections.map(data => data.id)
    },

    oneAttr: async (attr, where, transaction) => {
        const data = await Model.findOne({ where, attributes: [attr], transaction })

        if (!data) return null
        return data[attr]
    },

    allAttr: async (attr, where, transaction) => {
        const colections = await Model.findAll({ where, attributes: [attr], transaction })

        return colections.map(data => data[attr])
    },

    allAttrUnique: async (attr, where, transaction) => {
        const groupedValues = await Model.findAll({
            where,
            group: [attr],
            attributes: [attr],
            transaction,
            raw: true
        })
        return groupedValues.map(value => value[attr])
    },

    totalUniqueAttr: async (attr, where, transaction) => {
        const groupedValues = await Model.findAll({
            where,
            group: [attr],
            attributes: [attr],
            transaction,
            raw: true
        })
        return groupedValues.length
    },

    destroy: async (where, transaction, force = false) => await Model.destroy({ where, transaction, force }),

    destroyById: async (id, transaction) => await Model.destroy({ where: { id }, transaction }),

    isExist: async (where, transaction) => !!(await Model.findOne({ where, transaction, attributes: ['id'] })),

    total: async (where, transaction) => await Model.count({ where, transaction }),

    totalOptions: async (where, { transaction = null, include = null } = {}) =>
        await Model.count({ where, transaction, include }),

    toggleAttr: async (attr, where, transaction) => {
        const data = await Model.findOne({ where, attributes: [attr], transaction })

        if (!data) return null
        const value = data[attr]

        await Model.update({ [attr]: !value }, { where, transaction })
        return !value
    }
});
