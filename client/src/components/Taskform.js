import React, { useState } from 'react';
import { StyledButton, StyledTextField, StyledContainer } from './StyledComponents';
import AddIcon from '@mui/icons-material/Add';

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    addTask({ title, dueDate });
    setTitle('');
    setDueDate('');
  };

  return (
    <StyledContainer component="form" onSubmit={handleSubmit}>
      <StyledTextField
        label="Task Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <StyledTextField
        type="date"
        variant="outlined"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <StyledButton
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
      >
        Add Task
      </StyledButton>
    </StyledContainer>
  );
}

export default TaskForm;



