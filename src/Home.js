import React from "react";
import styled from "styled-components";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkWordFB, deleteWordFB } from "./redux/modules/word";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { ImCheckmark, ImCheckmark2 } from "react-icons/im";
import { BsPencilSquare, BsXLg } from "react-icons/bs";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.word.word_list);
  return (
    <>
      <Container>
        {data.map((v) => {
          return v.is_check ? (
            <Card check={v.is_check}>
              <Button>
                <ImCheckmark
                  id={v.id}
                  onClick={()=> dispatch(checkWordFB(v.id))}
                  size="23"
                  cursor="pointer"
                ></ImCheckmark>
                <BsPencilSquare
                  id={v.id}
                  onClick={()=> history.push(`word/${v.id}/edit`)}
                  size="23"
                  cursor="pointer"
                ></BsPencilSquare>
                <BsXLg size="23" cursor="pointer" onClick={()=> dispatch(deleteWordFB(v.id))}></BsXLg>
              </Button>
              <h2>{v.word}</h2>
              <p>{v.mean}</p>
              <div style={{ color: "blue" }}>{v.example}</div>
              <p style={{ color: "blue" }}>{v.translation}</p>
            </Card>
          ) : (
            <Card check={v.is_check}>
              <Button>
                <ImCheckmark2
                  id={v.id}
                  onClick={()=> dispatch(checkWordFB(v.id))}
                  size="23"
                  color="#3399FF"
                  cursor="pointer"
                ></ImCheckmark2>
                <BsPencilSquare
                  id={v.id}
                  onClick={()=> history.push(`word/${v.id}/edit`)}
                  size="23"
                  color="#3399FF"
                  cursor="pointer"
                ></BsPencilSquare>
                <BsXLg size="23" color="#3399FF" cursor="pointer" onClick={()=> dispatch(deleteWordFB(v.id))}></BsXLg>
              </Button>
              <h2>{v.word}</h2>
              <p>{v.mean}</p>
              <div style={{ color: "blue" }}>{v.example}</div>
              <p style={{ color: "blue" }}>{v.translation}</p>
            </Card>
          );
        })}
      </Container>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: "10px", right: "10px" }}
      >
        <AddIcon
          onClick={() => {
            history.push(`/word/add`);
          }}
        />
      </Fab>
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap:20px;
  justify-content: space-evenly;
  padding: 30px 0;
  width: 100%;
  margin: auto
`;

const Button = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;
const Card = styled.article`
  flex-basis: 400px;
  height: 180px;
  border-radius: 10px;
  border: 2px solid #3399ff;
  padding: 20px;
  margin: 10px;
  position: relative;
  background-color: ${(props) => (props.check ? "#3399ff" : "")};
  color: ${(props) => (props.check ? "white" : "black")};
  transition: box-shadow 300ms ease-in-out;
  :hover{
    box-shadow: rgb(0 0 0 / 80%) 0px 5px 15px 0px;
  }
`;

export default Home;
