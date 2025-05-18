const Router = require("express")
const OrderController = require("../controllers/orderController")
const router = new Router()

router.post( '/', OrderController.create) 
router.get('/', OrderController.getAll)
router.get('/:id', OrderController.getOne)

module.exports = router