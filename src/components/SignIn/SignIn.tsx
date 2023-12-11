import React, { useState } from 'react';
import firebase from 'firebase/app';
// import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import {
    Container,
    Button,
    Typography,
    Snackbar,
    Alert as MUIAlert,
    AlertProps,
    AlertTitle,
    CircularProgress,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { useForm } from 'react-hook-form';
import { Input, Input2 } from '../sharedComponents/Input'


const signinStyles = {
    googleButton: {
        backgroundColor: '#765f61',
        marginTop:'2em',
        padding: '0',
        color: 'white',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '1px',
        fontFamily: 'roboto',
        cursor: 'pointer',
    },
    dashboardButton: {
        backgroundColor: '#765f61',
        margin: '1em',
        padding: '0',
        color: 'white',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',
        boxShadow: 'rgb(0 0 0 / 25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'inline-block',
        borderRadius: '1px',
        fontFamily: 'roboto',
        cursor: 'pointer',
    },
    typographyStyle: {
        fontFamily: 'Roboto;',
        textAlign: 'center',
        fontSize: '2em'
    },
    textStyle: {
        fontFamily: 'Roboto;',
        textAlign: 'center',
    },
    containerStyle: {
        marginTop: '2em',
        fontFamily:'roboto',
    },
    snackBar: {
        color: 'white',
        backgroundColor: 'error',
    }
}

const NavA = styled(Link) ({
    display:'block',
    color: 'error',
    fontFamily: 'roboto',
});

interface buttonProps {
    open?: boolean,
    onClick?: () => void
}

interface userProps {
    email?: any,
    password?: any,
}

const Alert = (props:AlertProps) => {
    return <MUIAlert elevation={6}/>
}

const GoogleButton = (props:buttonProps) => {
    const navigate = useNavigate();
    // const provider = new GoogleAuthProvider();
    const auth = getAuth()
    // const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const signIn = async () => {
        // await signInWithGoogle()
        localStorage.setItem('myAuth', 'true')
        navigate('/')
    }

    // if (loading) {
    //     return <CircularProgress/>
    // }

    let MyAuth = localStorage.getItem('myAuth')
    if (MyAuth === 'true') {
        return (
            <Container maxWidth='sm' sx={signinStyles.containerStyle}>
                <Typography sx={signinStyles.textStyle}>
                    <p>You are already signed in!</p>
                    <Button sx={signinStyles.dashboardButton} href='/dashboard'>Go to Dashboard</Button>
                    <Button sx={signinStyles.dashboardButton} href='/signout'>Sign Out</Button>
                </Typography>
            </Container>
        ) 
    } else {
        return (
            <Button sx={signinStyles.googleButton} onClick={signIn}>Sign In With Google</Button>
        )
    }
}

export const SignIn = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({});
    const auth = getAuth();

    const handleSnackOpen = () => {
        setOpen(true);
    };

    const handleSnackClose = () => {
        setOpen(false);
        navigate('/')
    };

    const onSubmit = async (data:any, event:any) => {
        console.log(data.email, data.password)

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                localStorage.setItem('myAuth', 'true')
                const user = userCredential.user
                navigate('/dashboard')
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    let MyAuth = localStorage.getItem('myAuth')
    if (MyAuth === 'true') {
        return (
            <Container maxWidth='sm' sx={signinStyles.containerStyle}>
                <Typography sx={signinStyles.textStyle}>
                    <p>You are already signed in!</p>
                    <Button sx={signinStyles.dashboardButton} href='/dashboard'>Go to Dashboard</Button>
                    <Button sx={signinStyles.dashboardButton} href='/signout'>Sign Out</Button>
                </Typography>
            </Container>
        )
    } else {
        return (
            <Container maxWidth='sm' sx={signinStyles.containerStyle}>
                <Typography sx={signinStyles.typographyStyle}>Sign In Below</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <Input {...register('email')} name='email' placeholder='Enter Email'/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <Input2 {...register('password')} name='password' placeholder='Enter Password'/>
                    </div>
                    <Button type='submit' variant='contained' color='error'>Submit</Button>
                </form>
    
                <GoogleButton open={open} onClick={handleSnackClose}/>
    
                <span><br></br>Don't Have an Account?</span>
                <NavA to='/signup'>Register Now!</NavA>
    
                <Snackbar message="Success" open={open} autoHideDuration={3000}>
                <Alert severity='success'> 
                    <AlertTitle>Successful Sign In. Redirecting to Home Page</AlertTitle>
                </Alert>
            </Snackbar>
            </Container>
        )
    }
}

// Functional component to SignOut
export const SignUp = (props: userProps) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({})
    // const auth = getAuth();


    const handleSnackOpen = () => {
        setOpen(true)
    }

    const handleSnackClose = () => {
        setOpen(false)
    }

    const onSubmit = async (data: any, event: any) => {
        console.log(data.email, data.password)
        // console.log(auth)


        // createUserWithEmailAndPassword(auth, data.email, data.password)
        //     .then((userCredential) => {
        //         console.log(userCredential)
        //         // Signed in 
        //         const user = userCredential.user;
        //         console.log(user)
        //         navigate('/signin')
        //     })
        //     .catch((error) => {
        //         console.log(error.message)
        //     });
    }

    return (
        <Container maxWidth='sm' sx={signinStyles.containerStyle}>
            <Typography sx={signinStyles.typographyStyle}>Create Your Account Below</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <Input  {...register('email')} name='email' placeholder='Enter Email' />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <Input2  {...register('password')} name='password' placeholder='Enter Password' />
                </div>
                <Button type='submit' variant='contained' color='error'>Submit</Button>
            </form>

            <Snackbar message='Success' open={open} autoHideDuration={3000}>
                <Alert severity='success'>
                    <AlertTitle>Successful Sign Up. Redirecting to Sign In</AlertTitle>
                </Alert>
            </Snackbar>
        </Container>

    )
}

export const SignUsOut = () => {
    const navigate = useNavigate();
    localStorage.setItem('myAuth', 'false')

    return (
        <Container maxWidth='sm' sx={signinStyles.containerStyle}>
            <Typography sx={signinStyles.textStyle}>
                <p>You have successfully signed out!</p>
                <Button sx={signinStyles.dashboardButton} href='/'>Return to Home</Button>
            </Typography>
        </Container>
    )
}