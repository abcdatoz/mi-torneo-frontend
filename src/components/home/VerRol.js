import React, { useState,useEffect}  from 'react'
import {useSelector} from 'react-redux'



const VerRol = (props) => {

    const [lista, setLista] = useState([])    
    const [nomJornada, setNomJornada] = useState('')

    //selectors    
    const jornadas = useSelector(state => state.jornadas.lista)
    const juegos = useSelector(state => state.juegos.lista)
    const equipos = useSelector(state => state.equipos.lista)
    
    
    
    
    const generarDatos = () =>{

        let journeys = jornadas.filter(x => x.torneoId == props.idTorneo && x.status == 'Abierta')        
        let teams = equipos.filter(x=>x.torneoId == props.idTorneo)

         
        let arr = []

        journeys.forEach(element => {

            setNomJornada(element.nombre)
            
            let matches = juegos.filter(x => x.jornadaId == element.id)
        
            matches.forEach(match => {
                 
                let minute = 'X00' + match.minuto 

                let obj = {
                    id: match.id,
                    fecha:  match.fecha.substring(0,10), 
                    hora: match.hora + ':' + minute.substring(minute.length -2, minute.length),
                    equipoA:  teams.filter(x => x.id == match.equipoA)[0].nombre,
                    equipoB:  teams.filter(x => x.id == match.equipoB)[0].nombre,                    
                }

                arr.push(obj)

                
            });
            
        });
        

        setLista(arr)



    }
    
    //useEffect
    useEffect( () => {        
        generarDatos()
    },[])
        
    return (
        <>

            <br/>
            <br/>
            
            <p>{nomJornada}</p>
            
            <table className="table table-striped" >
                <thead>
                    <tr>
                        <th width="10%"></th>
                        <th width="10%"></th>                        
                        <th width="15%"></th>
                        <th width="10%"></th>                
                        <th width="15%"></th>                        
                        <th width="20%"></th>                        
                    </tr>
                </thead>

            <tbody>

                {
                    lista
                    .map((item) => (
                        <tr key={item.id}  >
                            <td>{item.fecha}  </td>                        
                            <td>{item.hora} </td>                                                        
                            <td>{item.equipoA}</td>
                            <td> vs </td>
                            <td>{item.equipoB} </td>                                                    
                        </tr>
                    ))
                }

            </tbody>
            </table>




        </>
    )

}


export default VerRol