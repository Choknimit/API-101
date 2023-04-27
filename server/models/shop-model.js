const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const shopSchema = new Schema({
    name: { type: String, require: true, trim: true },
    photo: { type: String, default: 'nopic.png' },
    location: {
        lat: Number,
        lgn: Number,
    },
}, {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: 'shops'
})

// ? เป็นการทำ relationship หรือการ join ตารางกัน
shopSchema.virtual('menus', {
    ref: 'Menu', // ? ลิงค์ไปที่ model Menu
    localField: '_id', // ? _id ฟิลด์ของโมเดล Shop (ไฟล์นี้)
    foreignField: 'shop'  // ? shop ฟิลด์ของโมเดล menu (fk)
})



const shop = mongoose.model('Shop', shopSchema);

module.exports = shop;