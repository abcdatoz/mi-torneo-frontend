import axios from 'axios'


export const  REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const  LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const  REGISTER_FAIL = 'REGISTER_FAIL'
export const  LOGIN_FAIL = 'LOGIN_FAIL'

const urlbase ='http://localhost:8090/api/'

export const  login = (username, password) => dispatch => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

 
    const body = JSON.stringify({username, password})    

 
    
    axios.post( urlbase + 'auth/signin', body, config)
    .then(res => {
        console.log(res.data)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { ...res.data, accessToken: res.data.accessToken}
            //payload: res.data
        })
    })
    .catch( err => {
        console.log(err)
        dispatch({
            type: LOGIN_FAIL
        })
    })

}


export const register = ({username, password, email}) => dispatch => {
    const config = {
        headers: { 'Content-Type':'application/json'}
    }


    const body = JSON.stringify({username, email, password, 'roles': ['user', 'moderator']});

    axios.post(urlbase +  'auth/signup', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({ 
                type: REGISTER_FAIL
            })
        })
}


export const logout = () => (dispatch, getstate) =>{
    dispatch({ type: LOGOUT_SUCCESS})
}


 

export const tokenConfig = getState => {
    const token = getState().auth.accessToken;

    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token){
        config.headers['x-access-token'] = token
    }

    return config
}



export const tokenConfigMultipart = getState => {
    const token = getState().auth.accessToken;

    const config ={
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    if (token){
        config.headers['x-access-token'] = token
    }

    return config
}


