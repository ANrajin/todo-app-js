import express from "express";
import mongoose from "mongoose";
import todoSchema from "../schemas/todoSchema.js";

const router = express.Router();
const Todo = new mongoose.model("TodoList", todoSchema);

router.get('/', async (req, res) => {
    await Todo.find().select({__v: 0}).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.error(err);
        
        res.status(500).json({
            "message": "Something went wrong while fetching todo lists!"
        });
    })
});

router.post("/", async (req, res) => {
    const newTodo = new Todo(req.body);
    
    await newTodo.save().then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        console.error(err);
        res.status(500).json({
          message: "Something went wrong while saving new todo!"
        });
    })
});

router.get("/:id", async (req, res) => {
  await Todo.findById({ _id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    }).catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Something went wrong while fetching todo!"
      });
    });
});

router.put("/:id", async (req, res) => {
    await Todo.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((data) => {
        res.status(200).json(data);
      })
        .catch((err) => {
        console.error(err);
        res.status(500).json({
          message: "Something went wrong while updating todo!",
        });
      });
});

router.delete("/:id", async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id })
      .then((data) => {
        res.status(200).json();
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          message: "Something went wrong while removing todo!",
        });
      });
});

export default router;
