import React, {useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getTorneos} from '../../actions/TorneoActions'
import {getJornadas} from '../../actions/JornadaActions'
import { addJuego, getJuegos } from '../../actions/JuegosActions'
import { getEquipos } from '../../actions/EquipoActions'
import { toast } from 'react-toastify'
import { Container, Row, Col, InputGroup, Modal,Form , Button} from 'react-bootstrap'

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

    const [showMyModal, setshowMyModal] = useState(false)
    const closeModal = (e) => { setshowMyModal(false); }


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
                            <td> {torneo.localidad}</td>                            
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
        setshowMyModal(true)

    }
        

    const addGame = () =>{

        if (fecha == ''){
            toast.warning('No ha indicado la fecha del juego')
            return
        }

        if (hora == '' || minuto == ''){
            toast.warning('No ha indicado la hora y minuto del juego')
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
            //setHora('')
            //setMinuto('')            

            arr = newRol.filter(x=> x.equipoA != newGame.equipoA)

            setNewRol(arr)
            setNewGame({})

            setshowMyModal(false)

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

    //trasladar juegos a jornada
    const crearNuevaJornada = () => {
        
        if (newJornada.length == 0){
            toast.warning('No hay configurado partidos para esta jornada')
            return
        }

        

        let listaJornadas = jornadas.filter(x => x.status == 'Abierta' && x.torneoId == torneo)

        if (listaJornadas.length == 0){
            toast.warning('la jornada ya no esta abierta')
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

        toast.success('los juegos fueron generados satisfactoriamente')

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
                jornadas.filter(x => x.status == 'Abierta' 
                                    && x.torneoId == torneo).length == 1 
                                    && juegos.filter(y => y.torneoId == torneo 
                                                        && y.jornadaId == jornadas.filter(x => x.status == 'Abierta' 
                                                                                    && x.torneoId == torneo)[0].id) == 0
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
                                                    onClick={ () => { enrolar(item)  } }
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

           




            






        </>

    )



    const MyModal = (
        <>
            <Modal show={showMyModal} onHide={closeModal} size='lg'>
                <Modal.Header closeButton>
                <Modal.Title> <h2>{newGame.nombreA} vs {newGame.nombreB}</h2>  </Modal.Title>
                </Modal.Header> 
        
                <Modal.Body>            
                
      
      
                    <InputGroup className="mb-2">
                        <InputGroup.Text>Fecha</InputGroup.Text>
                        
                        <input className="form-control"
                                    type="date"                                     
                                    name="fecha"
                                    value={fecha}
                                    min="2021-01-01" 
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
                                    onChange={ e=> setHora (e.target.value) } >                                       
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
      
      
                </Modal.Body>
            
                <Modal.Footer>
                    <Container>
                        <Row>           
                            <Col xs={8}></Col>                               
      
                            <Col xs={2}>                        
                                <Button inverted color="green" onClick={addGame}>
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


    return (
        <>
            <h5>Generar Nuevo Rol</h5>

            {
                torneo == ''
                    ? listatorneos
                    : nuevoRol
            }

            {MyModal}
        </>
    )
}

export default Rol
