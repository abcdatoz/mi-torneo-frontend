import React, { useState,useEffect}  from 'react'
import {useSelector} from 'react-redux'



const TablaGeneral = (props) => {

    const [tablaGen, setTablaGen] = useState([])
    const [totalAltas, setTotalAltas] = useState(0)

    //selectors    
    const juegos = useSelector(state => state.juegos.lista)
    const equipos = useSelector(state => state.equipos.lista)
    const equiposEscudo = useSelector(state => state.equiposEscudo.lista)
    
    const crearTablaGeneral = (idTorneo) =>{

        let teams = equipos.filter(x => x.torneoId == idTorneo)
        
        let arr = []
        
        teams.forEach(team => {
            let puntos = 0
            let golesAfavor = 0
            let golesEnContra = 0
            let jj = 0
            let jg = 0
            let jp = 0
            let je = 0

            

            let games = juegos.filter(x => x.equipoA == team.id && x.status == 'Finalizado')
            games.forEach(game => {
                
                puntos = puntos + game.puntosA
                golesAfavor = golesAfavor + game.golesA
                golesEnContra = golesEnContra + game.golesB 
                
                                
                jj++
                if (game.golesA > game.golesB)
                    jg++

                if(game.golesA < game.golesB)
                    jp++

                if(game.golesA == game.golesB)
                    je++
                

            });

            games = juegos.filter(x => x.equipoB == team.id && x.status == 'Finalizado')
            games.forEach(game => {
                puntos = puntos + game.puntosB
                golesAfavor = golesAfavor + game.golesB
                golesEnContra = golesEnContra + game.golesA 
                
                jj++
                if (game.golesB > game.golesA)
                    jg++

                if(game.golesB < game.golesA)
                    jp++

                if(game.golesB == game.golesA)
                    je++
            });

            let estatus = ''
            let status = 1

            if (team.status == 'baja'){
                estatus = ' <<BAJA>>'
                status = 0
            }

            let obj = {
                id: team.id,
                nombre: team.nombre + estatus,
                puntos: puntos,
                golesAfavor: golesAfavor,
                golesEnContra: golesEnContra,
                diferencia: golesAfavor - golesEnContra,
                jj,
                jg,
                jp,
                je,
                status,
            }

            arr.push(obj)

            
        });

        
        //arr.sort((a,b) => b.puntos - a.puntos) 

        arr.sort((a,b) => {
             

            if (b.puntos > a.puntos) {
                return 1;
            } else if (b.puntos === a.puntos) {
                
                if (b.diferencia > a.diferencia) {
                  return 1;                

                } else if (b.diferencia === a.diferencia) {
                
                    if (b.golesAfavor > a.golesAfavor) {
                        
                        return 1;    

                    } else {
                        return -1;    
                    }            

                } else {
                  return -1;
                }
            
            } else {
                return -1;
            }
            
             
        }) 


        setTablaGen(arr)
        setTotalAltas(arr.filter(x => x.status == 1).length)

    }
    
    //useEffect
    useEffect( () => {        
        crearTablaGeneral(props.idTorneo)
    },[])


    const setDatos = (id) => {
        props.setTeam(id)
        props.setTipo('team')
    } 

    const showShield = (id) => {
        let arr = equiposEscudo.filter(x => x.equipoId == id)

        if (arr.length > 0 ){
            return (
                
                    <img src={"http://localhost:8090/api/resources/" + arr[0].imagen} onClick={() =>  setDatos(id)} width="50px" height="50px" />

            )

        }else{
            return (
            <span className="fa fa-bar-chart" aria-hidden="true" onClick={() =>  setDatos(id)} > </span>            
            )
        }
    }


    return (
        <table className="table table-striped">
                <thead>
                <th width="5%">#</th>
                <th width="5%"> </th>
                <th width="25%">Equipo</th>
                <th width="5%">JJ</th>
                <th width="5%">JG</th>
                <th width="5%">JP</th>
                <th width="5%">JE</th>                
                <th width="5%"></th>                
                <th width="5%">Puntos</th>                     
                <th width="5%"></th>                
                <th width="5%">GF</th>
                <th width="5%">GC</th>
                <th width="5%">Dif</th>
                
                
                </thead>

                <tbody>
                {
                    tablaGen
                    .filter (x=>x.status == 1)
                    .map((item,ndx) => (
                        <tr key={item.id}  >
                            <td>{ndx + 1}</td>
                            <td>{ showShield(item.id) }</td>
                            <td> {item.nombre} </td>
                            <td>{item.jj} </td>
                            <td>{item.jg} </td>
                            <td>{item.jp} </td>
                            <td>{item.je} </td>
                            <td> </td>
                            <td>{item.puntos} </td>                                                                                
                            <td> </td>
                            <td>{item.golesAfavor} </td>
                            <td>{item.golesEnContra} </td>
                            <td>{item.diferencia} </td>
                            
                        </tr>
                    ))
                }

                {
                    tablaGen
                    .filter (x=>x.status == 0)
                    .map((item,ndx) => (
                        <tr key={item.id}  >
                            <td>{ totalAltas + ndx + 1}</td>
                            <td>{ showShield(item.id) }</td>
                            <td> {item.nombre} </td>
                            <td>{item.jj} </td>
                            <td>{item.jg} </td>
                            <td>{item.jp} </td>
                            <td>{item.je} </td>
                            <td> </td>
                            <td>{item.puntos} </td>                                                                                
                            <td> </td>
                            <td>{item.golesAfavor} </td>
                            <td>{item.golesEnContra} </td>
                            <td>{item.diferencia} </td>
                            
                        </tr>
                    ))
                }
                </tbody>
            </table>
    )

}


export default TablaGeneral