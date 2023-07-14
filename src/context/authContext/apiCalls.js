import axios from "axios";
import {loginStart, loginSuccess, loginFailure, logOut} from "./AuthActions"
import { toast  } from 'react-toastify';
import { BASE_URL } from '../../helper';

export const LoginCall = async(user,dispatch) =>{


    dispatch(loginStart());
    try{
        const res = await axios.post(`${BASE_URL}/api/auth/login`,user);
        if(res.data.error){
            toast(res.data.error);
        }

        else{
            dispatch(loginSuccess(res.data));
        }
    }

    catch(err){
        dispatch(loginFailure());
    }
}

export const logout = (dispatch) =>{
    dispatch(logOut());
}