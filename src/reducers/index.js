import { combineReducers } from 'redux'


import auth from './auth'
import bugs from './bugsReducer'
import torneos from './TorneoReducer' 
import grupos from './GrupoReducer'
import equipos from './EquipoReducer'
import equiposFoto from './EquipoFotoReducer'
import equiposEscudo from './EquipoEscudoReducer'
import jornadas from './JornadaReducer'
import jugadores from './JugadorReducer'
import jugadoresFoto from './JugadorFotoReducer'
import juegos from './JuegoReducer'
import goles from './GolReducer'

export default combineReducers({
    auth,
    bugs, 
    torneos,
    grupos,
    equipos,
    equiposFoto,
    equiposEscudo,
    jornadas,
    jugadores,
    jugadoresFoto,
    juegos,
    goles    
})