import React, { useState } from "react";
import { useId } from 'react';
import { v4 as uuid } from "uuid";
const Todolist = () => {
    const unique_id = uuid();

    // Get first 8 characters using slice
    const small_id = unique_id.slice(0, 8);
  const [todoDetails, setDetails] = useState({
    id: null,
    task: "",
    completed: false,
  });
  console.log("todosetails",todoDetails);
  
  const [todos, setTodo] = useState([
    {
      id: small_id,
      name: "first task",
      completed: false,
    },
  ]);
console.log("todo",todos);
  const handleTodo = (e) => {
    console.log("value", e.target.value);
    setDetails({ id: small_id, name: e.target.value, completed: false });
  };
  const handleClick = () => {
    setTodo((prev)=>[...prev,todoDetails]);
  };
  const handleCheckbox=(e,id)=>{
    console.log("checked",e.target.checked,id);
    const completedTask=todos?.filter((item)=>item.id!=id)
// setTodo(completedTask)    
//     setTodo((prev)=>[...prev,{id:completedTask[0]?.id,name:completedTask[0]?.name,completed:true}]);
  }

const filterData=todos.filter((item,index)=>item.id)  
const unique = [...new Set(todos.map(item => item.id))]; // [ 'A', 'B']

console.log("unique",unique);
const handleDelete=(deleteItem)=>{
const filterItem=todos?.filter((item)=>item.id!=deleteItem.id)
setTodo(filterItem)
}
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      {todos?.map((item) => (
        <div style={{display:'flex',gap:'5px',justifyContent:'center'}}>
            <input type='checkbox' onChange={(e)=>handleCheckbox(e,item.id)}/>
         <div style={{display:'flex',justifyContent:'center',gap:'5px',alignItems:'center'}}> <p>{item.name}</p><span ><button onClick={()=>handleDelete(item)}>delete</button></span></div>
        </div>
      ))}
      <div>
        <div>
          <input name="todo" onChange={(e) => handleTodo(e)} />
        </div>
        <button onClick={() => handleClick()}>Add Todo</button>
      </div>
    </div>
  );
};

export default Todolist;
