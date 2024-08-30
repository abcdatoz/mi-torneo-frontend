import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_JUGADOR_FOTO = 'GET_JUGADOR_FOTO';
export const ADD_JUGADOR_FOTO = 'ADD_JUGADOR_FOTO';
export const EDIT_JUGADOR_FOTO = 'EDIT_JUGADOR_FOTO';
export const DELETE_JUGADOR_FOTO='DELETE_JUGADOR_FOTO';

const urlbase ='http://localhost:8090/api'

export const  getJugadorFoto = () => (dispatch, getState) => {
    axios.get( urlbase + '/fotojugadores/', tokenConfig(getState))    
        .then( res => {
                dispatch({ 
                    type: GET_JUGADOR_FOTO,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addJugadorFoto = (registro) => (dispatch, getState) => {
    axios.post (urlbase + '/fotojugadores/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_JUGADOR_FOTO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editJugadorFoto = ( registro, id) => (dispatch, getState) => {
    axios.put(`${urlbase}/fotojugadores/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_JUGADOR_FOTO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

 
export const deleteJugadorFoto = (id) => (dispatch, getState)=>{
    axios.delete(`${urlbase}/fotojugadores/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_JUGADOR_FOTO,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};