import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  moreloadWordFB,
  checkWordFB,
  deleteWordFB,
} from "./redux/modules/word";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { ImCheckmark, ImCheckmark2 } from "react-icons/im";
import { BsPencilSquare, BsXLg } from "react-icons/bs";

const Home = () => {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.word.word_list);
  console.log(data)
  const lastdate = useSelector((state) => state.word.lastdate); // date를 기준으로 정렬해서 가져오기때문에 마지막 요소의 date를 알아야함
  const [target, setTarget] = useState(null);
  // 무한스크롤 관련 intersection observer
  const onIntersect = async ([entry], observer) => {
    //entry.isIntersecting은 내가 지금 target을 보고있니?라는 뜻 그 요소가 화면에 들어오면 true 그전엔 false
    if (entry.isIntersecting) { 
      observer.unobserve(entry.target); // 이제 그 target을 보지 않겠다는 뜻
      await dispatch(moreloadWordFB(lastdate));
    }
  };
  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(target); // target을 보겠다!
    }
    return () => {
      observer && observer.disconnect();
    };
  }, [target]);
  return (
    <div>
      <Container>
        {data.map((v, i) => {
          return v.is_check ? (
            <Card
            key={v.id}
              check={v.is_check}
              ref={i === data.length - 1 ? setTarget : null}
            >
              <Button>
                <ImCheckmark
                  id={v.id}
                  onClick={() => dispatch(checkWordFB(v.id))}
                  size="23"
                  cursor="pointer"
                  style={{marginRight:'5px'}}
                ></ImCheckmark>
                <BsPencilSquare
                  id={v.id}
                  onClick={() => history.push(`word/${v.id}/edit`)}
                  size="23"
                  cursor="pointer"
                  style={{marginRight:'5px'}}
                ></BsPencilSquare>
                <BsXLg
                  size="23"
                  cursor="pointer"
                  onClick={() => dispatch(deleteWordFB(v.id))}
                  style={{marginRight:'5px'}}
                ></BsXLg>
              </Button>
              <h2>{v.word}</h2>
              <p>{v.mean}</p>
              <div style={{ color: "white" }}>{v.example}</div>
              <div style={{ color: "white" }}>{v.translation}</div>
            </Card>
          ) : (
            <Card
            key={v.id}
              check={v.is_check}
              ref={i === data.length - 1 ? setTarget : null}
            >
              <Button>
                <ImCheckmark2
                  id={v.id}
                  onClick={() => dispatch(checkWordFB(v.id))}
                  size="23"
                  color="#3399FF"
                  cursor="pointer"
                  style={{marginRight:'5px'}}
                ></ImCheckmark2>
                <BsPencilSquare
                  id={v.id}
                  onClick={() => history.push(`word/${v.id}/edit`)}
                  size="23"
                  color="#3399FF"
                  cursor="pointer"
                  style={{marginRight:'5px'}}
                ></BsPencilSquare>
                <BsXLg
                  size="23"
                  color="#3399FF"
                  cursor="pointer"
                  onClick={() => dispatch(deleteWordFB(v.id))}
                  style={{marginRight:'5px'}}
                ></BsXLg>
              </Button>
              <div>
                <h2>{v.word}</h2>
                <p>{v.mean}</p>
              </div>
              <div style={{ color: "blue" }}>{v.example}</div>
              <div style={{ color: "blue" }}>{v.translation}</div>
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
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  padding: 20px 0;
  width: 100%;
`;

const Button = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const Card = styled.article`
  font-size: 1.3rem;
  flex-basis: 400px;
  border-radius: 10px;
  border: 2px solid #3399ff;
  padding: 20px;
  margin: 10px;
  position: relative;
  background-color: ${(props) => (props.check ? "#3399ff" : "")};
  color: ${(props) => (props.check ? "white" : "black")};
  transition: box-shadow 300ms ease-in-out;
  font-family: "Dongle";
  :hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 5px 15px 0px;
  }
`;

export default Home;
