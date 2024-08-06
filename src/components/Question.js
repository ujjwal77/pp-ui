import React,{useEffect} from 'react';
import '../Chats.css';
import ChatContainer from './Chat-Container'
import { useLocation, useNavigate } from "react-router-dom";

function Question() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state === null || state === undefined){
      navigate('/login');
    }
  }, [state]);

  if (state === null || state === undefined) {
    return <></>;
  }
  else {
    return (
      <div className='question'>
        <ChatContainer user_name={state.user_name}/>
      </div>
    )
  }
 
}

export default Question