import { Fragment } from "react";
import "./App.css";

//components
import InputTodo from "./components/InputToDo";
import ListToDos from "./components/ListTodos";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListToDos />
      </div>
    </Fragment>
  );
}

export default App;
