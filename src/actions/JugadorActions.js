import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_JUGADORES = 'GET_JUGADORES';
export const ADD_JUGADOR = 'ADD_JUGADOR';
export const EDIT_JUGADOR = 'EDIT_JUGADOR';
export const DELETE_JUGADOR='DELETE_JUGADOR';

const urlbase ='http://localhost:8090/api'

export const  getJugadores = () => (dispatch, getState) => {
    axios.get( urlbase + '/jugadores/', tokenConfig(getState))
        .then( res => {
                dispatch({ 
                    type: GET_JUGADORES,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addJugador = (registro) => (dispatch, getState) => {
    axios.post (urlbase + '/jugadores/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_JUGADOR,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editJugador = ( registro, id) => (dispatch, getState) => {
    axios.put(`${urlbase}/jugadores/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_JUGADOR,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteJugador = (id) => (dispatch, getState)=>{
    axios.delete(`${urlbase}/jugadores/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_JUGADOR,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};