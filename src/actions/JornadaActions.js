import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_JORNADAS = 'GET_JORNADAS';
export const ADD_JORNADA = 'ADD_JORNADA';
export const EDIT_JORNADA = 'EDIT_JORNADA';
export const DELETE_JORNADA = 'DELETE_JORNADA';

const urlbase ='http://localhost:8090/api'

export const  getJornadas = () => (dispatch, getState) => {
    axios.get( urlbase + '/jornadas/', tokenConfig(getState))
            .then( res => {
                dispatch({ 
                    type: GET_JORNADAS,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addJornada = (registro) => (dispatch, getState) => {
    axios.post (urlbase + '/jornadas/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_JORNADA,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editJornada = ( registro, id) => (dispatch, getState) => {
    axios.put(`${urlbase}/jornadas/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_JORNADA,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteJornada = (id) => (dispatch, getState)=>{
    axios.delete(`${urlbase}/jornadas/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_JORNADA,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};