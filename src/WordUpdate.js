import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { updateWordFB } from "./redux/modules/word";

const WordUpdate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const data = useSelector((state) => state.word.word_list).filter(
    (v) => v.id === params.id
  );
  const word = React.useRef();
  const mean = React.useRef();
  const example = React.useRef();
  const translation = React.useRef();
  const [inputs,setInputs] = React.useState({
      word:data[0].word,
      mean:data[0].mean,
      example:data[0].example,
      translation:data[0].translation
  })
  const onChange = (e) => {
      const {value, name} = e.target
      setInputs({
          ...inputs, [name] : value
      })
      
  }
  const wordupdate = () => {
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
        updateWordFB({
          id: params.id,
          word: wordvalue,
          mean: meanvalue,
          example: examplevalue,
          translation: translationvalue,
          is_check : data[0].is_check,
          date: data[0].date
        })
      );
      history.goBack();
    }
  };
  return (
    <Container>
      <div style={{ color: "#0000FF", fontSize:'2rem' }}>단어 수정하기</div>
      <Input>
        <label for="input-word">단어</label>
        <input name = 'word' ref={word} id="input-word" value={inputs.word} onChange={onChange}></input>
      </Input>
      <Input>
        <label for="input-mean">의미</label>
        <input name ='mean' ref={mean} id="input-mean" value={inputs.mean} onChange={onChange}></input>
      </Input>
      <Input>
        <label for="input-example">예문</label>
        <input name ='example' ref={example} id="input-example" value={inputs.example} onChange={onChange}></input>
      </Input>
      <Input>
        <label for="input-translation">해석</label>
        <input
            name ='translation'
          ref={translation}
          id="input-translation"
          value={inputs.translation}
          onChange={onChange}
        ></input>
      </Input>
      <Button onClick={wordupdate}>수정하기</Button>
    </Container>
  );
};

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
  color: #0080ff;
  font-size: 1.5rem;

  input {
    width: 400px;
    height: 20px;
    border: none;
    border-bottom: 2px solid #cce5ff;
  }
  & input:focus {
    outline: none;
    border-bottom: 2px solid #66b2ff;
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

export default WordUpdate;
