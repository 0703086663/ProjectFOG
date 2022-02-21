const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const User = new Schema({
    name: {type: String, maxLength: 255},
    username: {type: String, maxLength: 255},
    email: {type: String, require: true},
    password: {type: String, minLength: 1, maxLength: 32},
    avatar: {type: String},    
    worktime: {type: String, maxLength: 255},
    workplace: {type: String, maxLength: 255},
    roles: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Role"}],
    address: {type: String, maxLength: 255},
    birth: {type: String, maxLength: 255},
    gender: {type: String, maxLength: 255},
    slug: {type : String, slug : 'email', unique: true},
    deletedAt: {},
    // createdAt: {type: Date, default : Date.Now},
    // updateAt: {type: Date, default : Date.Now}
}, {
    timestamps : true,
});

//Add plugin
User.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
});
mongoose.plugin(slug);

module.exports = mongoose.model('User', User);