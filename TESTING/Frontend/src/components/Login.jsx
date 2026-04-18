import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, RadioGroup, FormControlLabel, FormControl, FormLabel, Radio } from '@mui/material';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};
    if (password.length < 6)
      temp.password = 'Min 6 characters';

    setErrors(temp);
    return Object.keys(temp).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.checkValidity()) {
      alert("Form valid!");
      console.log("Form valid!");
    }

    if (validate())
      alert('Form submitted successfully');
    console.log('Form submitted successfully');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom fontStyle='italic'>Login Form</Typography>

      <form onSubmit={handleSubmit}>

        <TextField type="email" value={email} required
          onChange={e => setEmail(e.target.value)}

          label="Email"
          fullWidth
          margin="normal"

          error={Boolean(errors.email)}
          helperText={errors.email}
        />

        <TextField type="password" value={password} required
          onChange={e => setPassword(e.target.value)}

          label="Password"
          fullWidth
          margin="normal"

          inputProps={{ minLength: 5 }}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        
       <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
              <RadioGroup display="flex" row
                defaultValue="Student"
                name="radio-buttons-group">
            <FormControlLabel control={<Radio />} label="Instructor" value="instructor"/>
            <FormControlLabel control={<Radio />} label="Student" value="student"/>
            <FormControlLabel control={<Radio />} label="Other" value="other"/>
          </RadioGroup>
        </FormControl>
        <div>
        <Button variant="contained" type="submit" >Login</Button>
        </div>
      </form>

      </Container>
    </Box>
  );
}
