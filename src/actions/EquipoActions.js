import axios from 'axios'
import { tokenConfig } from './auth'
import { toast } from 'react-toastify'

export const GET_EQUIPOS = 'GET_EQUIPOS';
export const ADD_EQUIPO = 'ADD_EQUIPO';
export const EDIT_EQUIPO = 'EDIT_EQUIPO';
export const DELETE_EQUIPO='DELETE_EQUIPO';

const urlbase ='http://localhost:8090/api'

export const  getEquipos = () => (dispatch, getState) => {
    axios.get( urlbase + '/equipos/', tokenConfig(getState))
        .then( res => {
                dispatch({ 
                    type: GET_EQUIPOS                    ,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addEquipo = (registro) => (dispatch, getState) => {
    axios.post (urlbase + '/equipos/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_EQUIPO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editEquipo = ( registro, id) => (dispatch, getState) => {
    axios.put(`${urlbase}/equipos/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_EQUIPO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteEquipo = (id) => (dispatch, getState)=>{
    axios.delete(`${urlbase}/equipos/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_EQUIPO,
                payload: id
            });            
        })
        .catch(err => {
            toast.error('El equipo no puede ser eliminado')             
        })
};