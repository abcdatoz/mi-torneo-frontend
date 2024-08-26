import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'


const Goleo = (props) => {

    
    const [tablaGoleo, setTablaGoleo] = useState([])


    const equipos = useSelector(state => state.equipos.lista)
    const jugadores = useSelector(state => state.jugadores.lista)
    const goles = useSelector(state => state.goles.lista)
    const equiposEscudo = useSelector(state => state.equiposEscudo.lista)

    useEffect( () => {        
        generarGoleo()
    },[])

    const generarGoleo = () => {


        console.log('jugadores')
        console.log(jugadores)

        let arr = []
        let goleadores = jugadores.filter(x => x.torneoId == props.idTorneo)
          

        goleadores.forEach(goleador => {
            let ngoles = 0    


            let golesJugador = goles.filter(x => x.jugadorId == goleador.id)

            golesJugador.forEach(registro => {
                ngoles = ngoles + registro.goles
            });
            
            let obj = {
                equipo: equipos.filter(x => x.id == goleador.equipoId)[0].nombre,
                jugador: goleador.nombre,
                ngoles,
                id:  goleador.equipo
            }

            if (equipos.filter(x=>x.id == goleador.equipoId)[0].status == 'alta' ){
                arr.push(obj)
            }

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
        <table className="table table-striped">
                <thead>
                <th width="5%">#</th>
                <th width="5%"></th>
                <th width="25%">Equipo</th>
                <th width="25%">Jugador</th>
                <th width="25%">Goles</th>                           
                
                </thead>

                <tbody>
                {
                    tablaGoleo
                    .map((item,ndx) => (
                        <tr key={ndx}  >
                            <td>{ndx + 1}</td>
                            <td>{ showShield(item.id) }</td>
                            <td>{item.equipo}</td>
                            <td>{item.jugador} </td>
                            <td>{item.ngoles} </td>                            
                        </tr>
                    ))
                }
                </tbody>
            </table>
    )



}


export default Goleo