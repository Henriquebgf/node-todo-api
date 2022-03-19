import { Response, Request } from "express";
import { Todo } from "../models/Todo";

export const all = async (req:Request, res:Response ) => {
    let list = await Todo.findAll();
    res.json({list});
}

export const add = async (req:Request, res:Response ) => {
    let { title, done} = req.body;

    let newTodo = await Todo.create({title,done});

    res.status(201);
    res.json({ id: newTodo.id, title, done});

}

export const update = async (req:Request, res:Response ) => {
    let {id} = req.params;
    let {title, done} = req.body;

    let todo = await Todo.findByPk(id);

    if(todo) {
        todo.title = title;
        todo.done = done;
        await todo.save();

        res.json({todo});
    } else {
        res.json({ error: " Tarefa não encontrada"});
    }

}

export const remove = async (req:Request, res:Response ) => {
    let {id} = req.params;

    await Todo.destroy({ where: {id}});
    res.json({});

}



