import { useState, useEffect } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { BsCheckLg } from 'react-icons/bs';
import { AiOutlineStar } from 'react-icons/ai';
import { useAuth } from './Auth';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const API_URL = "http://localhost:3001";

function List() {
  const { user, setUser } = useAuth();
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [editActive, setEditActive] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [ name, setName] = useState("User");
  const navigate = useNavigate();

  console.log(editActive);

  useEffect(() => {
    GetTodos();
  }, [])

  const logout = () => {
    setUser(null);
    navigate("/login")
    };

  const GetTodos = () => {
    fetch(API_URL + "/get-todos" , {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"user": user})
    })
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.error("Error: " + err));

    fetch(API_URL + "/get-name" , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"user": user})
        })
        .then(res => res.json())
        .then(data => setName(data.username))
        .catch(err => console.error("Error: " + err));
  }

  const editTodoDesc = async () => {
    const data = await fetch(API_URL + "/edit-todo" , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"id": editActive, "text": editTodo})
    }).then(res => res.json());

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id){
        todo.text = data.text;
      }

      return todo;
    }));
    setEditActive(null);
    setEditTodo("");
  }

  const deleteTodo = async id => {
    const data = await fetch(API_URL + "/delete-todo" , {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"id": id})
    }).then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }

  const addTodo = async () => {
    const data = await fetch(API_URL + "/new-todo", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"text": newTodo, "user": user})
    }).then(res => res.json())

    setTodos([...todos, data]);
    setPopupActive(false);
    setNewTodo("");
  }
  const completeTodo = async id => {
    const data = await fetch(API_URL + "/complete-todo", 
    {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"id": id})
    }
    )
    .then(res => res.json());
    
    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id){
        todo.complete = data.complete;
      }

      return todo;
    }));
  }  

  const favTodo = async id => {
    const data = await fetch(API_URL + "/fav-todo", 
    {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"id": id})
    }
    )
    .then(res => res.json());
    
    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id){
        todo.favorite = data.favorite;
      }

      return todo;
    }));
  }  


  return (
    <div className="App">
      <h1>Welcome, {name}</h1>
      <h4>Your Tasks</h4>
      <div className="todos">
          {todos.map(todo => (
            <div className={"todo" + (todo.complete ? " is-complete" : "") + (todo.favorite ? " is-fav" : "")} 
                key={todo._id}>
                <div className="checkbox"></div>
                <div className="text">{todo.text}</div>
                <AiOutlineStar className="fav-todo" onClick={() => favTodo(todo._id)} />
                <BsCheckLg className="complete-todo" onClick={() => completeTodo(todo._id)}/>
                <HiPencilAlt className="edit-todo" onClick={() => setEditActive(todo._id)}/>
                <div className="delete-todo" onClick={(e) => {
                  e.stopPropagation();
                  deleteTodo(todo._id);
                  }}>x</div>
            </div>
          ))}
      </div>
      <Button component={Link} to="/login" onClick={logout}>Log Out</Button>
      <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

      {editActive ? 
      <div className="popup">
        <div className="closePopup" onClick={() => setEditActive(null)}>x</div>
        <div className="content">
          <h3>Edit Task</h3>
          <input type="text" className="add todo-input" onChange={e => {setEditTodo(e.target.value)}} value={editTodo}/>
          <br/>
          <div className="button" onClick={editTodoDesc}>Edit Task</div>
        </div>
      </div> 
      : ""}

      {popupActive ? 
      <div className="popup">
        <div className="closePopup" onClick={() => setPopupActive(false)}>x</div>
        <div className="content">
          <h3>Add Task</h3>
          <input type="text" className="add todo-input" onChange={e => {setNewTodo(e.target.value)}} value={newTodo}/>
          <div className="button" onClick={addTodo}>Create Task</div>
        </div>
      </div> 
      : ""}
    </div>
  );
}

export default List;
