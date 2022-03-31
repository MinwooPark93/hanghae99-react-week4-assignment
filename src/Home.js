import React from "react";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCardsFB } from "./redux/modules/cards";

import styled from "styled-components";

import Card from "./Card";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(loadCardsFB());
    // console.log(db);

    // 데이터 가져오기
    // const query = await getDocs(collection(db, "voca"));
    // console.log(query);
    // query.forEach((doc) => {
    //   console.log(doc.id, doc.data());

    // 데이터 추가하기
    // addDoc(collection(db, "voca"), { text: "new", done: false });

    // 데이터 수정하기
    // const docRef = doc(db, "voca", "hJvBV59edYUJCLhedGgT");
    // updateDoc(docRef, { done: true });

    // 데이터 삭제하기
    // const docRef = doc(db, "voca", "usGQDHbDna7JCMIeam2t");
    // deleteDoc(docRef);

    // addDoc(collection(db, "vocas"), { text: "new", done: false });
  }, []);
  return (
    <>
      <Card />
      <ToTopBtn
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <ToTopBtnSpan>위로가기</ToTopBtnSpan>
      </ToTopBtn>
      <Btn as={Link} to="/Detail">
        <BsPlusLg />
      </Btn>
    </>
  );
};

export default Home;

const Btn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #333;
  color: #333;
  font-size: 30px;
  transition: ease-in-out 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #333;
    color: #fff;
    transform: rotateZ(360deg);
  }
`;

const ToTopBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 120px;
  right: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #333;
  color: #333;
  font-size: 30px;
  transition: ease-in-out 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #333;
    color: #fff;
    transform: translateY(-10px) scale(1.1);
  }
`;

const ToTopBtnSpan = styled.div`
  font-size: 12px;
`;
