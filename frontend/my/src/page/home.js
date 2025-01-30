import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import axios from "axios";



const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingTask, setEditingTask] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
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
    setEditingTask(task);
    setIsModalOpen(true);
  };
  const handleSaveTask = () => {
    const token = localStorage.getItem("token");
    axios
      .patch(
        `https://aa-1-7fan.onrender.com/task/update/${editingTask._id}`,
        editingTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert(res.data.msg);
        fetchTasks();
        setEditingTask({});
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteTask = (taskId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`https://aa-1-7fan.onrender.com/task/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data.msg);
        fetchTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Div>
        <Button onClick={() => navigate("/add")}>
          <b>+</b> Add Task
        </Button>
      </Div>
      <TaskList>
        {tasks.length > 0 &&
          tasks.map((task) =>
             
              <TaskCard key={task._id}>
                <h3><i>Title : {task.title.toUpperCase()}</i></h3>
                <p><b>Description</b> : {task.description}</p>
                <p><b>Due Date</b> : {task.dueDate.split("T")[0]}</p>
                <p><b>Priority</b> : {task.priority}</p>
                <p><b>Status</b> : {task.status}</p>
                <Buttons onClick={() => handleDeleteTask(task._id)}>
                  <MdDeleteForever size={30}/>
                </Buttons>
                <Buttons onClick={() => handleUpdateTask(task)}>
                    <RiEdit2Fill size={30}/>
                </Buttons>
              </TaskCard>
            
          )}
      </TaskList>
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h3>Title : {editingTask.title}</h3>
          <Select
            value={editingTask.priority}
            onChange={(e) =>
              setEditingTask({ ...editingTask, priority: e.target.value })
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
          <Select
            value={editingTask.status}
            onChange={(e) =>
              setEditingTask({ ...editingTask, status: e.target.value })
            }
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Select>
          <Button onClick={() => handleSaveTask()}>Save</Button>
          </ModalContent>       
        </Modal>
      )}
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
const Div = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: right;
`;

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

const Buttons = styled.button`
    background-color: transparent;
    border: none;
    margin-right: 20px;
    margin-left: 20px;
`;
const TaskList = styled.div`
  display: grid;
  margin-top: 20px;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  text-align: center;
  @media (max-width: 450px) {

    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  @media (max-width: 350px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 10px;
  }
`;

const TaskCard = styled.div`
  padding: 20px;
  border-radius: 20px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Select = styled.select`
  width: 80%;
  margin: auto;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    margin-bottom: 20px;
    color: #333;
  };

  ${Select} {
    margin-bottom: 15px;
    width: 100%;
    display: block;

    margin-left: auto;
    margin-right: auto;
  }

  ${Button} {
    width: 60%;
    margin: 10px auto 0;
    display: block;
    background-color:cyan;
    color: black;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 20px;
  }
`;


