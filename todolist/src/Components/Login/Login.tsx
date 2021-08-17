import React from 'react' 

import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core' 
import {useFormik} from 'formik';
import { loginTC } from '../../Store/auth-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from '../../Store/store';
import { Redirect } from 'react-router-dom';
import s from './Login.module.css';
 

type FormikErrorType = { 

    email?: string 
    password?: string 
    rememberMe?: boolean 
 } 


export const Login = () => { 

    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => { 

            const errors: FormikErrorType = {}; 
            if (!values.email) { 
                errors.email = 'Required'; 
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) { 
     
                errors.email = 'Invalid email address'; 
            } 

            if(!values.password){
                errors.password = 'Required';
            } else if (values.password.length < 4) {
     
                errors.password = 'Password to short'; 
            }

            return errors; 
        }, 
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2))
            dispatch(loginTC(values))
            formik.resetForm();
        },
    });

    if(isLoggedIn) {
        return <Redirect to={'/'}/>
    }

   return <div className={s.loginContainer}>

<Grid container justify="center"> 

<Grid item xs={4} className={s.form}> 
    <FormControl> 
        <FormLabel> 
            <p>To log in get registered  
              <a style={{'textDecoration': 'none'}} href={'https://social-network.samuraijs.com/'} 
                 target={'_blank'}> here 
              </a> 
            </p> 
            <p>or use common test account credentials:</p> 
            <p>Email: free@samuraijs.com</p> 
            <p>Password: free</p> 
        </FormLabel> 
        
        <form onSubmit={formik.handleSubmit}>
                 <FormGroup> 
                     <TextField 
                         label="Email" 
                         margin="normal" 
                         // name="email"
                         // onChange={formik.handleChange}
                         // value={formik.values.email}
                         // onBlur={formik.handleBlur}
                         {...formik.getFieldProps('email')}
                     />
                      {/* Show error if field has touched and has error */}
                     {formik.touched.email && formik.errors.email && 
                     <div style={{'color': 'red'}}>{formik.errors.email}</div>}

                     <TextField 
                         type="password" 
                         label="Password" 
                         margin="normal"
                         // name="password"
                         // onChange={formik.handleChange}
                         // value={formik.values.password} 
                         // onBlur={formik.handleBlur}
                         {...formik.getFieldProps('password')}
                     /> 
                     {/* Show error if field has touched and has error */}
                     {formik.touched.password && formik.errors.password && 
                     <div style={{'color': 'red'}}>{formik.errors.password}</div>}

                     <FormControlLabel 
                         label={'Remember me'} 
                         control={<Checkbox  {...formik.getFieldProps('rememberMe')}/>} 
                     /> 
                    
                    <div className={s.loginButton}>
                    <Button
                             type={'submit'} 
                             variant={'contained'} 
                             color={'primary'}>Login</Button> 
                    </div>
                     
                 </FormGroup> 
        </form>

    </FormControl> 
</Grid> 

</Grid> 

   </div>

} 