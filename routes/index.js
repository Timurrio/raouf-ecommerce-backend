const Router = require("express")
const router = new Router()
const itemRouter = require("./itemRouter")
const userRouter = require("./userRouter")
const orderRouter = require("./orderRouter")
const commentaryRouter = require("./commentaryRouter")

router.use("/user", userRouter)
router.use("/item", itemRouter)
router.use("/order", orderRouter)
router.use("/comment", commentaryRouter)

module.exports = router