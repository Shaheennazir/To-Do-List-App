import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/Taskform';
import Task from './components/Task';
import Login from './pages/Login';
import Register from './pages/Register';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CalendarComponent from './components/Calendar';
import { StyledContainer } from './components/StyledComponents';
import Grid from '@mui/material/Grid';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: true }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(tasks.map(task => task._id === id ? res.data : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    fetchTasks();
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(reorderedTasks);
  };

  return (
    <StyledContainer>
      <h1>To-Do List</h1>
      {!isAuthenticated ? (
        <>
          <Login onLogin={handleLogin} />
          <Register />
        </>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CalendarComponent tasks={tasks} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TaskForm addTask={addTask} />
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="tasks">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks.map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Task task={task} updateTask={updateTask} deleteTask={deleteTask} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Grid>
        </Grid>
      )}
    </StyledContainer>
  );
}

export default App;
