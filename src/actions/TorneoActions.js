import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_TORNEOS = 'GET_TORNEOS';
export const ADD_TORNEO = 'ADD_TORNEO';
export const EDIT_TORNEO = 'EDIT_TORNEO';
export const DELETE_TORNEO='DELETE_TORNEO';

const urlbase ='http://localhost:8090/api/'

export const  getTorneos = () => (dispatch, getState) => {
    axios.get( urlbase + 'torneos/', tokenConfig(getState))
        .then( res => {
                dispatch({ 
                    type: GET_TORNEOS,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addTorneo = (registro) => (dispatch, getState) => {
    axios.post (urlbase + 'torneos/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_TORNEO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editTorneo = ( registro, id) => (dispatch, getState) => {
    axios.put(`${urlbase}torneos/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_TORNEO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteTorneo = (id) => (dispatch, getState)=>{
    axios.delete(`${urlbase}torneos/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_TORNEO,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};