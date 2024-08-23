import {GET_EQUIPOS, ADD_EQUIPO,EDIT_EQUIPO,DELETE_EQUIPO} from '../actions/EquipoActions'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_EQUIPOS:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_EQUIPO:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_EQUIPO:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_EQUIPO:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}