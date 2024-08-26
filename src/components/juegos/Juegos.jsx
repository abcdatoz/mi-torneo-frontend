import React, {useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getTorneos} from '../../actions/TorneoActions'
import { getJornadas, addJornada,editJornada, deleteJornada } from '../../actions/JornadaActions'
import { getJuegos, addJuego, deleteJuego, editJuego } from '../../actions/JuegosActions'
import { getEquipos } from '../../actions/EquipoActions'
import { getGoles,addGol,deleteGol } from '../../actions/GolesActions'
import { getJugadores, addJugador } from '../../actions/JugadorActions'

import { Container, Row, Col, InputGroup, Modal,Form , Button} from 'react-bootstrap'
import { toast } from 'react-toastify'

const Juegos = () => {
 
    //torneo
    const [nombreTorneo, setNombreTorneo] = useState('')
    const [torneo, setTorneo] = useState('')
    //jornada
    const [nombre, setNombre] = useState('')
    const [inicia, setInicia] = useState('')
    const [termina, setTermina] = useState('')
    const [aviso, setAviso] = useState('')
    //juego
    const [journey, setJourney] = useState('')
    const [fecha, setFecha] = useState('')
    const [hora, setHora] = useState('')
    const [minuto, setMinuto] = useState('')
    const [equipoA, setEquipoA] = useState('')
    const [equipoB, setEquipoB] = useState('')
    const [golesA, setGolesA] = useState(0)
    const [golesB, setGolesB] = useState(0)
    //goles
    const [nombreJornada, setNombreJornada] = useState('')
    const [idJuego, setIdJuego] = useState('')
    const [idTeamA, setIdTeamA] = useState('')
    const [idTeamB, setIdTeamB] = useState('')
    const [nombreTeamA, setNombreTeamA] = useState('')    
    const [nombreTeamB, setNombreTeamB] = useState('')
    const [statusJuego, setStatusJuego] = useState('')
    //player A
    const [jugadorA, setJugadorA] = useState('')
    const [golA, setGolA] = useState(0)
    const [amarillaA, setAmarillaA] = useState(0)
    const [rojaA, setRojaA] = useState(0)
    //player B
    const [jugadorB, setJugadorB] = useState('')
    const [golB, setGolB] = useState(0)
    const [amarillaB, setAmarillaB] = useState(0)
    const [rojaB, setRojaB] = useState(0)

    //Alta de jugadores
    const [equipoAlta, setEquipoAlta] = useState('')
    const [nombreAlta, setNombreAlta] = useState('')

    const [listaHoras, setListaHoras] = useState([        
        {hora: '07'}, {hora: '08'}, {hora: '09'}, {hora: '10'}, {hora: '11'}, {hora: '12'},   {hora: '13'}, {hora: '14'}, {hora: '15'}, {hora: '16'}, {hora: '17'}, {hora: '18'}, {hora: '19'}, {hora: '20'}, {hora: '21'}, {hora: '22'}, {hora: '23'}        
    ])    
    const [listaMinutos, setListaMinutos] = useState([  {min: '00'}, {min: '10'}, {min: '20'}, {min: '30'}, {min: '40'},{min: '50'} ])


    const [showMyModal, setshowMyModal] = useState(false)
    const [showMyModalJuego, setshowMyModalJuego] = useState(false)
    const [showMyModalAddPlayer, setshowMyModalAddPlayer] = useState(false)
    const [MyConfirmation, setMyConfirmation] = useState(false)
    const [MyConfirmationCloseJuego, setMyConfirmationCloseJuego] = useState(false)
    const [MyConfirmationOpenJuego, setMyConfirmationOpenJuego] = useState(false)
    const [MyConfirmationCloseJornada, setMyConfirmationCloseJornada] = useState(false)

    
      
    const closeModal = (e) => { setshowMyModal(false); }
    const closeModalJuego = (e) => { setshowMyModalJuego(false); }
    const closeModalAddPlayer = (e) => { setshowMyModalAddPlayer(false); }
    const closeMyConfirmation = (e) => { setMyConfirmation(false); }
    const closeMyConfirmationCloseJuego = (e) => { setMyConfirmationCloseJuego(false); }
    const closeMyConfirmationOpenJuego = (e) => { setMyConfirmationOpenJuego(false); }
    const closeMyConfirmationCloseJornada = (e) => { setMyConfirmationCloseJornada(false); }

    

    //use selectors
    const auth = useSelector(state => state.auth)    
    const torneos = useSelector(state => state.torneos.lista)
    const jornadas = useSelector(state => state.jornadas.lista)
    const juegos = useSelector(state => state.juegos.lista)
    const equipos = useSelector(state => state.equipos.lista)
    const goles = useSelector(state => state.goles.lista)
    const jugadores = useSelector(state => state.jugadores.lista)

    //use dispatch
    const dispatch = useDispatch()

    //useEffect
    useEffect( () => {
        dispatch(getTorneos())
        dispatch(getJornadas())
        dispatch(getJuegos())
        dispatch(getEquipos())
        dispatch(getGoles())
        dispatch(getJugadores())        
    },[])

    //jornadas
    const newJornada =() => {
        let newJ = jornadas.filter(x => x.torneoId == torneo).length + 1
        setNombre('Jornada ' + newJ)    
        setshowMyModal(true)    
    }
   

    const guardar = (e) => {
        e.preventDefault()

        if (nombre == '') {
            toast.warning('No ha capturado el nombre de la jornada')
            return
        }
        
        let data = {
            torneo,            
            nombre,
            inicia : inicia + ' 00:00:00',
            termina : termina + ' 00:00:00' ,
            aviso,
            status: 'Abierta'   
        }
        
        dispatch(addJornada(data)) 
        setNombre('')
        setInicia('')  
        setTermina('')
        setAviso('')
        setshowMyModal(false)
    }

    const eliminarJornada = (id) =>{
        dispatch(deleteJornada(id))   
    }

    const preCierreJornada = (id) =>{

        if(juegos.filter(x=> x.jornadaId == id).length == 0){
            toast.warning('Para poder cerrar la jornada debe de haber partidos registrados en ella')
            return
        }

        setJourney(id)

        setMyConfirmationCloseJornada(true)

    }
    const cerrarJornada=()=>{

        let data = {          
            status: 'Cerrada'   
        }
        
        dispatch(editJornada(data, journey))   
        setMyConfirmationCloseJornada(false)
    }



    ///juegos
    const newJuego =(j)=>{

        setshowMyModalJuego(true)

        setJourney(j)
        setHora('')
        setMinuto('')

        let fechainicial = jornadas.filter(x => x.id == j ) [0].inicia.substring(0,10)
        setFecha(fechainicial)

        setEquipoA('')
        setEquipoB('')
        setGolesA(0)
        setGolesB(0)

    }

    const guardarJuego = (e) => {
        e.preventDefault()

        if (equipoA == '' || equipoB == '') {
            toast.warning('No ha indicado los equipos')
            return
        }

        if (fecha == '' || hora == '' || minuto =='') {
            toast.warning('No ha indicado la fecha, hora y minuto')
            return
        }

        if (equipoA ==  equipoB ) {
            toast.warning('Has seleccionado el mismos equipo')
            return
        }

        
        let juegosjugados = []

        juegos.forEach(element => {

            let jj = {jornada: jornadas.filter(x =>  x.id == element.jornadaId )[0].nombre }

            if (element.equipoA == equipoA && element.equipoB == equipoB)               
                juegosjugados.push (jj)            

            if (element.equipoA == equipoB && element.equipoB == equipoA)
                juegosjugados.push (jj)
            
                
        });


        if( juegosjugados.length > 0){
            toast.warning ('Este partido ya fue jugado en la ' + juegosjugados[0].jornada)
            return
        }


        
        let data = {
            torneo,            
            jornada: journey,
            fecha : fecha + ' 00:00:00',
            hora,
            minuto,
            equipoA,
            equipoB,
            golesA,
            golesB,
            status: 'Abierto'   
        }

        
        dispatch(addJuego(data))   
        setshowMyModalJuego(false)
    }



    const eliminarJuego = () => {                


        if(goles.filter(x => x.juegoId == idJuego).length > 0){
            toast.warning('Para eliminar el juego, necesitas  borrar los goles')
            return
        }

        setMyConfirmation(true)
    }

    const eliminarRegistroJuego = () => {        

        dispatch(deleteJuego(idJuego))
        setMyConfirmation(false)
        setIdJuego('')  
        setIdTeamA('')
        setIdTeamB('')
    }



    
    const estidisticas = (juego, jor) =>{

        setNombreJornada(jor.nombre)

        setIdJuego(juego.id)
        setStatusJuego(juego.status)
        setIdTeamA(juego.equipoA)
        setIdTeamB(juego.equipoB)

        let cad = ''

        cad = '' + equipos.filter(x=>x.id== juego.equipoA)[0].nombre 
        setNombreTeamA(cad)

        cad = '' + equipos.filter(x=>x.id== juego.equipoB)[0].nombre 
        setNombreTeamB(cad)     
        
    }


    //Goles
    const guardarGoles =(tipo)=>{

        if (tipo =='A'){
            if (jugadorA == '' ) {
                alert('No ha indicado el jugador')
                return
            }

            //if (golA == 0 && amarillaA == 0 && rojaA == 0 ) {
            //    alert('al menos debe de registrar goles o tarjetas')
            //    return
            //}

            if (goles.filter(x => x.juego == idJuego && x.equipo == idTeamA && x.jugador == jugadorA).length > 0){
                toast.warning('Ese jugador ya fue registrado anteriormente en este partido')
                return
            }

            let data = {
                torneo,
                juego: idJuego,            
                equipo: idTeamA,
                jugador: jugadorA,
                goles: golA,
                tarjetas_amarillas: amarillaA,
                tarjeta_roja: rojaA            
            }            
            dispatch(addGol(data))   

            setJugadorA('')
            setGolA(0)
            setAmarillaA(0)
            setRojaA(0)
        }


        if (tipo =='B'){
            if (jugadorB == '' ) {
                toast.warning('No ha indicado el jugador')
                return
            }

//            if (golB == 0 && amarillaB == 0 && rojaB == 0 ) {
//                alert('al menos debe de registrar goles o tarjetas')
//                return
//            }

            if (goles.filter(x => x.juego == idJuego && x.equipo == idTeamA && x.jugador == jugadorB).length > 0){
                toast.warning('Ese jugador ya fue registrado anteriormente en este partido')
                return
            }



            let dataB = {
                torneo,
                juego: idJuego,            
                equipo: idTeamB,
                jugador: jugadorB,
                goles: golB,
                tarjetas_amarillas: amarillaB,
                tarjeta_roja: rojaB            
            }            
            dispatch(addGol(dataB))   

            setJugadorB('')
            setGolB(0)
            setAmarillaB(0)
            setRojaB(0)
        }


        
        
        
        
    }

    const eliminarGol = (id) => {
        dispatch(deleteGol(id))
    }


    const finalizarJuego = () => {        
        setMyConfirmationCloseJuego(true)
    }


    const reabrirJuego = () => {        
        setMyConfirmationOpenJuego(true)
    }


    const cerrarJuego = () => {        

        let xGolesA = 0
        let xGolesB = 0
        
        let registros = goles.filter(x => x.juegoId == idJuego)

        registros.forEach(element => {
            
            if (element.equipoId == idTeamA)
                xGolesA = xGolesA + element.goles

            if (element.equipoId == idTeamB)
                xGolesB = xGolesB + element.goles
        });


            
        let data = {        
            golesA: xGolesA,
            golesB: xGolesB,
            status: 'Finalizado'   
        }

        
        dispatch( editJuego(data,idJuego))   
        
        setStatusJuego('Finalizado')
        setMyConfirmationCloseJuego(false)

    }

    const abrirJuego = () => {        

        let xGolesA = 0
        let xGolesB = 0
            
        let data = {        
            golesA: xGolesA,
            golesB: xGolesB,
            status: 'Abierto'   
        }
        
        dispatch( editJuego(data,idJuego))   
        
        setStatusJuego('Abierto')
        setMyConfirmationOpenJuego(false)

    }


    const sumagoles = (arreglo) => {

        let suma = 0


        arreglo.forEach(element => {
            suma = suma + element.goles 
        });
        
        

        
        return suma

    }


    const altaJugador = (equipo) => {        
        setEquipoAlta(equipo)
        setshowMyModalAddPlayer(true)
    }

    

    const guardarAltaJugador = () => {
        let data = {
            nombre : nombreAlta,
            status: 'Alta', 
            torneo,
            equipo: equipoAlta           
        }

        
        dispatch(addJugador(data))
        setNombreAlta('')
        setshowMyModalAddPlayer(false)

    }


    const listatorneos = (
        <>
        <h5>Mis Torneos </h5>
    
        <table>
            <thead>
                <th width="10%"></th>
                <th width="20%">Nombre del torneo</th>
                <th width="20%">Lugar donde se juega</th>
                <th width="10%">Ver</th>                
                <th width="10%">status</th>
                
            </thead>     
            <tbody>
                {
                    torneos
                    .map(torneo=>(
                        <tr key={torneo.id}>
                            <td> <img src={"http://localhost:8090/api/resources/" + torneo.imagen}  alt="imagen" width="100px" height="100px"/> </td>
                            <td>{torneo.nombre}</td>
                            <td>{torneo.localidad}</td>                            
                            <td>
                                <button  onClick={() => {setTorneo(torneo.id); setNombreTorneo(torneo.nombre)}} className="btn btn-outline-success" >
                                    Jornadas
                                </button>           
                            </td>
                            <td>{torneo.status}</td>
                        </tr>
                    ))
                }
                            
            </tbody>
        </table>
    
        </>
    )
         


    const listaJornadas = (
        <>        
            <h5>{ nombreTorneo }</h5>
            
            <button  onClick={() => {setTorneo(''); setNombreTorneo('')}} className="btn btn-outline-success" >
                regresar
            </button> 


            {
                jornadas.filter(x=>x.torneoId == torneo && x.status == 'Abierta').length == 0
                ?(
                    <>
                         

                        <button
                            type="button"
                            className="btn btn-outline-success"                          
                            onClick={ () => { newJornada() } }
                            >
                            + Nueva Jornada
                        </button>

                    </>
                )
                :null
            }

            
            <ul>
                {
                    jornadas
                    .filter(x => x.torneoId == torneo)
                    .map(
                        jornada => (
                            <li key={jornada.id} className="top-jornada">
                                {jornada.nombre} ({jornada.status})
                                <br/> Del {jornada.inicia.substring(8,10)}/{jornada.inicia.substring(5,7)}/{jornada.inicia.substring(0,4)} 
                                 { jornada.inicia == jornada.termina
                                    ? null 
                                    : (<> <br/> Al   {jornada.termina.substring(8,10)}/{jornada.termina.substring(5,7)}/{jornada.termina.substring(0,4)} </>)
                                   
                                 }
                                <table>
                                    <thead>
                                    <th width="10%">Fecha</th>
                                    <th width="5%"></th>
                                    <th width="5%">Hora</th>
                                    <th width="5%"></th>
                                    <th width="20%">Equipo A</th>
                                    <th width="6%">Goles</th>
                                    <th width="3%"></th>
                                    <th width="6%">Goles</th>                                                                        
                                    <th width="20%">Equipo B</th>                                    
                                    <th>  </th>
                                    <th width="10%">Status</th>                                    
                                                                        
                                    
                                    </thead>

                                    <tr>
                                    </tr>
                                    {
                                        juegos
                                        .filter(x=> x.torneoId == torneo && x.jornadaId == jornada.id)
                                        .map(juego => (
                                            <tr key={juego.id}  >
                                                <td>{juego.fecha.substring(0,10)}</td>
                                                <td> </td>
                                                <td>{juego.hora} : {juego.minuto}</td>
                                                <td> </td>
                                                <td>{ equipos.filter(x=> x.id == juego.equipoA)[0].nombre }</td>
                                                <td>{juego.golesA}</td>
                                                <td></td>
                                                <td>{juego.golesB}</td>
                                                <td>{ equipos.filter(x=> x.id == juego.equipoB)[0].nombre }</td>                                                
                                                <td>
                                                    <button  onClick={() =>  {  estidisticas (juego, jornada)  }  } className="btn btn-outline-success" >
                                                        ...Goles
                                                    </button>                                                                                    
                                                </td>
                                                <td>{juego.status}</td>
                                          
                                            </tr>
                                        ))
                                    }
                                </table>
                                

                                <div className="row top-3rem">
                                <div className="col-4">


                                    {
                                        jornadas.filter(x=>x.id == jornada.id)[0].status == 'Abierta'
                                        ?(
                                            <>

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-success"                          
                                                    onClick={ () => { newJuego(jornada.id) } }
                                                    >
                                                    + Nuevo Juego
                                                </button>

                                            </>
                                        )
                                        :null
                                    }

                                    
                                </div>
                                <div className="col-4">
                                    
                                    
                                    {
                                        juegos.filter(x=> x.torneoId == torneo && x.jornadaId == jornada.id).length > 0  
                                        && juegos.filter(x=> x.torneoId == torneo && x.jornadaId == jornada.id && x.status == 'Abierto').length == 0 
                                        && jornadas.filter(x=>x.id == jornada.id)[0].status == 'Abierta'
                                        ?(
                                            <>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary"                                                    
                                                    onClick={ () => { preCierreJornada(jornada.id) } }
                                                    >
                                                    Cerrar Jornada
                                                </button>
                                            </>
                                        )
                                        :null
                                    }
                                    
                                    
                                </div>
                                <div className="col-4">
                                    {
                                        juegos.filter(x=> x.torneoId == torneo && x.jornadaId == jornada.id).length == 0                                          
                                        ?(
                                            <>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"                                                    
                                                    onClick={ () => { eliminarJornada(jornada.id) } }
                                                    >
                                                    Eliminar Jornada
                                                </button>
                                            </>
                                        )
                                        :null
                                    }
                                </div>
                                
                            </div>
                                
                            </li>
                        )
                    )
                }
            </ul>





           
            


           


        </>

    )


    const detalles = (
        <>
            
            <h5>{ nombreTorneo }</h5>
            <h3>{ nombreJornada }</h3>
                
            <button  onClick={() => {setIdJuego('');  setIdTeamA('');  setIdTeamB('')}} className="btn btn-outline-success" >
                regresar
            </button> 


            {
                    statusJuego == 'Finalizado'
                        ? (<>
                                <button  onClick={() => reabrirJuego()} className="btn btn-outline-success" >
                                    RE-ABRIR Partido
                                </button>                                                                        

                            </>
                        )
                        : (
                            <>
                                <button  onClick={() => eliminarJuego()} className="btn btn-outline-danger" >
                                    Eliminar Juego
                                </button>                                                                        
                                <button  onClick={() => finalizarJuego()} className="btn btn-outline-success" >
                                    Finalizar Partido
                                </button>                                                                        
                            </>

                        )
                }

            <br/>

            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <h3>{nombreTeamA}</h3>
                        <h4> 
                            { sumagoles (goles.filter(x => x.juegoId == idJuego && x.equipoId == idTeamA))}                        
                        </h4>

                        
                        
                        <table>
                            <thead>                
                                <th width="5%"> </th>
                                <th width="20%">Jugador</th>
                                <th width="10%">Goles</th>                
                                <th width="10%">T-Amarillas</th>
                                <th width="10%">T-Roja</th>
                                <th width="10%"> </th>                
                            </thead>     
                            <tbody>

                            {
                                statusJuego == 'Finalizado'
                                    ? null
                                    : (

                                        <tr>
                                            <td>

                                               {   
                                                statusJuego == 'Finalizado'
                                                    ? null
                                                    : 
                                                        <button  onClick={() => altaJugador(idTeamA)} className="btn btn-outline-success" >
                                                            + 
                                                        </button>                                                                        
                                                }
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-control"
                                                    name="jugadorA"
                                                    value={jugadorA}
                                                    onChange={ e=> setJugadorA (e.target.value) } >
                                                    <option value="null">Jugador</option>                                
                                                    { jugadores
                                                        .filter(x => x.equipoId == idTeamA )                                                
                                                        .map( (x, ndx) => (
                                                        <option key={ndx} value={x.id}>
                                                            {x.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-control"
                                                    name="golA"
                                                    value={golA}
                                                    onChange={ e=> setGolA (e.target.value) } >
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>

                                                </select>
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-control"
                                                    name="amarillaA"
                                                    value={amarillaA}
                                                    onChange={ e=> setAmarillaA (e.target.value) } >
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>                                                                        
                                                </select>                                    

                                            </td>
                                            <td>
                                                <select 
                                                    className="form-control"
                                                    name="rojaA"
                                                    value={rojaA}
                                                    onChange={ e=> setRojaA (e.target.value) } >
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>                                        
                                                </select>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-outline-primary" onClick={ () => { guardarGoles('A') }}>agregar</button>
                                            </td>
                                            
                                        </tr>

                                    )
                            }

                            



                                {
                                    goles
                                    .filter(x => x.juegoId == idJuego && x.equipoId == idTeamA)
                                    .map( (gol, ndx)=>(
                                        <tr key={gol.id}>                            
                                            <td>

                                                {
                                                    statusJuego == 'Finalizado'
                                                        ? null
                                                        : (
                                                            <button  onClick={() => eliminarGol(gol.id)} className="btn btn-outline-danger" >
                                                                <span className="fa fa-trash" aria-hidden="true"></span>
                                                            </button>
                                                        )
                                                }


                                                                                    
                                            </td>
                                            <td> { jugadores.filter(x => x.id == gol.jugadorId)[0].nombre }  </td>
                                            <td> { gol.goles }</td>                            
                                            <td> { gol.tarjetas_amarillas }</td>                            
                                            <td> { gol.tarjeta_roja }</td>                            
                                            <td></td>
                                           
                                        </tr>
                                    ))
                                }


                                
                                            
                            </tbody>
                        </table>
                        

                    
                    </div>

                    

                    <div className="col-6">
                        <h3>{nombreTeamB}</h3>
                        <h4> 
                            { sumagoles (goles.filter(x => x.juegoId == idJuego && x.equipoId == idTeamB))}                        
                        </h4>
                        
                        

                                                                                     
                        <table>
                            <thead>                
                                <th width="5%"> </th>
                                <th width="20%">Jugador</th>
                                <th width="10%">Goles</th>                
                                <th width="10%">T-Amarillas</th>
                                <th width="10%">T-Roja</th>
                                <th width="10%"> </th>                
                            </thead>     
                            <tbody>

                            {
                                statusJuego == 'Finalizado'
                                    ? null
                                    : (

                                        <tr>
                                            <td>
                                                {   
                                                    statusJuego == 'Finalizado'
                                                        ? null
                                                        : 
                                                            <button  onClick={() => altaJugador(idTeamB)} className="btn btn-outline-success" >
                                                                +
                                                            </button>           
                                                }
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-control"
                                                    name="jugadorB"
                                                    value={jugadorB}
                                                    onChange={ e=> setJugadorB (e.target.value) } >
                                                    <option value="null">Jugador</option>                                
                                                    { jugadores  
                                                        .filter(x => x.equipoId == idTeamB )                                              
                                                        .map( (x, ndx) => (
                                                        <option key={ndx} value={x.id}>
                                                            {x.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-control"
                                                    name="golB"
                                                    value={golB}
                                                    onChange={ e=> setGolB (e.target.value) } >
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>

                                                </select>
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-control"
                                                    name="amarillaB"
                                                    value={amarillaB}
                                                    onChange={ e=> setAmarillaB (e.target.value) } >
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>                                                                        
                                                </select>                                    

                                            </td>
                                            <td>
                                                <select 
                                                    className="form-control"
                                                    name="rojaB"
                                                    value={rojaB}
                                                    onChange={ e=> setRojaB (e.target.value) } >
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>                                        
                                                </select>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-outline-success" onClick={ () => { guardarGoles('B') }}>agregar</button>
                                            </td>
                                            
                                        </tr>
                                    )
                            }

                            



                                {
                                    goles
                                    .filter(x => x.juegoId == idJuego && x.equipoId == idTeamB)
                                    .map( (gol, ndx)=>(
                                        <tr key={ndx}>                            
                                            <td>
                                                {
                                                    statusJuego == 'Finalizado'
                                                    ? null
                                                    : (
                                                        <button  onClick={() => eliminarGol(gol.id)} className="btn btn-outline-danger" >
                                                            <span className="fa fa-trash" aria-hidden="true"></span>
                                                        </button>                                    
                                                    )
                                                }
                                            </td>
                                            <td> { jugadores.filter(x => x.id == gol.jugadorId)[0].nombre }  </td>
                                            <td> { gol.goles }</td>                            
                                            <td> { gol.tarjetas_amarillas }</td>                            
                                            <td> { gol.tarjeta_roja }</td>                            
                                            <td></td>
                                        </tr>
                                    ))
                                }


                            
                                            
                            </tbody>
                        </table>
                  



                    </div>
                </div>


                

                
            </div>

        


            




           

    



        </>
    )


    const MyModal = (
        <>
            <Modal show={showMyModal} onHide={closeModal} size='lg'>
                <Modal.Header closeButton>
                <Modal.Title>Nueva Jornada </Modal.Title>
                </Modal.Header> 
        
                <Modal.Body>            
                
      
      
                    <InputGroup className="mb-2">
                        <InputGroup.Text>Inicia</InputGroup.Text>
                        
                        <input className="form-control"
                                    type="date"                                     
                                    name="inicia"
                                    value={inicia}
                                    min="2020-01-01" 
                                    max="2025-12-31" 
                                    onChange = { e => setInicia(e.target.value)  }                                    
                                    />      
                    </InputGroup>
      
                    <InputGroup className="mb-2">
                        <InputGroup.Text>Termina</InputGroup.Text>
                        <input className="form-control"
                                    type="date"                                     
                                    name="termina"
                                    value={termina}
                                    min="2020-01-01" 
                                    max="2025-12-31" 
                                    onChange = { e => setTermina(e.target.value)  }                                    
                                    />
                    </InputGroup>
      
                    <InputGroup className="mb-2">
                        <InputGroup.Text>aviso</InputGroup.Text>
                        <Form.Control 
                          name="aviso"
                          onChange= { e => setAviso(e.target.value) }                            
                          value= { aviso }
                            />
                    </InputGroup>
      
      
                </Modal.Body>
            
                <Modal.Footer>
                    <Container>
                        <Row>           
                            <Col xs={8}></Col>                               
      
                            <Col xs={2}>                        
                                <Button inverted color="green" onClick={guardar}>
                                    Guardar
                                </Button>                        
                            </Col>
                            <Col xs={2}>
                                <Button  onClick={closeModal}>
                                    Cancelar
                                </Button>
                            </Col>
                            
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </>
    )
      
    const MyModalJuego = (
        <>
            <Modal show={showMyModalJuego} onHide={closeModalJuego} size='lg'>
                <Modal.Header closeButton>
                <Modal.Title>Nuevo Juego </Modal.Title>
                </Modal.Header> 
        
                <Modal.Body>            
                
       
                    <InputGroup className="mb-2">
                        <InputGroup.Text>Fecha</InputGroup.Text>
                        <input className="form-control"
                                        type="date"                                     
                                        name="fecha"
                                        value={fecha}
                                        min="2020-01-01" 
                                        max="2025-12-31" 
                                        onChange = { e => setFecha(e.target.value)  }                                    
                                    />
                    </InputGroup>
       
                    <InputGroup className="mb-2">
                        <InputGroup.Text>Hora</InputGroup.Text>
                            <select 
                                className="form-control"
                                name="hora"
                                value={hora}
                                onChange={ e=> setHora (e.target.value) }  >                                       
                                <option value=''>--</option>
                                {listaHoras.map((x, ndx) => (
                                <option key={x.ndx} value={x.hora}>
                                    {x.hora}
                                </option>
                                ))}
                            </select>
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <InputGroup.Text>Minuto</InputGroup.Text>
                        <select 
                            className="form-control"
                            name="minuto"
                            value={minuto}
                            onChange={ e=> setMinuto (e.target.value) } >
                                <option value=''>--</option>                                        
                                {listaMinutos.map((x, ndx) => (
                                <option key={x.ndx} value={x.min}>
                                    {x.min}
                                </option>
                            ))}
                            </select>
                    </InputGroup>


                    <InputGroup className="mb-2">
                        <InputGroup.Text>Equipo Local</InputGroup.Text>
                            <select 
                                    className="form-control"
                                    name="equipoA"
                                    value={equipoA}
                                    onChange={ e=> setEquipoA (e.target.value) } >
                                    <option value="">Seleccione...</option>                                
                                    {equipos
                                        .filter ( x => x.torneoId == torneo)                                            
                                        .map((x) => (
                                    <option key={x.id} value={x.id}>
                                        {x.nombre}
                                    </option>
                                ))}
                            </select>
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <InputGroup.Text>Equipo Visitante</InputGroup.Text>
                            <select 
                                        className="form-control"
                                        name="equipoB"
                                        value={equipoB}
                                        onChange={ e=> setEquipoB (e.target.value) } >
                                        <option value="">Seleccione...</option>                                
                                        {equipos
                                            .filter ( x => x.torneoId == torneo)
                                            .map((x) => (
                                        <option key={x.id} value={x.id}>
                                            {x.nombre}
                                        </option>
                                    ))}
                            </select>
                    </InputGroup>


       
              
      
                </Modal.Body>
            
                <Modal.Footer>
                    <Container>
                        <Row>           
                            <Col xs={8}></Col>                               
      
                            <Col xs={2}>                        
                                <Button inverted color="green" onClick={guardarJuego}>
                                    Guardar
                                </Button>                        
                            </Col>
                            <Col xs={2}>
                                <Button  onClick={closeModalJuego}>
                                    Cancelar
                                </Button>
                            </Col>
                            
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </>
    )


    const MyModalConfirmation = (
        <>
            <Modal show={MyConfirmation} onHide={closeMyConfirmation} size='ls'>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar registro</Modal.Title>                                          
                </Modal.Header>         

                <Modal.Body>                
                    <p> ¿Esta seguro de eliminar el juego?</p>
                </Modal.Body>
            
                <Modal.Footer>
                    <Container>
                        <Row>           
                            <Col xs={8}></Col>                               
    
                            <Col xs={2}>                        
                                <Button variant='danger' onClick={eliminarRegistroJuego}>
                                    Eliminar
                                </Button>                        
                            </Col>
                            <Col xs={2}>
                                <Button  variant='secondary' onClick={closeMyConfirmation}>
                                    Regresar
                                </Button>
                            </Col>
                            
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>

        </>
    )


    const MyModalAddPlayer = (
        <>
            <Modal show={showMyModalAddPlayer} onHide={closeModalAddPlayer} size='lg'>
                <Modal.Header closeButton>
                <Modal.Title>Registrar Jugador </Modal.Title>
                </Modal.Header> 
        
                <Modal.Body>            
                
       
                    <InputGroup className="mb-2">
                        <InputGroup.Text>Fecha</InputGroup.Text>
                        <input 
                            type="text"
                            placeholder="Nombre completo"
                            name="nombreAlta"
                            value={nombreAlta}
                            onChange={ e => setNombreAlta (e.target.value)}
                        />   
                    </InputGroup>
       
                 
              
      
                </Modal.Body>
            
                <Modal.Footer>
                    <Container>
                        <Row>           
                            <Col xs={8}></Col>                               
      
                            <Col xs={2}>                        
                                <Button inverted color="green" onClick={guardarAltaJugador}>
                                    Guardar
                                </Button>                        
                            </Col>
                            <Col xs={2}>
                                <Button  onClick={closeModalAddPlayer}>
                                    Cancelar
                                </Button>
                            </Col>
                            
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </>
    )



    const MyModalCloseJuego = (
        <>
            <Modal show={MyConfirmationCloseJuego} onHide={closeMyConfirmationCloseJuego} size='lg'>
                <Modal.Header closeButton>
                <Modal.Title>Finalizar Partido </Modal.Title>
                </Modal.Header> 
        
                <Modal.Body>      
                    <p> Una vez finalizado el juego ya no se podrá editar el juego y los goles; ¿Esta seguro de cerrar el juego?</p>
                </Modal.Body>
            
                <Modal.Footer>
                    <Container>
                        <Row>           
                            <Col xs={8}></Col>                               
      
                            <Col xs={2}>                        
                                <Button inverted color="green" onClick={cerrarJuego}>
                                    Si, Finalizarlo...
                                </Button>                        
                            </Col>
                            <Col xs={2}>
                                <Button  onClick={closeMyConfirmationCloseJuego}>
                                    Cancelar
                                </Button>
                            </Col>
                            
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </>
    )

    const MyModalOpenJuego = (
        <>
            <Modal show={MyConfirmationOpenJuego} onHide={closeMyConfirmationOpenJuego} size='lg'>
                <Modal.Header closeButton>
                <Modal.Title>Reabrir Partido </Modal.Title>
                </Modal.Header> 
        
                <Modal.Body>      
                    <p>   ¿Deseas reabrir el juego para editarlo?</p>
                </Modal.Body>
            
                <Modal.Footer>
                    <Container>
                        <Row>           
                            <Col xs={8}></Col>                               
      
                            <Col xs={2}>                        
                                <Button inverted color="green" onClick={abrirJuego}>
                                    Si, Abrirlo...
                                </Button>                        
                            </Col>
                            <Col xs={2}>
                                <Button  onClick={closeMyConfirmationOpenJuego}>
                                    Cancelar
                                </Button>
                            </Col>
                            
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </>
    )



    const MyModalCloseJornada = (
        <>
            <Modal show={MyConfirmationCloseJornada} onHide={closeMyConfirmationCloseJornada} size='lg'>
                <Modal.Header closeButton>
                <Modal.Title>Cerrar Jornada</Modal.Title>
                </Modal.Header> 
        
                <Modal.Body>      
                    <p>
                        ¿Esta seguro de cerrar la jornada?
                    </p>
                </Modal.Body>
            
                <Modal.Footer>
                    <Container>
                        <Row>           
                            <Col xs={8}></Col>                               
      
                            <Col xs={2}>                        
                                <Button inverted color="green" onClick={cerrarJornada}>
                                    Si, Cerrar la jornada...
                                </Button>                        
                            </Col>
                            <Col xs={2}>
                                <Button  onClick={closeMyConfirmationCloseJornada}>
                                    Cancelar
                                </Button>
                            </Col>
                            
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </>
    )












    return (
        <>
            {
                torneo == ''
                    ? listatorneos
                    : idJuego == ''
                        ? listaJornadas
                        : detalles
            }

            {MyModal}
            {MyModalJuego}
            {MyModalAddPlayer}
            {MyModalConfirmation}

            {MyModalCloseJuego}
            {MyModalOpenJuego}
            {MyModalCloseJornada}
        </>
    )
}

export default Juegos
