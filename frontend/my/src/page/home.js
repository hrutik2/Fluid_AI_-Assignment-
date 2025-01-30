import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const [editingTask, setEditingTask] = useState({});
  

  useEffect(() => {
    const token=localStorage.getItem("token")
    if(!token){
        navigate("/login")
    }
    else{
    fetchTasks();
    }
  }, []);

  const fetchTasks = () => {
    const token = localStorage.getItem("token");
    axios
      .get("https://aa-1-7fan.onrender.com/task/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const handleUpdateTask = (task) => {
    setEditingTask(task)
  };
  const handleSaveTask=()=>{
    const token=localStorage.getItem("token")
    axios.patch(`https://aa-1-7fan.onrender.com/task/update/${editingTask._id}`,editingTask,{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then((res)=>{
        console.log(res.data)
        alert(res.data.msg)
        fetchTasks()
        setEditingTask({})
    })
  }

  const handleDeleteTask = (taskId) => {
    const token=localStorage.getItem("token")
    axios.delete(`https://aa-1-7fan.onrender.com/task/delete/${taskId}`,{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then((res)=>{
        console.log(res.data)
        alert(res.data.msg)
        fetchTasks()
    })
    .catch((err)=>{
        console.log(err)
    })
  };

  return (
    <Container>
        <Div>
           
      <Button onClick={() => navigate("/add")}><b>+</b> Add Task</Button>
      </Div>
      <TaskList>
        {tasks.length > 0 &&
          tasks.map((task) => (
            editingTask._id===task._id?
            <TaskCard key={task._id}>
                <h3>Title : {editingTask.title}</h3>
                <Select value={editingTask.priority} onChange={(e)=>setEditingTask({...editingTask,priority:e.target.value})}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </Select>
                <Select value={editingTask.status} onChange={(e)=>setEditingTask({...editingTask,status:e.target.value})}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </Select>
                <Button onClick={()=>handleSaveTask()}>Save</Button>
            </TaskCard>
            :<TaskCard key={task._id}>
              <h3>Title : {task.title}</h3>
              <p>Description : {task.description}</p>
              <p>Due Date : {task.dueDate.split("T")[0]}</p>
              <p>Priority : {task.priority}</p>
              <p>Status : {task.status}</p>
              <Button onClick={()=>handleDeleteTask(task._id)}>Delete</Button>
              <Button onClick={()=>handleUpdateTask(task)}>Update</Button>
            </TaskCard>
          ))}
      </TaskList>
    </Container>
  );
};
export default Home;
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;
const Div=styled.div`
width:90%;
margin:auto;
display:flex;
justify-content:right;

`

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  margin-right: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const TaskList = styled.div`
  display: grid;
  margin-top: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  text-align: center;
`;

const TaskCard = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Select = styled.select`
  width:80%;
  margin:auto;
  padding: 10px ;
 border:1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;

`;