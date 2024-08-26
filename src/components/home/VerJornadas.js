import React, { useState,useEffect}  from 'react'
import {useSelector} from 'react-redux'
import { Container, Row, Col, InputGroup, Modal,Form , Button} from 'react-bootstrap'


const VerJornadas = (props) => {

    const [listaJornadas, setListaJornadas] = useState([])
    const [filtro, setFiltro] = useState('')

    //selectors    
    const jornadas = useSelector(state => state.jornadas.lista)
    const juegos = useSelector(state => state.juegos.lista)
    const equipos = useSelector(state => state.equipos.lista)
    const goles = useSelector(state => state.goles.lista)
    const jugadores = useSelector(state => state.jugadores.lista)
    
    const [arrGolesA, setArrGolesA] = useState([])
    const [arrGolesB, setArrGolesB] = useState([])
    const [teamA, setTeamA] = useState('')
    const [teamB, setTeamB] = useState('')

    const [showMyModal, setshowMyModal] = useState(false)
    const closeModal = (e) => { setshowMyModal(false); }

    
    const generarDatos = () =>{

        let journeys = jornadas.filter(x => x.torneoId == props.idTorneo && x.status == 'Cerrada')        
        let teams = equipos.filter(x => x.torneoId == props.idTorneo)

        let grandMother = []

        journeys.forEach(element => {

            let arr = []
            let matches = juegos.filter(x=>x.jornadaId == element.id)
        
            matches.forEach(match => {
                 

                let obj = {
                    id: match.id,
                    equipoA:  teams.filter(x => x.id == match.equipoA)[0].nombre,
                    equipoB:  teams.filter(x => x.id == match.equipoB)[0].nombre,
                    golesA: match.golesA,
                    golesB: match.golesB,                    
                    status: match.status
                }

                arr.push(obj)

                
            });

        
            

            let subdata = {
                jornada: element.nombre,
                juego: arr
            }

            grandMother.push(subdata)

            
        });
        

        setListaJornadas(grandMother)

    }
    
    //useEffect
    useEffect( () => {        
        generarDatos()
    },[])

    const mostrarModal = (id) => {
        setshowMyModal(true)

        let match = juegos.filter(x => x.id == id)

        let arr = goles.filter(x => x.juegoId == id && x.equipoId == match[0].equipoA  ) //&& x.goles > 0
        let arr2 =[]
        arr.forEach(element => {
            let player = jugadores.filter(x => x.id == element.jugadorId)             
            let obj = {
                id: element.jugador,
                nombre: player[0].nombre,
                goles:  element.goles > 0 ? ' ' + element.goles + ' ' : ' ',
                yellowCard: element.tarjetas_amarillas,
                redCard: element.tarjeta_roja

            }
            arr2.push(obj)
        });

        

        setTeamA( equipos.filter(x=>x.id == match[0].equipoA)[0].nombre )
        setArrGolesA(arr2)

        arr = []
        arr2 = []
        arr = goles.filter(x => x.juegoId == id && x.equipoId == match[0].equipoB  ) //&& x.goles > 0
        arr.forEach(element => {
            let player = jugadores.filter(x => x.id == element.jugadorId)             
            let obj = {
                id: element.jugador,
                nombre: player[0].nombre,
                goles:  element.goles > 0 ? ' ' + element.goles + ' ' : ' ',
                yellowCard: element.tarjetas_amarillas,
                redCard: element.tarjeta_roja
            }
            arr2.push(obj)
        });


        setTeamB( equipos.filter(x=>x.id == match[0].equipoB)[0].nombre )
        setArrGolesB(arr2)

    }

    const MyModal = (
        <>
            <Modal show={showMyModal} onHide={closeModal} size='lg'>
                <Modal.Header closeButton>
                <Modal.Title> Goles y Tarjetas </Modal.Title>
                </Modal.Header> 
        
                <Modal.Body>            
                
                <>
                    
                    <h5>{teamA}</h5>

                    <table >
                     <thead>
                         <tr>
                         <th width="50%">Jugador</th>
                         <th width="15%">Goles</th>                        
                         <th width="10%">T. Amarilla</th>
                         <th width="10%">T. Roja</th>
                         </tr>
                     </thead>

                     <tbody>
                     {
                         arrGolesA
                         .map((item) => (
                             <tr key={item.id}  >                                    
                                 <td>{item.nombre}   </td>
                                 <td>{item.goles} </td>                
                                 {
                                    item.yellowCard > 0
                                    ? <td style={{backgroundColor:'yellow'}}>{item.yellowCard}</td>
                                    : <td></td>

                                 }                    
                                 
                                 {
                                    item.redCard > 0
                                    ? <td style={{backgroundColor:'red'}}>{item.redCard}</td>
                                    : <td></td>
                                 }     

                             </tr>
                         ))                            
                     }
                     </tbody>
                     </table>


                    <h5>{teamB}</h5>
                    <table  >
                     
                     <thead>
                         <tr>
                         <th width="50%">Jugador</th>
                         <th width="15%">Goles</th>                        
                         <th width="10%">T. Amarilla</th>
                         <th width="10%">T. Roja</th>
                         </tr>
                     </thead>

                     <tbody>
                     {
                         arrGolesB
                         .map((item) => (
                            <tr key={item.id}  >                                    
                                <td>{item.nombre}   </td>
                                <td>{item.goles} </td>                                    
                                {
                                    item.yellowCard > 0
                                    ? <td style={{backgroundColor:'yellow'}}>{item.yellowCard}</td>
                                    : <td></td>
                                }     
                                {
                                    item.redCard > 0
                                    ? <td style={{backgroundColor:'red'}}>{item.redCard}</td>
                                    : <td></td>
                                }     
                                
                            </tr>
                         ))                            
                     }
                     </tbody>
                     </table>
     
                 </>      


       
                </Modal.Body>
            
                <Modal.Footer>
                    <Container>
                        <Row>           
                                    <Col xs={2}>
                                <Button  onClick={closeModal}>
                                    Cerrar
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

        <div>            
            <input 
                    type="text"
                    placeholder="filtrar por equipo"
                    name="filtro"
                    value={filtro}
                    onChange={ e => setFiltro(e.target.value)}
                />   
        </div>


        <table className="table table-striped" >
                <thead>
                    <tr>
                        <th width="10%"></th>
                        <th width="10%"></th>
                        <th width="25%"></th>
                        <th width="5%"></th>                
                        <th width="5%"></th>
                        <th width="25%"></th>                
                        
                    </tr>
                </thead>

        <tbody>

            {
                listaJornadas
                .map((item, ndx) => 
                
                    
                        listaJornadas[ndx].juego
                        .filter (x => x.equipoA.toUpperCase().includes(filtro.toUpperCase()) 
                                || x.equipoB.toUpperCase().includes(filtro.toUpperCase()))                    
                        .map((subitem,indx) => (
                            <tr key={subitem.id}  >
                                <td> {item.jornada}  </td>
                                <td>{indx + 1}</td>
                                <td>{subitem.equipoA}</td>
                                <td>{subitem.golesA} </td>                            
                                <td><span className="fa fa-soccer-ball-o" aria-hidden="true" onClick={() =>  mostrarModal(subitem.id)} > </span> </td>                                        
                                <td>{subitem.golesB} </td>
                                <td>{subitem.equipoB} </td>                            
                                
                            </tr>
                        ))
                    
                

                )
            }

            </tbody>
            </table>



            {MyModal}
  
                    
                    
                    



            </>
    )

}


export default VerJornadas