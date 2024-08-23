import {GET_JUEGOS, ADD_JUEGO,EDIT_JUEGO,DELETE_JUEGO} from '../actions/JuegosActions'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_JUEGOS:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_JUEGO:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_JUEGO:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_JUEGO:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}