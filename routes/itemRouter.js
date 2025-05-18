const Router = require("express")
const ItemController = require("../controllers/itemController")
const router = new Router()
const checkRole = require("../middleware/CheckRoleMiddleware")

// router.post( '/', checkRole("ADMIN"), ItemController.create)
router.post( '/', ItemController.create)
router.get('/', ItemController.getAll)
router.get('/:id', ItemController.getOne)

module.exports = router