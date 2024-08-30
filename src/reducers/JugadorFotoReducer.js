import {GET_JUGADOR_FOTO, ADD_JUGADOR_FOTO, EDIT_JUGADOR_FOTO, DELETE_JUGADOR_FOTO} from '../actions/JugadorFotoActions'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_JUGADOR_FOTO:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_JUGADOR_FOTO:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_JUGADOR_FOTO:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_JUGADOR_FOTO:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}