import React, { Fragment, useState } from "react";
import PropTypes from 'prop-types';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);
    console.log(todo);

    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    const updateDescription = async() => {
        try {
            const body = { description };
            const response = await fetch(`http://localhost:3000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            console.log(response);
            // Close the modal after successful update
            const modalElement = document.getElementById(`id${todo.todo_id}`);
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();

        window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>
                Edit
            </button>

            <div className="modal fade" id={`id${todo.todo_id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Todo</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)} aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <input type="text" className="form-control" value={description} onChange={handleChange} />
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={updateDescription}>Edit</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

EditTodo.propTypes = {
    todo: PropTypes.shape({
        todo_id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export default EditTodo;