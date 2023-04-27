const fs = require('fs')
const path = require('path')
const uuidv4 = require('uuid')
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)

const Shop = require('../models/shop-model')
const Menu = require('../models/menu-model')
const config = require('../config/index')

exports.shopAll = async (req, res) => {
    const shops = await Shop.find().select('name photo location').sort({ _id: -1 })
    const shopWithPhotoDomain = await shops.map( (shop, shopAll) => {
        return {
            id: shop._id,
            name: shop.name,
            photo: config.DOMAIN_PHOTO_LOCAL + '/images/store/' + shop.photo,
            location: shop.location
        }
    })

    res.status(200).json (shopWithPhotoDomain)
    console.log(shopWithPhotoDomain);
}


// ? get menu
exports.menu = async (req, res) => {

    const menus = await Menu.find().populate('shop').sort('-_id');


    // ? บวก ลบ ด้านหน้าคือการเลือกไม่เลือกโดย +คือการเลือกตัวนั้น -คือไม่เลือกตัวนั้น
    // const menus = await Menu.find().select('+name -price -shop')

    // ? .where({ price: {$gte: 100} }) คือการหาช่วงระหว่างเช่่น gte คือการหาราคามากกว่าหรือเท่ากับ 100, gt คือมากกว่าขึ้นไป
    // const menus = await Menu.find().select('name price shop').where({ price: {$gte: 100} })

    
    res.status(200).json(menus)
    console.log(menus);
}

// ? get shop by id with menu
exports.getShopWithMenu = async (req, res) => {
    const { id } = req.params;
    const shopWithMenu = await Shop.findById(id).populate('menus')

    res.status(200).json(shopWithMenu)
}


exports.insertShop = async (req, res) => {
    const { name, location, photo } = req.body;

    let shop = new Shop({
        name: name,
        location: location,
        photo: await saveImageToDisk(photo)
    });
    await shop.save();

    res.status(201).json({
        msg: 'เพิ่มข้อมูลร้านอาหารเรียบร้อย'
    })
} 



async function saveImageToDisk(baseImage) {
    // ? หา path จริงของโปรเจค
    const projectPath = path.resolve('./');
    // ? โฟลเดอร์และ path ของการอัปโหลด
    const uploadPath = `${projectPath}/public/images/store/`

    // ? หานามสกุลไฟล์
    const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));

    // ? สุ่มชื่อไฟล?ใหม่ พร้อมนามสกุล
    let filename = '';
    if (ext === 'svg+xml') {
        filename = `${uuidv4.v4()}.svg`;
    } else {
        filename = `${uuidv4.v4()}.${ext}`
    }

    // ? Extract base64 data ออกมา
    let image = decodeBase64Image(baseImage);

    // ? เขียนไฟล์ไว้ที่ path
    await writeFileAsync(uploadPath+filename, image.data, 'base64');
    // ? return ชื่อไฟล์ใหม่ออกไป
    return filename;
}

function decodeBase64Image(base64Str) {
    let matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let image = { };
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    image.type = matches[1];
    image.data = matches[2];

    return image;
}


// TODO: Save Photo to Google Cloud
async function saveImageToGoogle(baseImage) {
    // ? หา path จริงของโปรเจค
    const projectPath = path.resolve('./');

    // ? หานามสกุลไฟล์
    const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"))
    console.log(ext);
}