import React, {useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getTorneos} from '../../actions/TorneoActions'
import {getJornadas} from '../../actions/JornadaActions'
import { addJuego, getJuegos } from '../../actions/JuegosActions'
import { getEquipos } from '../../actions/EquipoActions'


let teams = []
let partidos = []


const Rol = () => {

    //useState

    //torneo
    const [nombreTorneo, setNombreTorneo] = useState('')
    const [torneo, setTorneo] = useState('')

    const [matchs, setMatchs] = useState([])    
    const [newRol, setNewRol] = useState([])    
    const [descansos, setDescansos] = useState([])    
    const [mode, setMode] = useState('new')

    
    //segunda vuelta
    const [posiblesPartidos, setPosiblesPartidos] = useState([])   

    const [fecha, setFecha] = useState('')
    const [hora, setHora] = useState('')
    const [minuto, setMinuto] = useState('')
    const [listaHoras, setListaHoras] = useState([        
        {hora: '07'}, {hora: '08'}, {hora: '09'}, {hora: '10'}, {hora: '11'}, {hora: '12'},
        {hora: '13'}, {hora: '14'}, {hora: '15'}, {hora: '16'}, {hora: '17'}, {hora: '18'},
        {hora: '19'}, {hora: '20'}, {hora: '21'}, {hora: '22'}, {hora: '23'}        
    ])

    const [listaMinutos, setListaMinutos] = useState([
        {min: '00'}, {min: '10'}, {min: '20'}, {min: '30'}, {min: '40'},{min: '50'}        
    ])

    const [newGame, setNewGame] = useState({})
    const [newJornada, setNewJornada] = useState([])
    

    //use selectors
    const auth = useSelector(state => state.auth)    
    const torneos = useSelector(state => state.torneos.lista)
    const jornadas = useSelector(state => state.jornadas.lista)
    const juegos = useSelector(state => state.juegos.lista)
    const equipos = useSelector(state => state.equipos.lista)
    
    //use dispatch
    const dispatch = useDispatch()

    //useEfect
    useEffect(() => {

        dispatch(getTorneos())
        dispatch(getJornadas())
        dispatch(getJuegos())
        dispatch(getEquipos())
        
        
        

    }, [])

    
    

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
                                <button  onClick={() => {setTorneo(torneo.id); setNombreTorneo(torneo.nombre); setNewRol([]); setDescansos([]);}} className="btn btn-outline-success" >
                                    Generar Nuevo Rol
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


    



    const start = (typ) =>{

        
        setNewRol([])

        
        let ids = equipos
            .filter(x =>  x.torneoId == torneo && x.status == 'alta')  
            .map(x=> x.id)        
        let nuevos = []
        let excluidos = []
  

      
        cargarJuegosJugados()


        let equiposTorneo  = equipos.filter (x => x.torneoId == torneo && x.status == 'alta')

       
  
  
        for(let i=0; i < equiposTorneo.length; i++){

          let ix = i
          
          if (typ == 'desc')          
            ix =  equiposTorneo.length -1 - i
  
          let jugados = getJuegosJugados(equiposTorneo[ix].id, matchs, nuevos )
          let pendientes= getPendientes( ids, jugados )         
        
          let excluir = excluidos.find(elemento => elemento == equiposTorneo[ix].id) 
          
          if (pendientes.length > 0 && excluir == undefined){          
  
  
            let j = Math.floor(Math.random() * pendientes.length)
  
            nuevos.push({
                equipoA: equiposTorneo[ix].id, 
                equipoB: pendientes[j],
                nombreA: equiposTorneo.filter(z => z.id === equiposTorneo[ix].id)[0].nombre, 
                nombreB: equiposTorneo.filter(z => z.id === pendientes[j])[0].nombre
            })
            
            excluidos.push(pendientes[j])
            
          }
        }
  
        setNewRol(nuevos)
        

        let descansos =  getDescansos(ids,nuevos)
        
        setDescansos(descansos)
    }


    const cargarJuegosJugados = () =>{
        let arr = []


        let JuegosTorneo = juegos.filter(x=> x.torneoId == torneo)

        JuegosTorneo.forEach(item => {
    
         let eqA =  equipos.filter(z => z.id === item.equipoA)
         let eqB =  equipos.filter(z => z.id === item.equipoB)
    
         arr.push({...item, nombreA: eqA[0].nombre, nombreB: eqB[0].nombre})
        })
    
        setMatchs(arr)     
    }
  

    const getJuegosJugados = (equipo, partidosjugados, rol) =>{
        let arreglo = []
  
        arreglo.push(equipo)
  
        partidosjugados.forEach(item =>{
          if (item.equipoA == equipo)
            arreglo.push(item.equipoB)
          
          if (item.equipoB == equipo)
            arreglo.push(item.equipoA)          
  
        })
  
        rol.forEach(item =>{
          arreglo.push(item.equipoA)
          arreglo.push(item.equipoB)
        })
  
        return arreglo
  
    }
  
    const getPendientes = (listaEquipos, listaJugados) =>{
      let arreglo = []
      listaEquipos.forEach(id => {
    
        let yasejugo = listaJugados.find(elemento => elemento == id) 
  
        if ( yasejugo  == undefined)      
          arreglo.push(id)
         
      })
  
      return arreglo
  
    }


    const getDescansos = (listaEquipos, rol) => {
        let arreglo = []
        
        listaEquipos.forEach(id => {

            let juegaLocal = rol.find(elemento => elemento.equipoA == id) 
            let juegaVisitante = rol.find(elemento => elemento.equipoB == id) 

            if ( juegaLocal  == undefined && juegaVisitante == undefined)      
                arreglo.push({id: id, nombre: equipos.filter(x=> x.id == id)[0].nombre})
        });

        return arreglo


    }
  

    const enrolar = (item) => {

        let game = {
                equipoA: item.equipoA,
                equipoB: item.equipoB,
                nombreA: item.nombreA, 
                nombreB: item.nombreB            
        }

        setNewGame(game)

    }
        

    const addGame = () =>{

        if (fecha == ''){
            alert('No ha indicado la fecha del juego')
            return
        }

        if (hora == '' || minuto == ''){
            alert('No ha indicado la hora y minuto del juego')
            return
        }


            let juego = {
                fecha,
                hora,
                minuto,                            
                equipoA: newGame.equipoA,
                equipoB: newGame.equipoB,
                nombreA: newGame.nombreA, 
                nombreB: newGame.nombreB
            }


            let arr =  newJornada

            arr.push(juego)

            arr.sort((a,b) => a.hora - b.hora)

            setNewJornada(arr)            
            setHora('')
            setMinuto('')            

            arr = newRol.filter(x=> x.equipoA != newGame.equipoA)

            setNewRol(arr)
            setNewGame({})

            $('#MyModalJuego').modal('hide')

    }


    const removeGame =(item)=>{
     
        let arr = newRol
        
        arr.push({
            equipoA: item.equipoA, 
            equipoB: item.equipoB,
            nombreA: item.nombreA, 
            nombreB: item.nombreB
        })

        setNewRol(arr)

        arr = newJornada.filter(x=> x.equipoA != item.equipoA)
        setNewJornada(arr)


    }


    const crearNuevaJornada = () => {
        
        if (newJornada.length == 0){
            alert('No hay configurado partidos para esta jornada')
            return
        }

        

        let listaJornadas = jornadas.filter(x => x.status == 'Abierta' && x.torneo == torneo)

        if (listaJornadas.length == 0){
            alert('la jornada ya no esta abierta')
            return
        }






        newJornada.forEach(element => {


            let data = {
                torneo,            
                jornada: listaJornadas[0].id,
                fecha : element.fecha + ' 00:00:00',
                hora:   element.hora,
                minuto: element.minuto,
                equipoA: element.equipoA,
                equipoB: element.equipoB,
                golesA: 0,
                golesB: 0,
                status: 'Abierto'   
            }
    
            
            dispatch(addJuego(data))   
            
        });

        setMode('enviados')

        alert('los juegos fueron generados satisfactoriamente')

    }



    const nuevoRol = (
        <>        
            <h5>{ nombreTorneo }</h5>
            
            <button  onClick={() => {setTorneo(''); setNombreTorneo('')}} className="btn btn-outline-success" >
                regresar
            </button> 

            {
                newJornada.length == 0
                ? null
                : (
                    <button  onClick={() => {crearNuevaJornada()}} className="btn btn-outline-primary" >
                        Trasladar Juegos
                    </button> 
                ) 
                    

            }     


            { 
                jornadas.filter(x => x.status == 'Abierta' && x.torneo == torneo).length == 1 
                && juegos.filter(y => y.torneo == torneo && y.jornada == jornadas.filter(x => x.status == 'Abierta' && x.torneo == torneo)[0].id) == 0
                ? (
                    <div>                  
        
                        <div className="container">
                            <div className="row">
                                <div className="col-4">
            
                                    {
                                        newJornada.length == 0
                                        ? (
                                            <div>
                                                <button  onClick={() => start('asc')} className="btn btn-outline-success" >
                                                    <span className="fas fa-angle-double-down" aria-hidden="true"></span>
                                                </button>                                    
            
                                                <button  onClick={() => start('desc')} className="btn btn-outline-success" >
                                                    <span className="fas fa-angle-double-up" aria-hidden="true"></span>
                                                </button>                                                                        
                                                
                                            </div>
                                        ) 
                                        : null
            
                                    }     
            
            
                                    <br />                                    
                                    {
                                        newRol.map ((item, ndx) => (
                                            <div key={item.id}>
            
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-success"
                                                    data-toggle="modal"
                                                    data-target="#MyModalJuego"
                                                    onClick={ () => { enrolar(item) } }
                                                    >
                                                    <span className="fas fa-angle-double-right" aria-hidden="true"></span>
                                                    
                                                </button>                                    
            
                                                {ndx} - {item.nombreA} vs {item.nombreB}   
                                                    
                                            </div>
                                        ))
                                    }
            
                                    <br />
                                    Descansan:
                                    {
                                        descansos.map ((item, ndx) => (
                                            <div key={item.id}>
                                                {ndx} - {item.nombre}
                                            </div>
                                        ))
                                    }
            
                                </div>            
            
                                
            
                                <div className="col-6">
            
                                Partidos: 
            
            
            
                                <table>
                                    <thead>
                                        <th width="10%"></th>
                                        <th width="20%">Fecha</th>
                                        <th width="20%">Hora</th>
                                        <th width="30%">Equipo Local</th>                
                                        <th width="30%">Equipo Visitante</th>
                                        
                                    </thead>     
                                    <tbody>
                                        {
                                            newJornada                                
                                            .map(item=>(
                                                <tr key={item.equipoA}>
                                                    <td> 
                                                        <button  onClick={() => removeGame(item)} className="btn btn-outline-success" >
                                                            <span className="fas fa-angle-double-left" aria-hidden="true"></span>
                                                        </button>      
                                                    </td>
                                                    <td>{item.fecha}</td>
                                                    <td>{item.hora} : {item.minuto} </td>
                                                    <td>{item.nombreA}</td>
                                                    <td>{item.nombreB}</td>
                                                </tr>
                                            ))
                                        }
                                                    
                                    </tbody>
                                </table>
                            
            
                                </div>            
                            </div>       

                            <div className="row">
                                <div className="col-6">
                                    <h3>Segunda ronda</h3>
                                </div>
                            </div>     
                        </div>            
        
        
                    </div>
                )
                : (
                    <div>
                        {
                            mode == 'new'
                            ? (<h3>Para generar un rol automatico es necesario tener una jornada abierta y sin juegos.</h3>)
                            : (<h3>Los juegos ya fueron trasladados a la jornada abierta, puede ir a verificarlo en la opci&oacute;n de Juegos</h3>)
                        }
                        
                    </div>
                )


            
            }

           




            <div className="modal fade" id="MyModalJuego" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
        
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Nuevo Juego</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    
                        <form>                 

                            <div>
                                <h3>{newGame.nombreA} vs {newGame.nombreB}</h3>                                
                            </div>         

                            <div className="col-sm form-group">
                                <label for="fecha">Fecha</label>
                                <input className="form-control"
                                    type="date"                                     
                                    name="fecha"
                                    value={fecha}
                                    min="2021-01-01" 
                                    max="2025-12-31" 
                                    onChange = { e => setFecha(e.target.value)  }                                    
                                />
                            </div>
                            <div className="col-sm form-group">
                                <label>Hora </label>
                                <select 
                                    className="form-control"
                                    name="hora"
                                    value={hora}
                                    onChange={ e=> setHora (e.target.value) } >                                       
                                    <option value=''>--</option>
                                    {listaHoras.map((x, ndx) => (
                                    <option key={x.ndx} value={x.hora}>
                                        {x.hora}
                                    </option>
                                ))}
                                </select>
                            </div>

                            <div className="col-sm form-group">
                                <label>Minuto </label>
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
                            </div>                           
                        </form>
        
                    </div>
                    <div className="modal-footer">                        
                        <button type="button" className="btn btn-primary" onClick={addGame}>Enrolar juego</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
                </div>
            </div>






        </>

    )




    return (
        <>
            <h5>Generar Nuevo Rol</h5>

            {
                torneo == ''
                    ? listatorneos
                    : nuevoRol
            }
        </>
    )
}

export default Rol
