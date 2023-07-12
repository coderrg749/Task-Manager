const Task = require("../models/task");
const mongoose = require('mongoose')
const{taskValidation,taskUpdationValidation} = require("../views/taskSchema");


/**************************************************
 ***************** TASK CONTROLLER ***************
 **************************************************/
const taskControllers = {};


/**
 * function to get all tasks 
 */

taskControllers.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks) {
      res.status(404).send("TaskList can't be found");
    }
    res.status(200).json({tasks});
  } catch (err) {
    res.status(500).send({ msg: err });
  }
};


/**
 * function to get particular tasks 
 */
taskControllers.getTask = async (req, res) => {
  let id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  if(id){
    try {
      const task = await Task.findById(id);
      if (!task) {
       return res.status(404).send("No task exists with given Id");
      }
      res.status(200).json({task});
    } catch (err) {
      res.status(500).send({ msg: err });
    }
  }else{
   return res.status(400).send("Provide an id")
  }

};

/**
 * function to create the tasks 
 */
taskControllers.createTask = async (req, res) => {
  const { error, value } = taskValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const task = await Task.create(value);
    if (!task) {
      res.status(400).send("Task can't be created");
    }
    res.status(200).json({task});
  } catch (err) {
    res.status(500).send({ msg: err });
  }
};


/**
 * function to update the  task 
 */
taskControllers.updateTask = async (req, res) => { 
  let id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  const { error, value } = taskUpdationValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }   
  if(id){
    try {
      const task = await Task.findByIdAndUpdate(id,value,{new:true});
      if (!task) {
        res.status(404).send("Provide a valid ID");
      }
      res.status(200).json({task});
    } catch (err) {
      res.status(500).send({ msg: err });
    }
  }else{
    res.status(400).send("Provide an id")
  }
};


/**
 * function to delete the task
 */
taskControllers.deleteTask = async (req, res) => {
  let id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  if(id){
    try {
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
       return res.status(404).send("No task exists with given Id");
      }
      res.status(200).json({task});
    } catch (err) {
      res.status(500).send({ msg: err });
    }
  }else{
   return res.status(400).send("Provide an id")
  }
};

module.exports = taskControllers;
