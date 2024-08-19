import axios from 'axios'
import { tokenConfig, tokenConfigMultipart } from './auth'
import { toast } from 'react-toastify';

export const GET_BUGS ='GET_BUGS'
export const ADD_BUG ='ADD_BUG'
export const EDIT_BUG ='EDIT_BUG'
export const DELETE_BUG ='DELETE_BUG'
export const SET_BUG_MODE = 'SET_BUG_MODE'
export const SET_BUG_ID = 'SET_BUG_ID'

const urlbase ='http://localhost:8080/api/'



export const getBugs = () => (dispatch, getState) => {

    
    axios.get(urlbase + 'bugs/', tokenConfig(getState))
        .then( res => {

            let newArray = res.data.map (item => {

                let url = 'http://localhost:8080/resources/' + item.bug_image
                let obj = {
                    ...item,
                    url
                }
                return obj
            })

            dispatch({
                type: GET_BUGS,
                payload: newArray
            })
        })
        .catch(err => console.log(err))
}

export const addBug = (registro) => (dispatch, getState) => {

    axios.post(urlbase + 'bugs/', registro, tokenConfigMultipart(getState))
        .then (res => {

            let url = 'http://localhost:8080/resources/' + res.data.bug_image

            let obj = {
                ...res.data,
                url
            }

            dispatch({
                type: ADD_BUG,
                payload: obj
            })
        })
        .catch(err => {
            
            console.log(Object.keys(err))
            console.log(err.response)
            console.log(err.response.data)

            toast.error(err.response.data.error);
            
            }
            )
        
}
export const editBug = (registro, id) => (dispatch, getState) => {    
    axios.put(urlbase + `bugs/${id}`, registro, tokenConfig(getState))
        .then (res => {

            let url = 'http://localhost:8080/resources/' + res.data.bug_image

            let obj = {
                ...res.data,
                url
            }

            dispatch({
                type: EDIT_BUG,
                payload: obj
            })

             
        })
        .catch( err => console.log(err))
}

export const deleteBug = (id) => (dispatch, getState) => {

    
    axios.delete(urlbase + `bugs/${id}`,  tokenConfig(getState))    
        .then( res => {
            dispatch ({
                type: DELETE_BUG,
                payload: id
            })
        })
        .catch(err => console.log(err))
}


export const setBugMode = (newmode) => (dispatch) => {
    dispatch ({
        type: SET_BUG_MODE,
        payload: newmode
    })
}


export const setBugID = (newID) => (dispatch) => {
    dispatch({
        type: SET_BUG_ID,
        payload: newID
    })
}