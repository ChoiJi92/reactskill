// words.js
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { async } from "@firebase/util";

// Actions
const LOAD = "word/LOAD";
const CREATE = "word/CREATE";
const UPDATE = "word/UPDATE";
const DELETE = "word/DELETE";
const CHECK ='word/CHECK'

const initialState = {
  word_list: []
};

// Action Creators
export function loadWord(word) {
  return { type: LOAD, word };
}

export function createWord(word) {
  return { type: CREATE, word };
}

export function updateWord(word) {
  return { type: UPDATE, word };
}

export function deleteWord(word) {
  return { type: DELETE, word };
}
export function checkWord(word){
  return { type: CHECK, word}
}
// middlewares
export const loadWordFB = () => {
  return async function(dispatch) {
    const word_data = await getDocs(collection(db, 'word'));
      let word_list= [];
      word_data.forEach((doc) => {
        word_list.push({id:doc.id, ...doc.data()})
      })
      console.log(word_list)
      dispatch(loadWord(word_list))
  }
}
export const addWordFB = (word) => {
  return async function(dispatch) {
      const docRef = await addDoc(collection(db,'word'), word)
      const wordlist = await getDoc(docRef)
      const word_data = {id: wordlist.id, ...wordlist.data()}
      dispatch(createWord(word_data))
  }
}
export const updateWordFB = (word) => {
  return async function(dispatch, getState) {
    const docRef = doc(db,'word',word.id)
    await updateDoc(docRef,word)
    const word_list = getState().word.word_list
    const new_word = word_list.map((v) => v.id===word.id ? v=word : v)
    dispatch(updateWord(new_word))
  }
}
export const checkWordFB = (id) => {
  return async function(dispatch, getState){
    const docRef = doc(db,'word',id)
    const word_list = getState().word.word_list
    const new_word = word_list.map((v) => v.id===id ? {...v, is_check: !v.is_check } : v)
    const check = new_word[0].is_check
    await updateDoc(docRef,{is_check : check })
    dispatch(checkWord(new_word))
  }
}
export const deleteWordFB = (id) => {
  return async function(dispatch, getState){
    const docRef = doc(db,'word',id)
    await deleteDoc(docRef)
    const word_list = getState().word.word_list
    const new_word = word_list.filter(v => v.id !== id)
    dispatch(deleteWord(new_word))
    
  }
}
// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'word/LOAD' : {
      return {word_list: action.word};
    }
    case 'word/CREATE' : {
      const new_word_list = [...state.word_list, action.word];
          return {...state, word_list :new_word_list }
    }
    case 'word/UPDATE' : {
        return{...state, word_list : action.word}
    }
    case 'word/CHECK' : {
      return {...state, word_list : action.word}
    }
    case 'word/DELETE' : {
      return {...state, word_list : action.word}
    }
    // do reducer stuff
    default:
      return state;
  }
}

// side effects, only as applicable
// e.g. thunks, epics, etc
// export function getWidget () {
//   return dispatch => get('/widget').then(widget => dispatch(updateWidget(widget)))
// }
