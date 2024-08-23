import {GET_EQUIPO_FOTO, ADD_EQUIPO_FOTO, EDIT_EQUIPO_FOTO, DELETE_EQUIPO_FOTO} from '../actions/EquipoFotoActions'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_EQUIPO_FOTO:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_EQUIPO_FOTO:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_EQUIPO_FOTO:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_EQUIPO_FOTO:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}