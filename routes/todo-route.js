const express = require('express')

const todoController = require('../controller/todo-controller')
const authenticateMiddleware = require('../middleware/authenticate')

const router = express.Router()

router.use(authenticateMiddleware)
router.post('/',todoController.createTodo)

module.exports = router