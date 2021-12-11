import { AuthAction, AuthActionTypes, 
    ILoginModel, ILoginResult, IUser} from './types';
import {Dispatch} from "react";
import http from '../../../http_common';
import axios, { AxiosError } from "axios";
import jwt from 'jsonwebtoken';


export const AuthUser = (token: string, dispatch: Dispatch<AuthAction>) =>  {
    const user = jwt.decode(token) as IUser;
    dispatch({
      type: AuthActionTypes.LOGIN_AUTH,
      payload: user,
    });
}