const express = require("express");
const Task = require("../models/taskModel");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body)
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET /tasks?completed=false
// GET /tasks?limit=10(number of request per page )&skip=20(number of items skiped to jump on next page) 
// GET /tasks?sortBy=createdAt:asc/desc
router.get("/tasks", auth, async (req, res) => {
  const taskStatus = {};
  const sort = {}

  if (req.query.completed) {
    taskStatus.completed = req.query.completed === "true";
  }

  if(req.query.sortBy){
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    const tasks = await Task.find({
      ...taskStatus,
      owner: req.user._id,
    })
      .limit(req.query.limit)
      .skip(req.query.skip)
      .sort(sort);

    // if (req.query.limit) {
    //   res.status(200).send(tasks.slice(0, parseInt(req.query.limit)));
    // } else {
    //   res.status(200).send(tasks);
    // }
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    // const task = await  Task.findById({_id})
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      res.status(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    // const task = await Task.findByIdAndUpdate({_id},req.body, { new: true, runValidators:true})
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send({ task, msg: "Task succesfully deleted" });
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
