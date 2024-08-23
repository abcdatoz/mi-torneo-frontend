import {GET_GOLES,ADD_GOL,EDIT_GOL,DELETE_GOL} from '../actions/GolesActions'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_GOLES:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_GOL:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_GOL:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_GOL:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}