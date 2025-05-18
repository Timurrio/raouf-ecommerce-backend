const { Item } = require("../models/models")
const uuid = require("uuid")
const path = require("path")
const ApiError = require("../error/ApiError")

class ItemController {
    async create(req, res, next) {
        try{
            let {category,description,price,specs,texture,weight,size} = req.body
            const img = req.files.img
            const otherImgs = req.files["otherImgs[]"]


            let fileName = uuid.v4() + ".jpg";

            img.mv(path.resolve(__dirname, '..', 'static', fileName));


            let otherImgFileNames = [];

            if (otherImgs) {
                const otherImgsArray = Array.isArray(otherImgs) ? otherImgs : [otherImgs];
                otherImgsArray.forEach(image => {
                    let otherFileName = uuid.v4() + ".jpg";
                    image.mv(path.resolve(__dirname, '..', 'static', otherFileName));
                    otherImgFileNames.push(otherFileName);
                });

            }

            const item = await Item.create({
                category,
                description,
                price,
                specs,
                texture,
                weight,
                size, 
                img: fileName,
                otherImgs: JSON.stringify(otherImgFileNames)
            })
            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req,res) {
        let {category, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let items;

        if(category) {
            items = await Item.findAll({where: {category:category},limit,offset})
        } else {
            items = await Item.findAll({limit, offset})
        }

        return res.json(items)
    }

    async getOne(req, res) {
        const {id} = req.params
        const item = await Item.findOne(
            {
                where: {id},
            },
        )
        return res.json(item)
    }
}

module.exports = new ItemController()