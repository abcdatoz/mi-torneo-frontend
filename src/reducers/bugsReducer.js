import {GET_BUGS,ADD_BUG,EDIT_BUG,DELETE_BUG, SET_BUG_MODE,SET_BUG_ID } from '../actions/bugsActions'

const initialState = {
    lista:[],
    mode: '',
    idBug:''
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_BUGS:
            return{
                ...state,
                lista: action.payload
            }
        case ADD_BUG:
            return{
                ...state,
                lista: [...state.lista, action.payload]
            }
        case EDIT_BUG:
            console.log (action.payload)
            return {
                ...state,
                lista: [...state.lista.filter(item=> item.id !== action.payload.id), action.payload]
            }
        case DELETE_BUG:
            return{
                ...state,
                lista: state.lista.filter(item=>item.id !== action.payload)
            }

        case SET_BUG_MODE:
            return{
                ...state,
                mode: action.payload
            }
        case SET_BUG_ID:
            return{
                ...state,
                idBug: action.payload
            }
        default:
            return state        
    }
}