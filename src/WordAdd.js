import React from "react";
import styled from "styled-components";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWordFB } from "./redux/modules/word";


const WordAdd = () => {
  const word = React.useRef();
  const mean = React.useRef();
  const example = React.useRef();
  const translation = React.useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const wordadd = () => {
    const wordvalue = word.current.value;
    const meanvalue = mean.current.value;
    const examplevalue = example.current.value;
    const translationvalue = translation.current.value;
    if (
      wordvalue === "" ||
      meanvalue === "" ||
      examplevalue === "" ||
      translationvalue === ""
    ) {
      alert("아직 입력하지 않은 항목이 있습니다.");
    } else {
      dispatch(
        addWordFB({
          word: wordvalue,
          mean: meanvalue,
          example: examplevalue,
          translation: translationvalue,
          is_check: false
        })
      );
      history.goBack();
    }
  };

  return (
    <Container>
      <div style={{color:'#0000FF', fontSize:'large'}}>단어 추가하기</div>
      <Input>
        <label for="input-word">단어</label>
        <input ref={word} id="input-word"></input>
      </Input>
      <Input>
        <label for="input-mean">의미</label>
        <input ref={mean} id="input-mean"></input>
      </Input>
      <Input>
        <label for="input-example">예문</label>
        <input ref={example} id="input-example"></input>
      </Input>
      <Input>
        <label for="input-translation">해석</label>
        <input ref={translation} id="input-translation"></input>
      </Input>
      <Button onClick={wordadd}>저장하기</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;
const Input = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  color: #0080FF;

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
  font-size: large;
  border: none;
  cursor: pointer;
`;
export default WordAdd;
