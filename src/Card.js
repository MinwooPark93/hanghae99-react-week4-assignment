import React from "react";
import styled from "styled-components";
import { BsCheckLg } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { deleteCards, deleteCardsFB, updateCards, updateCardsFB } from "./redux/modules/cards";
// import { ListGroup } from "react-bootstrap";

const Card = () => {
  const data = useSelector((state) => state.cards.cards);
  // console.log(data);

  const dispatch = useDispatch();

  // const [post, setPost] = useState([
  //   { title: "react", subtitle: "react subtitle", desc: "react is so funny" },
  //   { title: "node", subtitle: "node subtitle", desc: "node is good" },
  //   { title: "vue", subtitle: "vue subtitle", desc: "vue is nice" },
  // ]);

  return (
    <CardContainer className="container">
      <CardRow className="row">
        {data.map((cur, idx) => {
          return (
            <CardBox done={cur.done} className="col-md-4" key={idx}>
              <Btns>
                <BsCheckLg
                  style={{ height: "100%", width: "25%", cursor: "pointer" }}
                  onClick={() => {
                    // dispatch(updateCards(idx));
                    dispatch(updateCardsFB(cur));
                    // console.log(cur);
                  }}
                />
                <MdModeEdit style={{ height: "100%", width: "25%", cursor: "pointer" }} />
                <RiDeleteBack2Fill
                  style={{ height: "100%", width: "25%", cursor: "pointer" }}
                  onClick={() => {
                    // dispatch(deleteCards(cur.id));
                    dispatch(deleteCardsFB(cur));
                  }}
                />
              </Btns>
              <Title>{cur.title}</Title>
              <SubTitle style={{ color: "#999" }}>[ {cur.pronun} ]</SubTitle>
              <SubTitle>{cur.subtitle}</SubTitle>
              <DescriptionBox>
                <Description done={cur.done}>{cur.desc}</Description>
              </DescriptionBox>
            </CardBox>
          );
        })}
      </CardRow>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  width: 100vw;
  margin-top: 1vh;
`;

const CardRow = styled.div`
  max-width: 1200px;
  display: flex;
  margin: auto;
`;

const CardBox = styled.div`
  position: relative;
  width: 280px;
  height: 250px;
  box-shadow: 2px 3px 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 10px auto;
  overflow: hidden;
  transition: ease-in-out 0.2s;
  background-color: ${(props) => (props.done ? "#333" : "transparent")};
  color: ${(props) => (props.done ? "#fff" : "#333")};
`;

const Btns = styled.div`
  position: absolute;
  right: 10px;
  top: 20px;
  width: 80px;
  height: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 28px;
  text-align: left;
  margin: 14px 0 10px 10px;
  width: 60%; ;
`;

const SubTitle = styled.h3`
  margin: 14px 0 10px 10px;
  width: 60%;
  text-align: left;
`;

const DescriptionBox = styled.div`
  height: 120px;
  overflow-y: scroll;
  max-width: 100%;
  margin-top: 20px;
  text-align: left;
  margin: 14px 0 10px 10px;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: #eee;
    border-radius: 10px;
  }
`;

const Description = styled.p`
  transition: ease-in-out 0.2s;
  color: ${(props) => (props.done ? "#fff" : "blue")};
`;
