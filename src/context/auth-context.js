import {createContext} from 'react';

export const AuthContext=createContext({
    name:null,
    isLoggedin:false,
    token:null,
    mgrInfo:null,
    login:()=>{},
});