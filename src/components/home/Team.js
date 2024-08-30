import React, { useState,useEffect}  from 'react'
import {useSelector} from 'react-redux'





const Team = (props) => {

    const [tablaGoleo, setTablaGoleo] = useState([])
    const [listaJornadas, setListaJornadas] = useState([])
    
    const [wins, setWins] = useState([])
    const [lost, setLost] = useState([])
    const [empt, setEmpt] = useState([])

    const equipos = useSelector(state => state.equipos.lista)
    const jugadores = useSelector(state => state.jugadores.lista)
    const goles = useSelector(state => state.goles.lista)
    const equiposEscudo = useSelector(state => state.equiposEscudo.lista)
    const equiposFoto = useSelector(state => state.equiposFoto.lista)
    const jugadoresFoto = useSelector(state => state.jugadoresFoto.lista)

    const jornadas = useSelector(state => state.jornadas.lista)
    const juegos = useSelector(state => state.juegos.lista)

    useEffect( () => {        
        generarGoleo()
        generarEstadisticas()
    },[])

    const generarGoleo = () => {

        let arr = []
        let goleadores = jugadores.filter(x => x.equipoId == props.idTeam)
        

        goleadores.forEach(goleador => {
            let ngoles = 0    
            let nAmarillas = 0
            let nRojas = 0 
            let nJuegos = 0


            let golesJugador = goles.filter(x => x.jugadorId == goleador.id)

            golesJugador.forEach(registro => {
                ngoles = ngoles + parseInt(registro.goles)
                nAmarillas = nAmarillas + parseInt(registro.tarjetas_amarillas)
                nRojas = nRojas + parseInt(registro.tarjeta_roja)
                nJuegos = nJuegos + 1
            });
            
            let obj = {                
                id: goleador.id,
                jugador: goleador.nombre,
                ngoles,              
                nAmarillas,
                nRojas,
                nJuegos  
            }

            arr.push(obj)
        });

        arr.sort((a,b) => b.ngoles - a.ngoles) 

        
        let arrgoleo = []
        let i = 0
        
        arr.forEach(element => {
            i++

            if (i < 11){
                arrgoleo.push(element)
            }


            
        });


        setTablaGoleo(arrgoleo)        

    }



    const generarEstadisticas = () => {

        let juegosA = juegos.filter(x=> x.equipoA == props.idTeam && x.status == 'Finalizado')
        let juegosB = juegos.filter(x=> x.equipoB == props.idTeam && x.status == 'Finalizado')
        
        let arrWin = []
        let arrEmpt = []
        let arrLost = []

        let nombre = equipos.filter(x=>x.id == props.idTeam)[0].nombre

        juegosA.forEach(match => {
            
            let obj = {
                id: match.id,
                equipoA: nombre,
                golesA: match.golesA,
                golesB: match.golesB,
                equipoB: equipos.filter(x=>x.id == match.equipoB)[0].nombre
            }   


            if ( match.golesA > match.golesB)
                arrWin.push(obj)

            if ( match.golesA < match.golesB)
                arrLost.push(obj)

            if ( match.golesA == match.golesB)
                arrEmpt.push(obj)


        });

        juegosB.forEach(match => {
            
            let obj = {
                id: match.id,
                equipoA: nombre,
                golesA: match.golesB,
                golesB: match.golesA,
                equipoB: equipos.filter(x=>x.id == match.equipoA)[0].nombre
            }   


            if ( match.golesA > match.golesB)
                arrLost.push(obj)

            if ( match.golesA < match.golesB)
                arrWin.push(obj)

            if ( match.golesA == match.golesB)
                arrEmpt.push(obj)


        });

        setWins(arrWin)
        setLost(arrLost)
        setEmpt(arrEmpt)

        

    }


   



    const showPhoto = (id) => {
        let arr = equiposFoto.filter(x => x.equipoId == id)

        if (arr.length > 0 ){
            return (
                <img src={"http://localhost:8090/api/resources/" + arr[0].imagen}  alt="imagen"  width="300px" height="200px"/>
            )

        }else{
            return null
        }
    }

    const showShield = (id) => {
        let arr = equiposEscudo.filter(x => x.equipoId == id)

        if (arr.length > 0 ){
            return (
                <img src={"http://localhost:8090/api/resources/" + arr[0].imagen}  alt="imagen" width="90px" height="120px"/>
            )

        }else{
            return null
        }
    }


    const showPhotoJugador = (id) => {
        let arr = jugadoresFoto.filter(x => x.jugadorId == id)

        if (arr.length > 0 ){
            return (
                <img src={"http://localhost:8090/api/resources/" + arr[0].imagen}  alt="imagen"  width="100px" height="100px"/>
            )

        }else{
            return null
        }
    }


    return (
       <div>             
             

             <div className="team-container">
                
                <div className="team-item">
                    {showShield(props.idTeam)}   
                    <h3>{equipos.filter(x=>x.id == props.idTeam)[0].nombre }</h3>
                </div>

                
                <div className="team-item">
                    {showPhoto(props.idTeam)}
                    
                </div>
                
                
             </div>

 
             
              <table className="table table-striped mediatabla" >
                <thead>
                    <tr>
                        <th width="10%"></th>                        
                        <th width="10%"></th>                        
                        <th width="30%"><h5>Jugadores</h5></th>
                        <th width="10%">Goles</th>
                        <th width="10%">T. Amarillas</th>
                        <th width="10%">T. Rojas</th>
                        <th width="10%">Juegos Jugados</th>
                                  
                        
                    </tr>
                </thead>
                <tbody>
                {
                    tablaGoleo
                    .map((item, indx) =>  (
                        <tr key={item.id}  >
                            <td> {indx + 1}  </td>                                
                            <td> {showPhotoJugador(item.id) }  </td>                                
                            <td>{item.jugador}</td>
                            <td>{item.ngoles} Goles </td>                                                       
                            <td>{item.nAmarillas}  </td>                                                       
                            <td>{item.nRojas}  </td>                                                       
                            <td>{item.nJuegos} Juegos </td>                                                       
                        </tr>
                    ))                    
                }
                </tbody>
                </table>




              
              <table className="table table-striped mediatabla" >
                <thead>
                    <tr>                        
                        <th width="10%"></th>
                        <th width="25%"><h5>Juegos</h5></th>
                        <th width="5%"></th>                
                        <th width="5%"></th>
                        <th width="25%"><h5>Ganados</h5></th>                
                        
                    </tr>
                </thead>

                <tbody>
                {
                    wins
                    .map((item, indx) =>  (
                        <tr key={item.id}  >
                            <td> {indx + 1}  </td>                                
                            <td>{item.equipoA}</td>
                            <td>{item.golesA} </td>                            
                            <td>{item.golesB} </td>
                            <td>{item.equipoB} </td> 
                        </tr>
                    ))                    
                }
                </tbody>
                </table>

                
              <table className="table table-striped mediatabla" >
                <thead>
                    <tr>                        
                        <th width="10%"></th>
                        <th width="25%"><h5>Juegos</h5></th>
                        <th width="5%"></th>                
                        <th width="5%"></th>
                        <th width="25%"> <h5>Perdidos</h5></th>                
                        
                    </tr>
                </thead>

                <tbody>
                {
                    lost
                    .map((item, indx) =>  (
                        <tr key={item.id}  >
                            <td> {indx + 1}  </td>                                
                            <td>{item.equipoA}</td>
                            <td>{item.golesA} </td>                            
                            <td>{item.golesB} </td>
                            <td>{item.equipoB} </td> 
                        </tr>
                    ))                    
                }
                </tbody>
                </table>

            
              <table className="table table-striped mediatabla" >
                <thead>
                    <tr>                        
                        <th width="10%"></th>
                        <th width="25%"><h5>Juegos</h5></th>
                        <th width="5%"></th>                
                        <th width="5%"></th>
                        <th width="25%"><h5>Empatados</h5></th>                
                        
                    </tr>
                </thead>

                <tbody>
                {
                    empt
                    .map((item, indx) =>  (
                        <tr key={item.id}  >
                            <td> {indx + 1}  </td>                                
                            <td>{item.equipoA}</td>
                            <td>{item.golesA} </td>                            
                            <td>{item.golesB} </td>
                            <td>{item.equipoB} </td> 
                        </tr>
                    ))                    
                }
                </tbody>
                </table>



       </div>
    )

}


export default Team

