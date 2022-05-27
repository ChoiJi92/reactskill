import React, { useEffect } from "react";
import Home from "./Home";
import WordAdd from "./WordAdd";
import WordUpdate from "./WordUpdate";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadWordFB } from "./redux/modules/word";

function App() {
  const dispatch = useDispatch()

  useEffect( async ()=>{
      await dispatch(loadWordFB())
  },[])

  return (
    <div className="App">
      <Container>영어 단어장</Container>
      <Switch>
        <Route path= '/' exact>
          <Home />
        </Route>
        <Route path="/word/add" exact>
          <WordAdd/>
        </Route>
        <Route path="/word/:id/edit" exact>
          <WordUpdate/>
        </Route>
      </Switch>
    </div>
  );
}

const Container = styled.div`
  border-bottom: 2px solid #CCE5FF;
  color: black;
  font-size: x-large;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
`;

export default App;
