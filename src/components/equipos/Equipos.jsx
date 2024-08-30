import React, {useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getTorneos} from '../../actions/TorneoActions'
import {getGrupos} from '../../actions/GrupoActions'
import {getEquipos, addEquipo, editEquipo, deleteEquipo} from '../../actions/EquipoActions'
import {getJugadores, addJugador,editJugador,deleteJugador} from '../../actions/JugadorActions'
import {getEquipoEscudo, addEquipoEscudo, deleteEquipoEscudo} from '../../actions/EquipoEscudoActions'
import {getEquipoFoto, addEquipoFoto,deleteEquipoFoto} from '../../actions/EquipoFotoActions'
import {getJugadorFoto, addJugadorFoto,deleteJugadorFoto} from '../../actions/JugadorFotoActions'
import {getJuegos} from '../../actions/JuegosActions'
import {getGoles  } from '../../actions/GolesActions'

import { Container, Row, Col, InputGroup, Modal,Form , Button} from 'react-bootstrap'
import { toast } from 'react-toastify'

const Equipos = () => {

  //useStates    
  const [nombreTorneo, setNombreTorneo] = useState('')
  const [torneo, setTorneo] = useState('')
  const [grupo, setGrupo] = useState('')
  const [nombre, setNombre] = useState('')
  const [nombreContacto, setNombreContacto] = useState('')
  const [correoContacto, setCorreoContacto] = useState('cad@dia.vip')
  const [telefonoContacto, setTelefonoContacto] = useState('')    
  const [status, setStatus] = useState('')
  const [mode, setMode] = useState('new')
  const [id, setId] = useState('')
   
  const [idEquipo, setIdEquipo] = useState('')
  const [nombreEquipo, setNombreEquipo] = useState('')

  const [jugadorNombre, setJugadorNombre] = useState('')
  const [jugadorStatus, setJugadorStatus] = useState('Alta')
  const [jugadorId, setJugadorId] = useState('')


  const [idEquipoImage, setIdEquipoImage] = useState('')
  const [idJugadorImage, setIdJugadorImage] = useState('')
  const [tipoImagen, setTipoImagen] = useState('')
  const [imagen, setImagen] = useState('')
  const [imagenJugador, setImagenJugador] = useState('')

  //useSelectors
  const auth = useSelector(state => state.auth)    
  const torneos = useSelector(state => state.torneos.lista)
  const grupos = useSelector(state => state.grupos.lista)
  const equipos = useSelector(state => state.equipos.lista)
  const jugadores = useSelector(state => state.jugadores.lista)
  const juegos = useSelector(state => state.juegos.lista)
  const goles = useSelector(state => state.goles.lista)

  const equiposFoto = useSelector(state => state.equiposFoto.lista)
  const equiposEscudo = useSelector(state => state.equiposEscudo.lista)
  const jugadoresFoto = useSelector(state => state.jugadoresFoto.lista)

  //useDispatch
  const dispatch = useDispatch()


  const [showMyModal, setshowMyModal] = useState(false)
  const [showConfirmationDelete, setShowConfirmationDelete] = useState(false)
  const [showMyModalFoto, setshowMyModalFoto] = useState(false)
  const [showMyModalPicture, setshowMyModalPicture] = useState(false)
   
  const closeModal = (e) => { setshowMyModal(false); }
  const closeConfirmationDelete = (e) => { setShowConfirmationDelete(false)  }
  const closeModalFoto = (e) => { setshowMyModalFoto(false); }
  const closeModalPicture = (e) => { setshowMyModalPicture(false); }
 
  

  useEffect(()=>{        
      dispatch(getTorneos())
      dispatch(getGrupos())
      dispatch(getEquipos())
      dispatch(getJugadores())                
      dispatch(getJuegos())       
      dispatch(getEquipoEscudo())         
      dispatch(getEquipoFoto())
      dispatch(getGoles())
     
  },[])


  const agregar = () => {
    setMode('new')
    
    setGrupo('')
    setNombre('')
    setNombreContacto('')
    setCorreoContacto('')
    setTelefonoContacto('')
    setStatus('alta')

    setshowMyModal(true)
}

const editar = (item) => {
    setMode('edit')
    
    setGrupo(item.grupo)
    setNombre(item.nombre)
    setNombreContacto(item.nombre_contacto)
    setCorreoContacto(item.correo_contacto)
    setTelefonoContacto(item.telefono_contacto)
    setStatus(item.status)
    setId(item.id)        
    
    setshowMyModal(true)
}


const agregarJugador = () => {

    if (jugadorNombre == '') {
        alert('No ha capturado el nombre del jugador')
        return
    }


    let data = {
        nombre : jugadorNombre,
        status: jugadorStatus, 
        torneo,
        equipo: idEquipo           
    }

    if (jugadorId == '')
        dispatch(addJugador(data))
        

    if (jugadorId != '')        
        dispatch(editJugador(data,jugadorId))
        
    


    setJugadorId('')
    setJugadorNombre('')
    setJugadorStatus('Alta')
}

const editarJugador =(item) => {
    setJugadorId(item.id)
    setJugadorNombre(item.nombre)
    setJugadorStatus(item.status)
}

const eliminarJugador = (item) =>{

    let listagoles = goles.filter(x=> x.jugador === item.id)

     
    if (listagoles.length > 0){
        toast.warning("Este jugador no se puede eliminar porque tiene goles")
                    
    }else{
        dispatch(deleteJugador(item.id))
    }        
}


const editarImagen = (id, tipo) =>{
    setIdEquipoImage(id)
    setTipoImagen(tipo)
    setshowMyModalFoto(true)
}

const guardarImagen = (e) => {

    e.preventDefault()

    if (!imagen){            
        alert('No ha seleccionado la imagen')
        return
    }


    let formdata = new FormData()

    
    formdata.append('equipo', idEquipoImage)
    formdata.append('imagen', imagen, imagen.name)

    if (tipoImagen == 'escudo'){

        let arrEscudos = equiposEscudo.filter(x=>x.equipoId == idEquipoImage)
        
        arrEscudos.forEach(element => {
            dispatch(deleteEquipoEscudo(element.id))    
        });

        dispatch(addEquipoEscudo(formdata))       
    }                       

        
    
    if(tipoImagen == 'foto'){

        let arrFotos = equiposFoto.filter(x=>x.equipoId == idEquipoImage)
        
        arrFotos.forEach(element => {
            dispatch(deleteEquipoFoto(element.id))    
        });

        dispatch(addEquipoFoto(formdata))       
    }
    
    setshowMyModalFoto(false)

}



const editarImagenJugador = (id) =>{
    setIdJugadorImage(id)
    setshowMyModalPicture(true)    
}

const guardarImagenJugador = (e) => {

    e.preventDefault()

    if (!imagenJugador){            
        alert('No ha seleccionado la imagen')
        return
    }


    let formdata = new FormData()

    
    formdata.append('jugador', idJugadorImage)
    formdata.append('imagen', imagenJugador, imagenJugador.name)

  

    let arrFotos = jugadoresFoto.filter(x => x.jugadorId == setIdJugadorImage)
    
    arrFotos.forEach(element => {
        dispatch(deleteJugadorFoto(element.id))    
    });

    dispatch(addJugadorFoto(formdata))       

    
    setshowMyModalPicture(false)

}

const guardar = (e) => {
    e.preventDefault()

    if (nombre == '') {
        alert('No ha capturado el nombre del equipo')
        return
    }
    let arr = []
    if (mode == 'new'){
        arr = equipos.filter(x=>x.torneo == torneo && x.nombre.toUpperCase() == nombre.toUpperCase())
    }else{
        arr = equipos.filter(x=>x.torneo == torneo && x.nombre.toUpperCase() == nombre.toUpperCase() && x.id != id)
    }

    if (arr.length > 0){
        alert('ya hay un equipo en este torneo con ese nombre')
        return
    }

    let data = {
        torneo,
        grupo,
        nombre,
        nombreContacto,
        correoContacto,
        telefonoContacto,
        status    
    }

    if (mode == 'new')
        dispatch(addEquipo(data))       
    
    if(mode == 'edit')
        dispatch(editEquipo(data, id))    
   
    setshowMyModal(false)

}


const eliminar = (item) => {


    let listaJuegos = juegos.filter(x=> x.equipoA === item.id || x.equipoB === item.id)

    if (listaJuegos.length > 0){
        toast.warning('No se puede eliminar este equipo porque tiene juegos rolados')
        return
    }




    let lista = jugadores.filter(x=> x.equipo === item.id)

    if (lista.length > 0){
        toast.warning('No se puede eliminar este equipo porque tiene jugadores registrados')
        return
    }

    setId(item.id)                
    setShowConfirmationDelete(true)        
}

const eliminarRegistro = () => {        
    dispatch(deleteEquipo(id))
    setShowConfirmationDelete(false)        
}


const showPhoto = (id) => {
    let arr = equiposFoto.filter(x => x.equipoId == id)

    if (arr.length > 0 ){
        return (             
            <img src={"http://localhost:8090/api/resources/" + arr[0].imagen}  alt="imagen" width="50px" height="50px"/>
        )

    }else{
        return null
    }
}

const showShield = (id) => {
    let arr = equiposEscudo.filter(x => x.equipoId == id)

    if (arr.length > 0 ){
        return (
            <img src={"http://localhost:8090/api/resources/"  + arr[0].imagen}  alt="imagen" width="50px" height="50px"/>
        )

    }else{
        return null
    }
}


const showPhotoJugador = (id) => {
    let arr = jugadoresFoto.filter(x => x.jugadorId == id)

    if (arr.length > 0 ){
        return (             
            <img src={"http://localhost:8090/api/resources/" + arr[0].imagen}  alt="imagen" width="50px" height="50px"/>
        )

    }else{
        return null
    }
}

const listatorneos = (<>
  <h5>Mis Torneos </h5>

  <table>
      <thead>
           
          <th width="10%"> </th>
          <th width="50%">Nombre</th>
          <th width="10%">Localidad</th>
          <th width="10%">status</th>
          <th width="10%">Equipos</th>                
      </thead>     
      <tbody>
          {
              torneos
              .filter(x => x.status === 'alta')
              .map(torneo=>(
                  <tr key={torneo.id}>
                      <td> <img src={"http://localhost:8090/api/resources/" + torneo.imagen}  alt="imagen" width="100px" height="100px"/> </td>
                      <td>{torneo.nombre}</td>
                      <td>{torneo.localidad}</td>
                      <td>{torneo.status}</td>
                      <td>
                          <button  onClick={() => {setTorneo(torneo.id); setNombreTorneo(torneo.nombre)}} className="btn btn-outline-success" >
                              Ver Equipos
                          </button>                                             
                      
                      </td>
                  </tr>
              ))
          }
                      
      </tbody>
      </table>

</>)


const MyModal = (
  <>
      <Modal show={showMyModal} onHide={closeModal} size='lg'>
          <Modal.Header closeButton>
          { mode == 'new' ? <Modal.Title>Nuevo Equipo </Modal.Title>
                          : <Modal.Title>Editar Equipo </Modal.Title>
          }
          </Modal.Header> 
  
          <Modal.Body>            
          


              <InputGroup className="mb-2">
                  <InputGroup.Text>Nombre del equipo</InputGroup.Text>
                  
                  <Form.Control 
                      name="nombre"
                      onChange= { e => setNombre(e.target.value) }                            
                      value= { nombre }
                      />

              </InputGroup>

              <InputGroup className="mb-2">
                  <InputGroup.Text>Representante</InputGroup.Text>
                  <Form.Control 
                    name="nombreContacto"
                    onChange= { e => setNombreContacto(e.target.value) }                            
                    value= { nombreContacto }
                      />
              </InputGroup>

              <InputGroup className="mb-2">
                  <InputGroup.Text>Telefono</InputGroup.Text>
                  <Form.Control 
                    name="telefonoContacto"
                    onChange= { e => setTelefonoContacto(e.target.value) }                            
                    value= { telefonoContacto }
                      />
              </InputGroup>


              <InputGroup className="mb-2">
                  <InputGroup.Text>Status</InputGroup.Text>
                  <select 
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={ e=> setStatus (e.target.value) } >
                      <option value="alta">Alta</option>                                
                      <option value="baja">Baja</option>                                        
                  </select>
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



  const MyModalConfirmation = (
    <>
        <Modal show={showConfirmationDelete} onHide={closeConfirmationDelete} size='ls'>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar registro</Modal.Title>                                          
            </Modal.Header>         

            <Modal.Body>                
                <p> ¿Esta seguro de eliminar el equipo?</p>
            </Modal.Body>
        
            <Modal.Footer>
                <Container>
                    <Row>           
                        <Col xs={8}></Col>                               

                        <Col xs={2}>                        
                            <Button variant='danger' onClick={eliminarRegistro}>
                                Eliminar
                            </Button>                        
                        </Col>
                        <Col xs={2}>
                            <Button  variant='secondary' onClick={closeConfirmationDelete}>
                                Regresar
                            </Button>
                        </Col>
                        
                    </Row>
                </Container>
            </Modal.Footer>
        </Modal>

    </>
)


const MyModalFoto = (
    <>
        <Modal show={showMyModalFoto} onHide={closeModalFoto} size='lg'>
            <Modal.Header closeButton>
            <Modal.Title>Cargar Foto </Modal.Title> 
            </Modal.Header> 
    
            <Modal.Body>            
            
  
  
              
   
  
                <InputGroup className="mb-2">
                    <InputGroup.Text>Seleccione la imagen</InputGroup.Text>
                        <input 
                              className="form-control"
                              type="file"
                              name="imagen"
                              accept="image/png, image/jpeg"
                              onChange = { e => setImagen(e.target.files[0])}
                              required
                        />

                </InputGroup>
   
            </Modal.Body>
        
            <Modal.Footer>
                <Container>
                    <Row>           
                        <Col xs={8}></Col>                               
  
                        <Col xs={2}>                        
                            <Button inverted color="green" onClick={guardarImagen}>
                                Guardar
                            </Button>                        
                        </Col>
                        <Col xs={2}>
                            <Button  onClick={closeModalFoto}>
                                Cancelar
                            </Button>
                        </Col>
                        
                    </Row>
                </Container>
            </Modal.Footer>
        </Modal>
    </>
    )


    const MyModalPicture = (
        <>
            <Modal show={showMyModalPicture} onHide={closeModalPicture} size='lg'>
                <Modal.Header closeButton>
                <Modal.Title>Cargar Foto Jugador </Modal.Title> 
                </Modal.Header> 
        
                <Modal.Body>            
                
      
      
                  
       
      
                    <InputGroup className="mb-2">
                        <InputGroup.Text>Seleccione la imagen</InputGroup.Text>
                            <input 
                                  className="form-control"
                                  type="file"
                                  name="imagen"
                                  accept="image/png, image/jpeg"
                                  onChange = { e => setImagenJugador(e.target.files[0])}
                                  required
                            />
    
                    </InputGroup>
       
                </Modal.Body>
            
                <Modal.Footer>
                    <Container>
                        <Row>           
                            <Col xs={8}></Col>                               
      
                            <Col xs={2}>                        
                                <Button inverted color="green" onClick={guardarImagenJugador}>
                                    Guardar
                                </Button>                        
                            </Col>
                            <Col xs={2}>
                                <Button  onClick={closeModalFoto}>
                                    Cancelar
                                </Button>
                            </Col>
                            
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </>
        )


const listaEquipos = (
  <>        
      <h5>{ nombreTorneo }</h5>
      
      <button  onClick={() => {setTorneo(''); setNombreTorneo('')}} className="btn btn-outline-success" >
          regresar
      </button> 


    <table className="table table-striped">
      
      <tbody>

      {                    
          grupos
          .filter(x => x.torneoId === torneo)
          .map(grupo=>(
              <tr key={grupo.id}>
                  <td width="20%">
                      {grupo.nombre} <br/>


                      <button
                          type="button"
                          className="btn btn-outline-success"                          
                          onClick={ () => { agregar(); setGrupo(grupo.id); } }
                          >
                          + Nuevo Equipo
                      </button>
                  </td>
                  <td width="70%">
                      <table>
                      <thead>
                          <th>#</th>
                          <th>Escudo</th>
                          <th>Foto</th>
                          <th>Nombre</th>
                          <th>Status</th>
                          <th>Representante</th>
                          <th>telefono</th>                                                    
                          <th> </th> 
                      </thead>     
                          <tbody>
                      {
                          equipos
                          .filter(x=> x.grupoId === grupo.id)
                          .map((equipo, indx)=>(
                              <tr key={equipo.id}>
                                  <td> {indx + 1} </td>
                                  <td>{ showShield(equipo.id) }</td>
                                  <td>{ showPhoto(equipo.id) }</td>
                                  <td>{equipo.nombre}</td>
                                  <td>{equipo.status}</td>
                                  <td>{equipo.nombre_contacto}</td>
                                  <td> {equipo.telefono_contacto} </td>                                        
                                  <td>

                                      <button  onClick={() => {setIdEquipo(equipo.id); setNombreEquipo(equipo.nombre)}} className="btn btn-outline-success" >
                                          jugadores
                                      </button>   

                                      <button  onClick={() => editarImagen(equipo.id,'foto') } className="btn btn-outline-success" >
                                          foto
                                      </button>   

                                      <button  onClick={() => editarImagen(equipo.id,'escudo') } className="btn btn-outline-success" >
                                          escudo
                                      </button>   

                                      <button  onClick={() => editar(equipo)} className="btn btn-default btn-sm" >
                                          <span className="fa fa-edit" aria-hidden="true"></span>
                                      </button>
                                  
                                      <button  onClick={() => eliminar(equipo)} className="btn btn-default btn-sm" >
                                          <span className="fa fa-trash" aria-hidden="true"></span>
                                      </button>                                                
                                  
                                  </td>
                              </tr>
                          ))
                      }
                      
                      </tbody>
                      </table>

                  </td>
              </tr>
          ))
      }

    </tbody>
  </table>



  </>
)

const listaJugadores = (
  <>
      <h5>{nombreEquipo}</h5>
      <button  onClick={() => {setIdEquipo(''); setNombreEquipo('')}} className="btn btn-outline-success" >
          regresar
      </button> 


      <table className="table table-striped">
          <thead>
              <th>#</th>
              <th></th>
              <th>Nombre</th>
              <th>Status</th>                
              <th> </th> 
              <th> </th> 
          </thead>     
          <tbody>

              <tr>
                  <td></td>
                  <td></td>
                  <td>
                      <input 
                          className="form-control"
                          type="text"
                          placeholder="Nombre del jugador"
                          name="jugadorNombre"                                    
                          onChange = { e => setJugadorNombre(e.target.value)  }
                          value={jugadorNombre}                                                                         
                          />
                  </td>
                  <td>
                          <select className="form-control"
                              name="status"
                              value={jugadorStatus}
                              onChange={ e=> setJugadorStatus (e.target.value) } >
                              <option value="Alta">Alta</option>                                
                              <option value="Baja">Baja</option>                                        
                          </select> 

                  </td>
                  <td></td>
                  <td>
                      <button type="button" className="btn btn-primary" onClick={agregarJugador}>Agregar</button>
                  </td>
                  
              </tr>

          {                    
              jugadores
              .filter(x => x.equipoId === idEquipo)
              .map((player, ndx) =>(
                  <tr key={player.id}>
                      <td>{ndx+1} </td>
                      <td>{ showPhotoJugador(player.id) }</td>
                      <td>{player.nombre} </td>
                      <td>{player.status} </td>
                      <td>
                          <button  onClick={() => editarJugador(player)} className="btn btn-default btn-sm" >
                              <span className="fa fa-edit" aria-hidden="true"></span>
                          </button>
                      
                          <button  onClick={() => eliminarJugador(player)} className="btn btn-default btn-sm" >
                              <span className="fa fa-trash" aria-hidden="true"></span>
                          </button>                                                                        
                      </td>
                      
                      <td>
                            <button  onClick={() => editarImagenJugador(player.id) } className="btn btn-outline-success" >
                                foto
                            </button>   
                       </td>
                  </tr>
              ))
          }

          </tbody>
      </table>        
     
  </>
)






  return (
    <>
        {
            torneo == ''
                ? listatorneos
                :   idEquipo == '' 
                    ? listaEquipos 
                    : listaJugadores
        }


        {MyModal}
        {MyModalFoto}
        {MyModalPicture}
        {MyModalConfirmation}
    </>
  )
}

export default Equipos