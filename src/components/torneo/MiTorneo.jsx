import React, {useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getTorneos, addTorneo,editTorneo,deleteTorneo} from '../../actions/TorneoActions'
import {getGrupos, addGrupo, deleteGrupo} from '../../actions/GrupoActions'
import {getEquipos} from '../../actions/EquipoActions'

import { Container, Row, Col, InputGroup, Modal,Form , Button} from 'react-bootstrap'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min'


const MiTorneo = () => {

    const [nombre, setNombre] = useState('')
    const [localidad, setLocalidad] = useState('')
    const [imagen, setImagen] = useState('')
    const [estado, setEstado] = useState('.')
    const [mode, setMode] = useState("new")
    const [id, setId] = useState('')

    const [nombreGrupo, setNombreGrupo] = useState('')    

    const [showModal, setShowModal] = useState(false)
    const [showConfirmationDelete, setShowConfirmationDelete] = useState(false)

    const [showModalGrupo, setShowModalGrupo] = useState(false)
    

    //useSelectors
    const auth = useSelector(state => state.auth)
    //const estados = useSelector(state => state.estados.lista)
    const torneos = useSelector(state => state.torneos.lista)
    const grupos = useSelector(state => state.grupos.lista)
    const equipos = useSelector(state => state.equipos.lista)

    //useDispatch
    const dispatch = useDispatch()

    useEffect(()=>{        
        dispatch(getTorneos())
        dispatch(getGrupos())
        dispatch(getEquipos())                
    },[])
 
    


    const agregar = () => {
        setMode("new")
        setNombre('')
        setLocalidad('')
        setImagen('')
        setEstado('')
    }
    const editar = (item) => {
        setMode("edit")
        setNombre(item.nombre)
        setLocalidad(item.localidad)
        setEstado(item.estado)
        setId(item.id)        
        //$('#MyModal').modal('show')
    }



    const guardarGrupo = (e) =>{        
        e.preventDefault()
        
        let grupo = {
            nombre: nombreGrupo,
            torneo:  id
        }

        dispatch(addGrupo(grupo))
        setNombreGrupo('')
        setShowModalGrupo(false)
    }


    const eliminarGrupo = (grupo)=> {

        let lista = equipos.filter(x=> x.grupoId === grupo)

        if (lista.length > 0){
            alert('No se puede eliminar este grupo porque tiene equipos registrados')
            return
        }
            
        dispatch(deleteGrupo(grupo))

    }


    const closeModal = (e) => {        
        setShowModal(false);
    }

    const closeConfirmationDelete = (e) => {
        setShowConfirmationDelete(false)
    }

    const closeModalGrupo =(e) => {
        setShowModalGrupo(false)
    }

    //torneo
    const guardar = (e) => {
        e.preventDefault()

        if (nombre == '' || localidad == '' || imagen=='') {
            alert('No ha capturado todos los campos')            
            setShowModal(false)
            return
        }


        if (mode == "new") {            

            let arr = torneos.filter(x =>  x.nombre.toUpperCase() == nombre.toUpperCase()) 

            if (arr.length > 0){
                alert('Ya tienes registrado otro torneo con ese mismo nombre')
                return
            }
        }     



        let formdata = new FormData()

        formdata.append('localidad', localidad)
        formdata.append('nombre', nombre)
        formdata.append('estado', estado)
        
        
        if (imagen){            
            formdata.append('imagen', imagen, imagen.name)
            formdata.append('llevaimagen', 1)
        }else{            
            formdata.append('llevaimagen', 0)
        }
        
        formdata.append('user', 1)

        if (mode == "new")                       
            dispatch(addTorneo(formdata))       
        
        if(mode == "edit")
            dispatch(editTorneo(formdata, id))

        setNombre('')
        setLocalidad('')
        setImagen('')
        closeModal()

    }

    //torneo
    const eliminar = (item) => {        

        let lista = grupos.filter(x=> x.torneo === item.id)

        if (lista.length > 0){
            alert('No se puede eliminar este torneo porque tiene grupos registrados')
            return
        }

        setId(item.id)        
        setShowConfirmationDelete(true)        
    }

    //torneo
    const eliminarRegistro = () => {        
        dispatch(deleteTorneo(id))
        setShowConfirmationDelete(false)        
    }




    const MyModalConfirmation = (
        <>
            <Modal show={showConfirmationDelete} onHide={closeConfirmationDelete} size='ls'>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar registro</Modal.Title>                                          
                </Modal.Header>         

                <Modal.Body>                
                    <p> ¿Esta seguro de eliminar el torneo?</p>
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
 


    const MyModal = (
        <>
            <Modal show={showModal} onHide={closeModal} size='lg'>
                <Modal.Header closeButton>
                { mode ? <Modal.Title>Nuevo cliente </Modal.Title>
                          : <Modal.Title>Editar cliente </Modal.Title>
                }
                </Modal.Header> 
        
                <Modal.Body>            
                
 
    
                    <InputGroup className="mb-2">
                        <InputGroup.Text>Nombre</InputGroup.Text>
                        
                        <Form.Control 
                            name="nombre"
                            onChange= { e => setNombre(e.target.value) }                            
                            value= { nombre }
                            />
    
                    </InputGroup>
    
                    <InputGroup className="mb-2">
                        <InputGroup.Text>Localidad</InputGroup.Text>
                        <Form.Control 
                          name="localidad"
                          onChange= { e => setLocalidad(e.target.value) }                            
                          value= { localidad }
                            />
                    </InputGroup>
    

                    <InputGroup className="mb-2">
                        <InputGroup.Text>Imagen</InputGroup.Text>
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


    const MyModalGrupo = (
        <>
            <Modal show={showModalGrupo} onHide={closeModalGrupo} size='lg'>
                <Modal.Header closeButton>
                <Modal.Title>Agregar Grupo </Modal.Title>                            
                </Modal.Header> 
        
                <Modal.Body>            
                
    
    
                    <InputGroup className="mb-2">
                        <InputGroup.Text>Nombre del Grupo</InputGroup.Text>
                        
                        <Form.Control 
                            name="nombreGrupo"
                            onChange= { e => setNombreGrupo(e.target.value) }                            
                            value= { nombreGrupo }
                            />
    
                    </InputGroup>
    
                    
                    
    
    
                </Modal.Body>
            
                <Modal.Footer>
                    <Container>
                        <Row>           
                            <Col xs={8}></Col>                               
    
                            <Col xs={2}>                        
                                <Button variant='success' onClick={guardarGrupo}>
                                    Guardar
                                </Button>                        
                            </Col>
                            <Col xs={2}>
                                <Button  onClick={closeModalGrupo}>
                                    Cancelar
                                </Button>
                            </Col>
                            
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </>
    )


    const Listado =  (
        
        <table className="table table-striped">
        <thead>
            <th>Imagen</th>                
            <th>Localidad</th>                    
            <th>Nombre</th>
            <th>estatus</th>     
            <th></th>
            <th>Grupos</th> 
            <th> </th> 
        </thead>     
        <tbody>
            {                    
                torneos                
                .map(item=>(
                    <tr key={item.id}>
                        <td><img src={"http://localhost:8090/api/resources/" + item.imagen}  alt="imagen" width="120px" height="120px"/> </td>    
                        <td>{item.localidad}</td>
                        <td>{item.nombre}</td>
                        <td>{item.status}</td>                             

                        <td>

                            <button  type="button" onClick={ (e) => { setId(item.id); setShowModalGrupo(true)   }}>
                                + Grupo
                            </button>    
                                
                        </td>

                        <td>
                            <table>
                                <tbody>
                                    { 
                                        grupos
                                        .filter(x => x.torneoId === item.id)
                                        .map(grupo => (
                                            <tr key={grupo.id}>                                                    
                                                <td>
                                                    <button  onClick={() => eliminarGrupo(grupo.id)} className="btn btn-outline-danger" >
                                                        <span className="fa fa-trash" aria-hidden="true"></span>
                                                    </button>                                    
                                                </td>
                                                <td>{grupo.nombre}</td>
                                            </tr>
                                        ))
                                    } 
                                </tbody>
                            </table>

                        
                        </td>                             
                        
                        <td>                                
                            
                        
                            <button  onClick={() => eliminar(item) } className="btn btn-default btn-lg" >
                                <span className="fa fa-trash" aria-hidden="true"></span>
                            </button>                                    

                        </td>
                    </tr>
                ))
            }                               

        </tbody>
    </table>
            
    )

  return (
    <>
 
           <h3>Torneos</h3>
           <button  type="button" onClick={ (e) => { setShowModal(true)   }}>
                + Agregar 
            </button>
           
            {Listado}

            {MyModal}
            {MyModalConfirmation}

            {MyModalGrupo}
           

    

    </>
  )
}

export default MiTorneo