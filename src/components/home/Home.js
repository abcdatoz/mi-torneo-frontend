import React, { useState,useEffect}  from 'react'
import {useSelector, useDispatch} from 'react-redux'

import { getTorneos} from '../../actions/TorneoActions'
import { getGrupos } from '../../actions/GrupoActions'
import { getEquipos } from '../../actions/EquipoActions'
import { getEquipoEscudo } from '../../actions/EquipoEscudoActions'
import { getEquipoFoto } from '../../actions/EquipoFotoActions'
import { getJugadores } from '../../actions/JugadorActions'
import { getJugadorFoto } from '../../actions/JugadorFotoActions'
import { getJornadas } from '../../actions/JornadaActions'
import { getJuegos } from '../../actions/JuegosActions'
import { getGoles } from '../../actions/GolesActions'
 

import TablaGeneral from './TablaGeneral'
import TablaPorGrupo from './TablaPorGrupo'
import Goleo from './Goleo'
import Tarjetero from './Tarjetero'
import VerJornadas from './VerJornadas'
import VerRol from './VerRol'
import VerPendientes from './VerPendientes'
import Team from './Team'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Home = () => {


    //use states
    const [nombreTorneo, setNombreTorneo] = useState('')
    const [torneo, setTorneo] = useState('')
    const [typ, setTyp] = useState('')

    const [idTeam, setIdTeam] = useState('')
    

    const [filtroNombre, setFiltroNombre] = useState('')
    const [filtroLocalidad, setFiltroLocalidad] = useState('')


    //use selectors
    const {isAuthenticated, user} = useSelector( store => store.auth);
    const torneos = useSelector(state => state.torneos.lista)

    const grupos = useSelector(state => state.grupos.lista)
    const equipos = useSelector(state => state.equipos.lista)
    const equiposEscudo = useSelector(state => state.equipos.lista)
    const equiposFoto = useSelector(state => state.equipos.lista)
    const jugadoresFoto = useSelector(state => state.jugadoresFoto.lista)

    const jornadas = useSelector(state => state.jornadas.lista)
    const juegos = useSelector(state => state.juegos.lista)
    const goles =  useSelector(state => state.goles.lista)
    

    //use dispatch
    const dispatch = useDispatch()

    
    //useEffect
    useEffect( () => {
        dispatch(getTorneos())
        
        dispatch(getGrupos())
        dispatch(getEquipos())

        dispatch(getJornadas())
        dispatch(getJuegos())

        dispatch(getJugadores())        
        dispatch(getGoles())        

         
        dispatch(getEquipoFoto())
        dispatch(getEquipoEscudo())
        dispatch(getJugadorFoto())
       
    },[])



    const seeDetails = (torn, quever) => {
        setTorneo(torn.id)
        setNombreTorneo(torn.nombre)        
        setTyp(quever)
        //dispatch(addVisita({ip:datosRegion.ip, city: datosRegion.city, region: datosRegion.region, torneo: torn.nombre + ' ' + torn.localidad }))
    }


     
    const numEquipos = (torn) => {

        let arr = equipos.filter(x => x.torneoId === torn && x.status == 'alta')
        return arr.length

    }

    const numJornadas = (torn) => {
        let arr = jornadas.filter(x => x.torneoId === torn)
        return arr.length
    }

    const numGoles = (torn) => {
        let arr = juegos.filter(x => x.torneoId === torn)
        
        let suma = 0
        arr.forEach(element => {
            suma = suma + element.golesA + element.golesB
        });
        
        return suma
    }



     
   
    const listatorneos = (
        <>        
    
        
        <table className="table table-striped">
            <thead>
                <th width="10%"></th>
                <th width="20%">                    
                    {/* <input 
                            type="text"
                            placeholder="filtrar x nombre de torneo"
                            name="filtroNombre"
                            value={filtroNombre}
                            onChange={ e => setFiltroNombre(e.target.value)}
                        />    */}
                </th>
                <th width="20%">                    
                    {/* <input 
                            type="text"
                            placeholder="filtrar x localidad donde se juega"
                            name="filtroLocalidad"
                            value={filtroLocalidad}
                            onChange={ e => setFiltroLocalidad(e.target.value)}
                        />    */}
                    </th>               
                
            </thead>     
            </table>

           


        <div className="main-container">
            {
                torneos
                    .filter (x => x.nombre.toUpperCase().includes(filtroNombre.toUpperCase()) 
                               && x.localidad.toUpperCase().includes(filtroLocalidad.toUpperCase()) )                    
                    .map( torneo => (

                        
                        <Card key={torneo.id} style={{ width: '18rem' }} >
                            <Card.Img variant="top" src={"http://localhost:8090/api/resources/" + torneo.imagen} width="100" height="100" />
                            <Card.Body>
                                <Card.Title>{torneo.nombre}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{torneo.localidad}</Card.Subtitle>
                                <Card.Text>
                                    {torneo.localidad}  
                                    <br />
                                    {numEquipos(torneo.id)} Equipos 
                                    <br />
                                    {numJornadas(torneo.id)} Jornadas
                                    <br />
                                    {numGoles(torneo.id)} Goles
                                </Card.Text>
                                <Card.Link href="#" onClick={ () => seeDetails(torneo, 'tabla_general')}>Estadísticas</Card.Link>
                                
                            </Card.Body>
                      </Card>
                  

                ))
            }
            
        </div>



    
        </>
    )

      
     


    return(
 
        < >

        

        {
            torneo == ''
                ? listatorneos
                : (
                    <>
                        <h5>{ nombreTorneo }</h5>
            
                        
                        <div className="row-container">                        

                            <button  onClick={() => { setTyp('tabla_general') }} className="btn btn-outline-primary" >
                                Tabla General
                            </button>            
                            <button  onClick={() => { setTyp('tabla_por_grupos') }} className="btn btn-outline-primary" >
                                Tabla por Grupos
                            </button>            
                            <button  onClick={() => { setTyp('goleo') }} className="btn btn-outline-primary" >
                                Goleo
                            </button> 
                
                            <button  onClick={() => { setTyp('tarjetero') }} className="btn btn-outline-primary" >
                                Tarjetero
                            </button> 

                            <button  onClick={() => { setTyp('ver_jornadas') }} className="btn btn-outline-primary" >
                                Jornadas
                            </button>      

                            <button  onClick={() => { setTyp('ver_rol') }} className="btn btn-outline-warning" >
                                Ver Rol
                            </button>                  


                            <button  onClick={() => { setTyp('ver_juegos_pendientes') }} className="btn btn-outline-warning" >
                                Juegos Pendientes
                            </button>                  

                            <button  className="btn btn-outline-default" >
                                
                            </button>   
                            <button  onClick={() => {setTorneo(''); setNombreTorneo('')}} className="btn btn-outline-primary" >
                                regresar
                            </button>   

                        </div>
                        
                

                        {(() => {

                            switch(typ) {
                                
                                case "ver_rol":                 return <VerRol idTorneo={torneo} />;
                                case "tabla_general":           return <TablaGeneral idTorneo={torneo} setTipo={setTyp} setTeam={setIdTeam} />;
                                case "tabla_por_grupos":        return <TablaPorGrupo idTorneo={torneo} setTipo={setTyp} setTeam={setIdTeam} />;
                                case "goleo":                   return <Goleo idTorneo={torneo} />;
                                case "tarjetero":               return <Tarjetero idTorneo={torneo} />;
                                case "ver_jornadas":            return <VerJornadas idTorneo={torneo} />;
                                case "ver_juegos_pendientes":   return <VerPendientes idTorneo={torneo} />;
                                case "team":                    return <Team idTorneo={torneo} idTeam={idTeam} />;
                                

                                default:      return <h1>No ha seleccionado el torneo</h1>
                            }


                        })()}    

                    </>
                )                                       
                
        } 


 
        </>
    )
}


export default Home;
