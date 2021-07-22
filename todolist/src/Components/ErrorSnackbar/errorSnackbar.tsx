import React from 'react' 
import Snackbar from '@material-ui/core/Snackbar' 
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert' 
import { useDispatch, useSelector } from 'react-redux'
import { AppRootState } from '../../Store/store'
import { setAppErrorAC } from '../../Store/app-reducer'

 

function Alert(props: AlertProps) { 

   return <MuiAlert elevation={6} variant="filled" {...props} /> 

} 

 
export function ErrorSnackbar() { 

   
   const error = useSelector<AppRootState, string | null>(state => state.app.error)
   const dispatch = useDispatch();

   const handleClose = (event?: React.SyntheticEvent, reason?: string) => { 

       if (reason === 'clickaway') { 
           return 
       } 
       dispatch(setAppErrorAC(null));
   } 

 

   return ( 

       <Snackbar open={error != null} autoHideDuration={6000} onClose={handleClose}> 

           <Alert onClose={handleClose} severity="error"> 

               {error}

           </Alert> 

       </Snackbar> 

   ) 

} 