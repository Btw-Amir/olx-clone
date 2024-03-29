import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Olx from '../../assets/OlxLogo'
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../config/firebase';

const defaultTheme = createTheme();

export default function SignIn() {
  const handleSubmit = async  (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userdata= {
      email: data.get('email'),
      password: data.get('password'),
    } 
    try{
  await signIn(userdata)
  alert('an do')
  navigate('/')
    }
     catch(e){
   alert (e.message)
     } 
     
  };

  const navigate = useNavigate()

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1,p:-2 ,bgcolor: 'secondary',width:80,height:80 }}>
            <Olx />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit} >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2"    onClick={() => navigate("/sign")}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}