const Todo = require("../models/Todo");
const TodoModel = require("../models/Todo");

//Function to get all rides in database (through Mongoose API)
module.exports.getAllTodos = async (req, res) => {
    const Todos = await TodoModel.find();
    res.json(Todos);
}

module.exports.createNewTodo = (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
}

module.exports.deleteTodo = async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.body.id);

    res.json(result);
}

module.exports.editTodo = async (req, res) => {
    const result = await Todo.findByIdAndUpdate(req.body.id, {text: req.body.text});

    result.text = req.body.text;
    res.json(result);
}


module.exports.completeTodo = async (req, res) => {
    const todo = await Todo.findById(req.body.id);

    todo.complete = !(todo.complete)
    todo.save();
    res.json(todo);
}

module.exports.favTodo = async (req, res) => {
    const todo = await Todo.findById(req.body.id);

    todo.favorite = !(todo.favorite)
    todo.save();
    res.json(todo);
}
