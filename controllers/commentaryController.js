const {Commentary, User} = require("../models/models")
const ApiError = require("../error/ApiError")

class CommentaryController {
    async create(req,res, next){
        try{
            const {userId, itemId, text, verdict} = req.body
            console.log('Hello from controller!')

            const commentary = await Commentary.create({
                userId,
                itemId,
                text,
                verdict
        })
            console.log("Commentary created")
            return res.json(commentary)
        } catch(e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req,res){
        try{
        const {id} = req.params
        const commentaries = await Commentary.findAll({
            where: {itemId:id},
            include: [
                {
                    model: User,
                    attributes: ["name"]
                }
            ]
        })

        return res.json(commentaries)
        } catch(e) {
            console.log(e)
        }
    }

    async update(req,res){
        try {
            const { userId, itemId, text, verdict } = req.body;
    
            const commentary = await Commentary.findOne({ where: { userId, itemId } });
    
            if (!commentary) {
                return next(ApiError.badRequest("Comment not found"));
            }
    
            commentary.text = text;
            commentary.verdict = verdict;
            await commentary.save();

            return res.json(commentary);

        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const commentary = await Commentary.findByPk(id);
    
            if (!commentary) {
                return next(ApiError.badRequest("Comment not found"));
            }
    
            await commentary.destroy();
            return res.json(commentary);
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new CommentaryController()