import { Fragment, useMemo, useState } from "react";
import "./App.css";
import WalletConnect from "./walletconnect/WalletConnect";


const generateRandomId = () => {
  return "id-" + Math.random().toString(36).substr(2, 9) + "-" + Date.now();
};

function App() {
  const [todos, setTodos] = useState([]);

  const [newTodo, setNewTodo] = useState("");

  const [todoEditId, setTodoEditId] = useState(null);

  const addNewTodo = (e) => {
    if (newTodo !== "") {
      if (todoEditId == null) {
        setTodos([
          ...todos,
          { todo: newTodo, isCompleted: false, id: generateRandomId() },
        ]);
      }else{
        const updatedTodos = todos.map((ele) => {
            if(ele.id == todoEditId){
                return {...ele, todo : newTodo};
            }else{
                return ele;
            }
        });
        setTodos(updatedTodos);
        setTodoEditId(null);
      }
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((ele) => ele.id !== id);
    setTodos(newTodos);
  };

  const editTodo = (id) => {
    setTodoEditId(id);
    const todo = todos.find((ele) => ele.id == id);
    setNewTodo(todo.todo);
  };

  return (
    <>
    <main>
      <WalletConnect />

    </main>

    {/* <main>
      <h1>Todos</h1>

      <div className="fl">
        <input
          type="text"
          name=""
          id=""
          onChange={(event) => {
            setNewTodo(event.target.value);
          }}
          value={newTodo}
        />
        <button type="submit" onClick={addNewTodo}>
          {todoEditId == null ? "Add Todo" : "Update todo"}
        </button>
      </div>

      <br />

      <ul>
        {todos.length == 0 ? (
          <h3>Empty Todo</h3>
        ) : (
          todos.map((ele, index) => (
            <li key={ele.id} className="todo">
              <p>{ele.todo}</p>
              <button type="button" onClick={() => editTodo(ele.id)}>
                edit
              </button>
              <button type="button" onClick={() => deleteTodo(ele.id)}>
                delete
              </button>
            </li>
          ))
        )}
      </ul>
    </main> */}
    </>
  );
}

// function App() {
//     const [todos, setTodos] = useState([]);
//     const [inputText, setInputText] = useState("");
//     const [editTodoId, setEditTodoId] = useState(null);

//     const isEditing = useMemo(() => !!editTodoId, [editTodoId]);

//     const handleAddItem = () => {
//         if (!inputText) {
//             alert("Enter an Item");
//             return;
//         }
//         setTodos((prevTodo) => [
//             ...prevTodo,
//             { id: Math.random().toString(), text: inputText, completed: false },
//         ]);
//         setInputText("");
//     };

//     const handleDeleteTodo = (id) => {
//         setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//     };

//     const handleMakeTodoCompleted = (id) => {
//         // const updatedTodos = []
//         // for(let i = 0; i<=todos.length; i++) {
//         //     if(todos[i].id === id) {
//         //         const updatedTodo = {...todos[i], completed: true}
//         //         updatedTodos.push(updatedTodo)
//         //     } else {
//         //         updatedTodos.push(todos[i])
//         //     }
//         // // }

//         // const updatedTodos = todos.map(todo => todo.id === id ? {...todo, completed: true} : todo)
//         // setTodos(updatedTodos)

//         setTodos((prevTodo) =>
//             prevTodo.map((todo) =>
//                 todo.id === id ? { ...todo, completed: true } : todo
//             )
//         );
//     };

//     const handleUpdate = () => {
//         setTodos((prevTodo) =>
//             prevTodo.map((todo) =>
//                 todo.id === editTodoId ? { ...todo, text: inputText } : todo
//             )
//         );
//         setInputText("");
//         setEditTodoId(null);
//     };

//     return (
//         <div className="container mx-auto p-8">
//             <h1 className="text-4xl border-b-4 border-black">Todo</h1>
//             <div className="w-full mt-4 flex gap-4 items-center">
//                 {isEditing ? (
//                     <div>
//                         <input
//                             type="text"
//                             className="border border-black py-1"
//                             value={inputText}
//                             onChange={(event) =>
//                                 setInputText(event.target.value)
//                             }
//                         />
//                         <button
//                             className="bg-black px-4 py-1 text-white"
//                             onClick={handleUpdate}
//                         >
//                             Update
//                         </button>
//                     </div>
//                 ) : (
//                     <Fragment>
//                         <input
//                             type="text"
//                             className="border border-black py-1"
//                             value={inputText}
//                             onChange={(event) =>
//                                 setInputText(event.target.value)
//                             }
//                         />
//                         <button
//                             className="bg-black px-4 py-1 text-white"
//                             onClick={handleAddItem}
//                         >
//                             Add
//                         </button>
//                     </Fragment>
//                 )}
//             </div>
//             <ul className="mt-4">
//                 {todos.length === 0 ? (
//                     <p>Empty Todos</p>
//                 ) : (
//                     <ul>
//                         {todos.map((todo, index) => (
//                             <li key={index} className="flex gap-4 mb-4">
//                                 <span
//                                     className={
//                                         todo.completed ? "line-through" : ""
//                                     }
//                                     onClick={() =>
//                                         handleMakeTodoCompleted(todo.id)
//                                     }
//                                 >
//                                     {todo.text}
//                                 </span>
//                                 <button
//                                     onClick={() => {
//                                         setEditTodoId(todo.id);
//                                         setInputText(todo.text);
//                                     }}
//                                     className="bg-blue-500 px-4 py-[2px] text-white"
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     onClick={() => handleDeleteTodo(todo.id)}
//                                     className="bg-red-500 px-4 py-[2px] text-white"
//                                 >
//                                     delete
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </ul>
//         </div>
//     );
// }

export default App;
