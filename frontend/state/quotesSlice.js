// ✨ create your `quotesSlice` in this module
import { createSlice } from "@reduxjs/toolkit"


let id = 1
const getNextId = () => id++
const initialState = {
  displayAllQuotes: true,
  highlightedQuote: null,
  quotes: [
    {
      id: getNextId(),
      quoteText: "Don't cry because it's over, smile because it happened.",
      authorName: "Dr. Seuss",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "So many books, so little time.",
      authorName: "Frank Zappa",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "Be yourself; everyone else is already taken.",
      authorName: "Oscar Wilde",
      apocryphal: false,
    },
  ],
}

export const quoteSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    toggleVisibility(state, action){
      state.displayAllQuotes = !state.displayAllQuotes
    },
    deleteQuote(state, action){
       state.quotes = state.quotes.filter(qt => 
         qt.id !== action.payload
      )
    },
    editQuoteAuthenticity(state, action){
      state.quotes = state.quotes.map(qt => {
        if(qt.id === action.payload){
          qt.apocryphal = !qt.apocryphal
        }
        return qt
      })
    },
    setHighlightedQuote(state, action){
      if(state.highlightedQuote === action.payload){
        state.highlightedQuote = null
      }else
      state.highlightedQuote = action.payload
    },
    createQuote: {
      prepare({authorName, quoteText}){
        return ({
          payload: {
            authorName,
            quoteText,
            apocryphal: false,
            id: getNextId()
          }
        })
      },
      reducer(state, action){
        state.quotes.push(action.payload)
      }
    }
      
  }
})

export const {
  toggleVisibility,
  deleteQuote,
  editQuoteAuthenticity,
  setHighlightedQuote,
  createQuote
} = quoteSlice.actions

export default quoteSlice.reducer
