import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


export const StyledContainer = styled(Container)({
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const StyledButton = styled(Button)({
  margin: '10px',
});

export const StyledTextField = styled(TextField)({
  margin: '10px 0',
});

export const TaskBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  borderBottom: '1px solid #ccc',
});