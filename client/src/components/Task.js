import React from 'react';
import { StyledButton, TaskBox } from './StyledComponents';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Task({ task, updateTask, deleteTask }) {
  return (
    <TaskBox>
      <div>
        <h3>{task.title}</h3>
        <p>Due: {task.dueDate}</p>
      </div>
      <div>
        <StyledButton
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => updateTask(task._id)}
        >
          Edit
        </StyledButton>
        <StyledButton
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </StyledButton>
      </div>
    </TaskBox>
  );
}

export default Task;


