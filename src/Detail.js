import { useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createCards, createCardsFB } from "./redux/modules/cards";
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);

  const posting = () => {
    let a = input1.current.value;
    let b = input2.current.value;
    let c = input3.current.value;
    let d = input4.current.value;
    const times = new Date().getTime();

    // console.log(a, b, c, d);
    let postDictionary = {
      title: a,
      pronun: b,
      subtitle: c,
      desc: d,
      done: false,
      num: times,
    };

    // dispatch(createCards(postDictionary));
    dispatch(createCardsFB(postDictionary));
    navigate(-1);
  };

  return (
    <Container>
      <InputForm>
        <Inputs name="title" placeholder="단어" type="text" ref={input1} />
        <Inputs name="pronun" placeholder="발음" type="text" ref={input2} />
        <Inputs name="subtitle" placeholder="부제" type="text" ref={input3} />
        <Inputs name="desc" placeholder="설명" type="text" ref={input4} />
      </InputForm>
      <DoneBtn onClick={posting}>작성하기</DoneBtn>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  box-shadow: 2px 3px 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: 300px;
  height: 400px;
  margin: 40px auto;
  position: relative;
`;

const InputForm = styled.form`
  margin-top: 40px;
`;

const Inputs = styled.input`
  border: none;
  border-bottom: 2px solid #333;
  width: 80%;
  margin: 10px 0 40px 0;
  &:focus {
    outline: none;
  }
`;

const DoneBtn = styled.button`
  position: absolute;
  bottom: 40px;
  width: 100px;
  height: 30px;
  background-color: transparent;
  border: 1px solid #999;
  transition: ease-in-out 0.3s;
  margin-top: 40px;
  border-radius: 5px;

  &:hover {
    background-color: #333;
    color: #fff;
    border: none;
  }
`;
