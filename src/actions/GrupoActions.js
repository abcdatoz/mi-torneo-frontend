import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_GRUPOS = 'GET_GRUPOS';
export const ADD_GRUPO = 'ADD_GRUPO';
export const EDIT_GRUPO = 'EDIT_GRUPO';
export const DELETE_GRUPO='DELETE_GRUPO';

const urlbase ='http://localhost:8090/api'

export const  getGrupos = () => (dispatch, getState) => {
    axios.get( urlbase + '/grupos/', tokenConfig(getState))
        .then( res => {
                dispatch({ 
                    type: GET_GRUPOS,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addGrupo = (registro) => (dispatch, getState) => {
    axios.post (urlbase + '/grupos/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_GRUPO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editGrupo = ( registro, id) => (dispatch, getState) => {
    axios.put(`${urlbase}/grupos/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_GRUPO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteGrupo = (id) => (dispatch, getState)=>{
    axios.delete(`${urlbase}/grupos/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_GRUPO,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};