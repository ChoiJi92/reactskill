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
} from "firebase/firestore";
import { async } from "@firebase/util";
import { create } from "@mui/material/styles/createTransitions";

// action
const LOAD = 'word/LOAD'
const CREATE = 'word/CREATE'
const UPDATE = 'word/UPDATE'
// initial
const initialState = {
    word_list:[]
}
// action creator
export function loadWord(word){
    return {type:LOAD, word}
}
export function addWord(word){
    return {type: CREATE, word}
}
export function updateWord(word){
    return {type: UPDATE, word}
}
// middleware
export const loadWordFB = (id) => {
    return async function(dispatch,getState) {
        const docRef = await getDocs(collection(db,'word'))
        const word_list = []
        docRef.forEach((doc)=>{
            word_list.push({id: doc.id, ...doc.data()})
        })

        dispatch(loadWord(word_list))
        
    }
}
export const addWordFB = (word) => {
    return async function(dispatch,getState){
        const docRef = await addDoc(collection(db,'word'),word)
        const data = await getDoc(docRef)
        const new_data = {id:data.id, ...data.data()}

        dispatch(addWord(new_data))
    }
}
export const updateWordFB = (word) => {
    return async function(dispatch,getState){
        const docRef = await doc(db,'word',word.id)
        const data = getState().word.word_list
        updateDoc(docRef, word)
        const new_list = data.map(v=> v.id === word.id ? v=word :  v)

        dispatch(addWord(new_list))


    }
}
// reducer

export default function reducer (state=initialState, action={}) {
    switch(action.type){
        case 'word/LOAD' : {

            return{word_list:action.word}
        }
        case 'word/CREATE' : {
            const new_word_list = [...state.word_list, action.word]
            return {...state, word_list:new_word_list}
        }
        case 'word/CREATE' : {
            return{...state, word_list :action.word}
        }
    }

}