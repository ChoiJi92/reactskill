import React, { useState } from "react";
import styled from "styled-components";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWordFB } from "./redux/modules/word";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
    const id = React.useRef()
    const password = React.useRef()
    const [newAccount, setNewAccount] = useState(true)
    const history = useHistory()
   
    const login = async () =>{
        try{
        const auth = getAuth()
        if(newAccount){ 
           await createUserWithEmailAndPassword(
                auth, id.current.value, password.current.value
            )
            setNewAccount(false)
            
        }else{
            await signInWithEmailAndPassword(auth, id.current.value, password.current.value)
            history.push('/word')
        }
    }
    catch(error){
        console.log(error)
    }
    }
    return(
        <Container>
            {newAccount ? <div style={{color:'#0000FF', fontSize:'2rem'}}>회원가입</div>
            : <div style={{color:'#0000FF', fontSize:'2rem'}}>로그인</div>}
        <Input>
          <label htmlFor="input-id">아이디</label>
          <input ref={id} id="input-id" type='email' required></input>
        </Input>
        <Input>
          <label htmlFor="input-password">비밀번호</label>
          <input ref={password} id="input-password" type='password' required></input>
        </Input>
        {newAccount ? <Button onClick={login} >회원가입</Button >:<Button onClick={login}>로그인</Button> }
      </Container>
    )
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  font-family: 'Dongle';
  
`;
const Input = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  color: #0080FF;
  font-size: 1.5rem;

  input {
    width: 400px;
    height: 20px;
    border: none;
    border-bottom: 2px solid #CCE5FF;
  }
  & input:focus {
    outline: none;
    border-bottom: 2px solid #66B2FF;
  }
`;
const Button = styled.button`
  width: 200px;
  height: 50px;
  background-color: #000099;
  color: white;
  margin: 20px;
  font-size: 2rem;
  border: none;
  cursor: pointer;
  font-family: 'Dongle';
`;
export default Login;