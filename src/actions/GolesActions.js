import axios from 'axios'
import { tokenConfig } from './auth'
import { DELETE_GRUPO } from './GrupoActions';
import { toast } from 'react-toastify'

export const GET_GOLES = 'GET_GOLES';
export const ADD_GOL = 'ADD_GOL';
export const EDIT_GOL = 'EDIT_GOL';
export const DELETE_GOL = 'DELETE_GOL';

const urlbase ='http://localhost:8090/api'

export const  getGoles = () => (dispatch, getState) => {
    axios.get( urlbase + '/goles/', tokenConfig(getState))
        .then( res => {
                dispatch({ 
                    type: GET_GOLES,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addGol = (registro) => (dispatch, getState) => {
    axios.post (urlbase + '/goles/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_GOL,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editGol = ( registro, id) => (dispatch, getState) => {
    axios.put(`${urlbase}/goles/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_GOL,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteGol = (id) => (dispatch, getState)=>{
    axios.delete(`${urlbase}/goles/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_GOL,
                payload: id
            });            
        })
        .catch(err => { toast.error("El gol no se puede eliminar")  })
};