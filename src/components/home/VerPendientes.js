import React, { useState,useEffect}  from 'react'
import {useSelector} from 'react-redux'



const VerPendientes = (props) => {

    const [lista, setLista] = useState([])        

    //selectors        
    const juegos = useSelector(state => state.juegos.lista)
    const equipos = useSelector(state => state.equipos.lista)
    
 
    const generarDatos = () =>{

        
        let teams  = equipos.filter(x => x.torneoId == props.idTorneo && x.status == 'alta')
        let juegosTorneo  = juegos.filter(x => x.torneoId == props.idTorneo)

        let arr = []

        teams.forEach(element => {

            let pendientes = []       
                       

            let equiposTorneo  = equipos.filter(x => x.torneoId == props.idTorneo 
                && x.status == 'alta' 
                && x.id != element.id)


            for(let i=0; i < equiposTorneo.length; i++){


                
                let yasejugoA = juegosTorneo.filter( x => x.equipoA == element.id && x.equipoB == equiposTorneo[i].id) 
                let yasejugoB = juegosTorneo.filter( x => x.equipoB == element.id && x.equipoA == equiposTorneo[i].id) 
                 
                if ( yasejugoA.length == 0 && yasejugoB.length  == 0){

                    let team = equipos.filter(z => z.id === equiposTorneo[i].id)
                    pendientes.push( team[0].nombre)
                }   
            }

            let obj = {
                equipo: element.nombre, 
                pendientes:pendientes.join(' - ')
            }

            arr.push(obj)
        });
        
        setLista(arr)
        

    }

   

    
    //useEffect
    useEffect( () => {        
        generarDatos()
    },[])
        
    return (
        <>

            <br />   
            <br />   
            <p> <h4>JUEGOS PENDIENTES </h4></p>
            <table className="table table-striped" >
                <thead>
                    <tr>
                        <th width="20%"></th>
                        <th width="80%"></th>                                                
                    </tr>
                </thead>

            <tbody>

                {
                    lista
                    .map((item,ndx) => (
                        <tr key={ndx}  >
                            <td>{item.equipo}  </td>                        
                            <td>{item.pendientes} </td>                                                                                    
                        </tr>
                    ))
                }

            </tbody>
            </table>



            <br />   
            <p> <h4>EQUIPOS DADOS DE BAJA </h4></p>
            <table >
                <thead>
                    <tr>
                        <th width="20%"></th>
                        <th width="80%"></th>                                                
                    </tr>
                </thead>

            <tbody>

                {
                    equipos.filter(x => x.torneoId == props.idTorneo && x.status == 'baja')
                    .map((item,ndx) => (
                        <tr key={ndx}  >
                            <td>{ndx + 1}  </td>                        
                            <td>{item.nombre} </td>                                                                                    
                        </tr>
                    ))
                }

            </tbody>
            </table>

        </>
    )

}


export default VerPendientes