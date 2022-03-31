import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import { Navbar, Container } from "react-bootstrap";
import { db } from "./firebase";
import { useDispatch } from "react-redux";
import { loadCardsFB } from "./redux/modules/cards";
// import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container className="justify-content-center py-2">
          <Navbar.Brand as={Link} to="/">
            INSSA VOCA
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/detail" element={<Detail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
