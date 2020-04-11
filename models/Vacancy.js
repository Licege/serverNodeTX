const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vacancySchema = new Schema({
    title: {type: String, required: true},
    requirements: {type: String, required: true},
    description: {type: String},
    salary_from: {type: Number},
    salary_to: {type: Number},
    imageSrc: {type: String, default: ''}
})

module.exports = mongoose.model('vacancies', vacancySchema)