import {GET_JUGADORES, ADD_JUGADOR,EDIT_JUGADOR,DELETE_JUGADOR} from '../actions/JugadorActions'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_JUGADORES:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_JUGADOR:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_JUGADOR:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_JUGADOR:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}