import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getBugs,addBug, editBug,  setBugMode} from '../actions/bugsActions'

import { Button, Form, Icon, Input, Modal } from 'semantic-ui-react'


const sistemas = [
    {id:1, nombre:'sigmaver'},
    {id:2, nombre:'ticket'},
    {id:3, nombre:'deploy'},   
  ]

const BugModal = (props) => {

    const [bugId, setBugId] = useState('')
    const [bug_address, setBug_address] = useState('')
    const [bug_description, setBug_description] = useState('')
    const [bug_image, setBug_image] = useState()
    const [bug_date, setBug_date] = useState(new Date())
    const [bug_sistema, setBug_sistema] = useState(0)
 
    const [mode, setMode] = useState('')

    //selectors
    const bugs  = useSelector(state => state.bugs.lista)
    const bugsMode  = useSelector(state => state.bugs.mode)



    const {selectedModal, closeModal} = props;

    //dispatch
    const dispatch = useDispatch()

    useEffect(() => {        
        
        dispatch(getBugs())
        

        if (props.id){

            setMode('edit')

            let record = bugs.filter(x=>x.id == props.id)[0]
            let fecha = record.bug_date.substr(0,10)
            
            setBugId(props.id)
            setBug_address(record.bug_address)
            setBug_description(record.bug_description)
            setBug_sistema(record.bug_sistema)
            setBug_date(fecha)
            setBug_image(record.bug_image)
            

        }else{
            setMode('new')
        }

    },[])

    

     

    const guardar = () => {

        e.preventDefault()
        
         let formData = new FormData()
         
         formData.append('bug_address',bug_address)
         formData.append('bug_description',bug_description)        
         formData.append('bug_image', bug_image, bug_image.name);
         formData.append('bug_date',bug_date)
         formData.append('bug_sistema',bug_sistema)
                          
        bugsMode === 'new' 
            ? dispatch(addBug(formData))
            : dispatch(editBug(formData, bugId))
        
         dispatch(setBugMode('list'))
                
    }


    return (
        <Modal basic open={selectedModal}>
            <Modal.Header>Editar oficio </Modal.Header>
            <Modal.Content>
                <Form>     
             
                <label>Fecha</label><br />
                <Form.Field>                        
                    <input type="date" 
                        id="start"                         
                        name = "bug_date"
                        value= {bug_date}
                        min="2021-01-01" max="2025-12-31" 
                        onChange={ e => setBug_date(e.target.value)}
                        />
                </Form.Field>



                <br/>         
                <label>Descripcion</label><br />
                <Form.Field>                        
                    <input type="text"  
                            name = "bug_description" 
                            value= {bug_description} 
                            onChange={ e => setBug_description(e.target.value)}                         
                    />
                </Form.Field>

                <br/>         
                <label>address</label><br />
                <Form.Field>                        
                    <input type="text"  
                            name = "bug_address" 
                            value= {bug_address} 
                            onChange={ e => setBug_address(e.target.value)}                         
                    />
                </Form.Field>



                <label for="start">Sistema </label><br />
                <select 
                    className="form-control"
                    onChange={ e => setBug_sistema(e.target.value) } 
                    name="bug_sistema"
                    value={bug_sistema}>
                    <option value="null">Seleccine un sistema</option>                                
                    {sistemas.map(x => (
                    <option key={x.id} value={x.id}>
                        {x.id} {x.nombre}
                    </option>
                ))}
                </select>

                <br /><br />
                <button type="button" onClick={guardar}>Guardar</button>
                <button type="button" onClick={() => dispatch(setBugMode('list')) }>Cancelar</button>


                 

                </Form>
            </Modal.Content>

            <Modal.Actions>
                <Button basic color='green' inverted  onClick={ () => guardar() } >
                    <Icon name='checkmark' /> Guardar
                </Button>

                <Button basic color='red' inverted onClick={closeModal}>
                    <Icon name='remove' /> Cancelar
                </Button>            
            </Modal.Actions>    

        </Modal>
    ) 
}

export default BugModal