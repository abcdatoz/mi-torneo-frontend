import {GET_EQUIPO_ESCUDO, ADD_EQUIPO_ESCUDO, EDIT_EQUIPO_ESCUDO, DELETE_EQUIPO_ESCUDO} from '../actions/EquipoEscudoActions'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_EQUIPO_ESCUDO:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_EQUIPO_ESCUDO:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_EQUIPO_ESCUDO:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_EQUIPO_ESCUDO:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}