const EXPRESS =require('express')
const router = EXPRESS.Router();
const taskControllers = require('../controllers/taskController')



router.route('/')
.get(taskControllers.getAllTasks)
.post(taskControllers.createTask)

router.route('/:id')
.get(taskControllers.getTask)
.patch(taskControllers.updateTask)
.delete(taskControllers.deleteTask)


module.exports=router