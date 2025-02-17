import React, { Fragment, useEffect, useState } from 'react';

import EditTodo from "./EditTodo";

const ListToDos = () => {

    const [todos, setTodos] = useState([])

    const deleteTodo = async (id) => {
        try {
            await fetch(`https://to-do-backend-xla2.onrender.com/todos/${id}`, {
                method: "DELETE"
            });

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };
    
    const getTodos = async () => {
        try {
            const response = await fetch("https://to-do-backend-xla2.onrender.com/todos")
            const jsonData = await response.json()

            setTodos(jsonData)
        }   catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    console.log(todos);

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo = {todo}/></td>
                            <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListToDos;
