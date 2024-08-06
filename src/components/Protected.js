import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Protected(props) {
    const { Component} = props;
    const navigate = useNavigate()

    useEffect(()=>{
        // let login = localStorage.getItem('login');
        console.log('uk')
        // if(!login){
        //     console.log('in login')
        //     navigate('/login')
        // }
    })
    console.log('in protected component')
  return (
    <div>
        <Component/>

    </div>
  )
}

export default Protected