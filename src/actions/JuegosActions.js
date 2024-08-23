import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_JUEGOS = 'GET_JUEGOS';
export const ADD_JUEGO = 'ADD_JUEGO';
export const EDIT_JUEGO = 'EDIT_JUEGO';
export const DELETE_JUEGO = 'DELETE_JUEGO';

const urlbase ='http://localhost:8090/api'

export const  getJuegos = () => (dispatch, getState) => {
    axios.get( urlbase + '/juegos/', tokenConfig(getState))    
        .then( res => {
                dispatch({ 
                    type: GET_JUEGOS,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addJuego = (registro) => (dispatch, getState) => {
    axios.post (urlbase + '/juegos/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_JUEGO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editJuego = ( registro, id) => (dispatch, getState) => {
    axios.put(`${urlbase}/juegos/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_JUEGO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteJuego = (id) => (dispatch, getState)=>{
    axios.delete(`${urlbase}/juegos/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_JUEGO,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};