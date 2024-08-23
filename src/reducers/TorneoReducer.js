import {GET_TORNEOS, ADD_TORNEO,EDIT_TORNEO,DELETE_TORNEO} from '../actions/TorneoActions'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_TORNEOS:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_TORNEO:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_TORNEO:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_TORNEO:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}