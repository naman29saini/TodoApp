import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const[todo, setTodo]=useState("")
  const[todos, setTodos]=useState([])
  const[showFinished, setShowFinished]=useState(true)

  useEffect(()=>{
    let todosString=localStorage.getItem("todo")
    if(todosString)
    {
      let todos=JSON.parse(localStorage.getItem("todo"))
      setTodos(todos)
    }
  },[])

  const saveToLS=()=>{
    localStorage.setItem("todo",JSON.stringify(todos));
  }

  const toggleFinished=()=>{
    setShowFinished(!showFinished)
  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }
  
  const handleAdd=()=>{
    setTodos([...todos, {id:uuidv4(),todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }

  const handleCheckBox=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex((item)=>{
      return item.id===id
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  const handleEdit=(e,id)=>{
    let t=todos.filter((item)=>{
      return item.id===id
    })
    setTodo(t[0].todo)
    let newtodos=todos.filter((item)=>{
      return item.id!=id
    })
    setTodos(newtodos)
    saveToLS()
  }

  const handleDelete=(e, id)=>{
    let newTodos=todos.filter((item)=>{
      return item.id!=id;
    })
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container  bg-blue-200 md:mx-auto my-5 rounded-xl min-h-[80vh] p-5 md:w-[40%]">
        <h1 className="font-bold text-3xl text-center cursor-pointer">myToDo- WorkSpace for Works</h1>
        <div className="addtodo my-7 flex flex-col gap-5">
        <h2 className='text-xl font-bold '>Add a todo</h2>
        <div className="flex">
        <input type="text" onChange={handleChange} value={todo} className='w-full rounded-full px-5 py-1' name="" id="" />
        <button onClick={handleAdd} disabled={todo.length<=3} className=' mx-2 bg-blue-900 hover:bg-blue-950 text-sm font-bold disabled:bg-blue-700 rounded-full p-3 py-1 text-white '>Save</button>
        </div>
        </div>
        <input id="show"onChange={toggleFinished} type="checkbox" checked={showFinished} className='my-5' /> 
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className="line h-[1px] bg-black opacity-20 w-[90%] mx-auto my-4 "></div>
        <h2 className='text-xl font-bold '>Your todos</h2>
        <div className="todos">
        {todos.length==0 && <div className='m-2'>No todos to display...</div>}
        {todos.map((item)=>{
        return (showFinished || !item.isCompleted) && <div key={item.todo} className="todo flex my-3  justify-between ">
          <div className="flex gap-5 overflow-hidden">
          <input onChange={handleCheckBox}  type="checkbox" checked={item.isCompleted} name={item.id} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-blue-900 hover:bg-blue-950 text-sm font-bold  rounded-md p-2 py-1 text-white mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-blue-900 hover:bg-blue-950 text-sm font-bold  rounded-md p-2 py-1 text-white mx-1'><MdDelete /></button>
            </div>
          </div>
         })}
         </div>
      </div>
    </>
  )
}

export default App
