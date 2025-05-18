const Router = require("express")
const CommentaryController = require("../controllers/commentaryController")
const router = new Router()



router.post( '/', CommentaryController.create)
router.get('/:id', CommentaryController.getAll)
router.patch('/:id', CommentaryController.update)
router.delete('/:id', CommentaryController.delete)

module.exports = router