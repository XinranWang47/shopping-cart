import './App.css'
import ProductList from './ProducatList'
import Cart from './Cart'
import {useReducer } from 'react'

export type CartItem = {
  id:number    
  name:string
  quantity:number
  price:number
}
export type Action = {
  type:'add',payload:CartItem
} | {
  type:'increment',payload:{id:number}
} | {
  type:'decrement',payload:{id:number}
} | {
  type:'delete',payload:{id:number}
}

function App() {
  const reducer = (state:CartItem[],action:Action):CartItem[] => {
      switch(action.type){
       case 'add':
        const existing = state.find(item => item.id === action.payload.id)
        if(existing){
          return state.map(
            item => item.id === action.payload.id?
            {...item,quantity:item.quantity + 1}
            :item
          )
        }else{
          return [...state,{...action.payload,quantity:1}]
        }
       case 'increment':
        return state.map(
          item => item.id === action.payload.id?
          {...item,quantity:item.quantity + 1}
          :item
        )
       case 'decrement':
        return state.map(
          item => item.id === action.payload.id?
          {...item,quantity:item.quantity - 1}
          :item
        )
        .filter(item => item.quantity > 0)
       case 'delete':
        return state.filter(
          item => item.id !== action.payload.id
        )
        default:
          return state;
      }
    }
    const [state,dispatch] = useReducer(reducer,[])
    
    return <div className='whole-page'>
        <ProductList dispatch={dispatch}/>
        <Cart state={state} dispatch={dispatch}/>
        </div>
  }

export default App