module.exports = (sequelize, { ARRAY, STRING }) => {
    const Contacts = sequelize.define(
        'Contacts',
        {
            vk: STRING,
            fb: STRING,
            tg: STRING,
            inst: STRING,
            google: STRING,
            tw: STRING,
            phone: STRING,
            address: STRING,
            openHours: ARRAY(STRING)
        }
    )

    return Contacts
}