import {GET_JORNADAS, ADD_JORNADA,EDIT_JORNADA,DELETE_JORNADA} from '../actions/JornadaActions'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_JORNADAS:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_JORNADA:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_JORNADA:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_JORNADA:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}