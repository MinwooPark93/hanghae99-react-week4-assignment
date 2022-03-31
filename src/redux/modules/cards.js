// cards.js
import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { async } from "@firebase/util";

// let id = 0;

// 액션
const LOAD = "cards/LOAD";
const CREATE = "cards/CREATE";
const UPDATE = "cards/UPDATE";
const DELETE = "cards/DELETE";
// const UPDATE = "cards/UPDATE";
// const REMOVE = "cards/REMOVE";

// 액션 크리에이터
export const loadCards = (payload) => ({
  type: LOAD,
  payload,
});

export const createCards = (payload) => ({
  type: CREATE,
  payload: { ...payload },
});

export const updateCards = (payload) => ({
  type: UPDATE,
  payload,
});

export const deleteCards = (payload) => ({
  type: DELETE,
  payload,
});

// export function updateWidget(widget) {
//   return { type: UPDATE, widget };
// }

// export function removeWidget(widget) {
//   return { type: REMOVE, widget };
// }

// 이니셜 스테이트 초기값
const initialState = {
  cards: [
    // { title: "react", pronun: "react is so funny", subtitle: "react subtitle", desc: "react is so funny", done: false },
    // { title: "node", pronun: "node is good", subtitle: "node subtitle", desc: "react is so funny", done: false },
    // { title: "vue", pronun: "vue is nice", subtitle: "vue subtitle", desc: "react is so funny", done: false },
  ],
};

// 미들웨어
export const loadCardsFB = () => {
  return async function (dispatch) {
    const cards_data = await getDocs(collection(db, "voca"));
    // console.log(cards_data); /////////////////////////////////////////////////////////////////*****

    let cards_arr = [];

    cards_data.forEach((c) => {
      // console.log(c.id);
      // console.log(c.data());
      cards_arr.push({ id: c.id, ...c.data() });
    });
    // console.log(cards_arr);
    cards_arr.sort((a, b) => b.num - a.num);
    dispatch(loadCards(cards_arr));
  };
};

export const createCardsFB = (payload) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "voca"), payload);
    // const _card = await getDoc(docRef);
    console.log(payload);

    const card = { id: docRef.id, ...payload };

    // console.log((await getDoc(docRef)).data());

    // console.log(card);

    dispatch(createCards(card));
  };
};

export const updateCardsFB = (payload) => {
  return async function (dispatch, getState) {
    // console.log(payload);
    const docRef = await doc(db, "voca", payload.id);
    updateDoc(docRef, { done: !payload.done });

    // dispatch(updateCards(payload));
    // console.log(getState().cards)
    const _card_list = getState().cards.cards;
    const card_index = _card_list.findIndex((c) => {
      return c.id === payload.id;
    });
    dispatch(updateCards(card_index));
    // console.log(card_index)
  };
};

export const deleteCardsFB = (payload) => {
  return async function (dispatch, getState) {
    if (!payload.id) {
      window.alert("아이디가 없습니다.");
      return;
    }
    const docRef = doc(db, "voca", payload.id);
    await deleteDoc(docRef);

    const _card_list = getState().cards.cards;
    const card_index = _card_list.findIndex((c) => {
      return c.id === payload.id;
    });

    dispatch(deleteCards(card_index));
    console.log(card_index);
  };
};

// 리듀서
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return { cards: action.payload };

    // case CREATE:
    //   // id++;
    //   return {
    //     cards: [...state.cards, action.payload],
    //   };

    case UPDATE: {
      // console.log("이제 완료할거야!");
      // console.log(state, action);
      const new_cards_list = state.cards.map((cur, idx) => {
        return parseInt(action.payload) === idx ? (cur.done !== true ? { ...cur, done: true } : { ...cur, done: false }) : cur;
        // if (parseInt(action.payload) === idx) {
        //   return { ...cur, done: true };
        // } else {
        //   return cur;
        // }
      });
      // console.log({ cards: new_cards_list });
      return { cards: new_cards_list };
    }

    case DELETE:
      console.log("스테이트 카즈" + state.cards);
      console.log("액션 페이로드" + action.payload);
      return {
        cards: state.cards.filter((cur, idx) => idx !== action.payload),
      };

    default:
      return state;
  }
}
