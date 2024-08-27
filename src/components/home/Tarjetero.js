import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'


const Tarjetero = (props) => {

    
    const [tarjetasAmarillas, setTarjetasAmarillas] = useState([])
    const [tarjetasRojas, setTarjetasRojas] = useState([])


    const equipos = useSelector(state => state.equipos.lista)
    const jugadores = useSelector(state => state.jugadores.lista)
    const goles = useSelector(state => state.goles.lista)
    const equiposEscudo = useSelector(state => state.equiposEscudo.lista)

    useEffect( () => {        
        generarTarjetero()
    },[])

    const generarTarjetero = () => {

        let arr = []
        let players = jugadores.filter(x => x.torneoId == props.idTorneo)
          

        players.forEach(jugador => {
            let ncards = 0    
            let registros = goles.filter(x => x.jugadorId == jugador.id && x.tarjetas_amarillas > 0)

            registros.forEach(registro => {
                ncards = ncards + parseInt(registro.tarjetas_amarillas)
            });
            
            let obj = {
                equipo: equipos.filter(x => x.id == jugador.equipoId)[0].nombre,
                jugador: jugador.nombre,
                ncards,
                id:  jugador.equipo
            }

            if(ncards > 0){
                arr.push(obj)
            }
 
        });

        arr.sort((a,b) => b.ncards - a.ncards) 
        setTarjetasAmarillas(arr)


        arr = []

        players.forEach(jugador => {
            let ncards = 0    
            let registros = goles.filter(x => x.jugadorId == jugador.id && x.tarjeta_roja > 0)

            registros.forEach(registro => {
                ncards = ncards + parseInt(registro.tarjeta_roja)
            });
            
            let obj = {
                equipo: equipos.filter(x => x.id == jugador.equipoId)[0].nombre,
                jugador: jugador.nombre,
                ncards,
                id:  jugador.equipo
            }

            if(ncards > 0){
                arr.push(obj)
            }
 
        });      
        arr.sort((a,b) => b.ncards - a.ncards) 
        setTarjetasRojas(arr)

    }


    const showShield = (id) => {
        let arr = equiposEscudo.filter(x => x.equipo == id)

        if (arr.length > 0 ){
            return (
                <img src={"http://localhost:8090/api/resources/" + arr[0].imagen}  alt="imagen" width="50px" height="50px"/>
            )

        }else{
            return null
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-6">

                    <br /> <br />
                    <table className="table table-striped">
                        <thead>
                        <th width="5%">#</th>
                        <th width="5%"></th>
                        <th width="25%">Equipo</th>
                        <th width="25%">Jugador</th>
                        <th width="25%" style={{backgroundColor:'yellow'}}>Tarjetas Amarillas</th>                           
                        
                        </thead>

                        <tbody>
                        {
                            tarjetasAmarillas
                            .map((item,ndx) => (
                                <tr key={ndx}  >
                                    <td>{ndx + 1}</td>
                                    <td>{ showShield(item.id) }</td>
                                    <td>{item.equipo}</td>
                                    <td>{item.jugador} </td>
                                    <td>{item.ncards} </td>                            
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                <div className="col-6">
                    <br /> <br />
                    <table className="table table-striped">
                        <thead>
                            <th width="5%">#</th>
                            <th width="5%"></th>
                            <th width="25%">Equipo</th>
                            <th width="25%">Jugador</th>
                            <th width="25%" style={{backgroundColor: 'red'}}>Tarjetas Rojas</th>                                                       
                        </thead>

                        <tbody>
                        {
                            tarjetasRojas
                            .map((item,ndx) => (
                                <tr key={ndx}  >
                                    <td>{ndx + 1}</td>
                                    <td>{ showShield(item.id) }</td>
                                    <td>{item.equipo}</td>
                                    <td>{item.jugador} </td>
                                    <td>{item.ncards} </td>                            
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>    
    )
}


export default Tarjetero