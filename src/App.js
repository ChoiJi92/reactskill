import React, { useEffect, useState } from "react";
import Home from "./Home";
import WordAdd from "./WordAdd";
import WordUpdate from "./WordUpdate";
import styled from "styled-components";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearWord, loadWordFB } from "./redux/modules/word";
import GlobalFonts from "./fonts/fonts";
import { async } from "@firebase/util";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    async function load() {
      await dispatch(loadWordFB());
      setIsLoaded(false);
      return () => {
        dispatch(clearWord());
        // setIsLoaded(true)
      };
    }
    load();
  }, [dispatch]);
  // useEffect( async () => {
  //     await dispatch(loadWordFB())

  //     return ()=>{
  //       dispatch(clearWord())
  //     }
  // },[dispatch])
  return (
    <div className="App">
      <GlobalFonts />
      <Container
        onClick={() => {
          history.push("/");
        }}
      >
        영어 단어장
      </Container>
      <Switch>
        <Route path="/" exact>
          {!isLoaded && <Home />}
        </Route>

        <Route path="/word/add" exact>
          <WordAdd />
        </Route>
        <Route path="/word/:id/edit" exact>
          {!isLoaded && <WordUpdate />}
        </Route>
      </Switch>
    </div>
  );
}

const Container = styled.div`
  border-bottom: 2px solid #cce5ff;
  color: black;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  cursor: pointer;
  font-family: "Dongle";
`;

export default App;
