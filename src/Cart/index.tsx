import {CartItem,Action} from '../App'
import { FaPlus,FaMinus } from "react-icons/fa";
import './cart.css'

type Props ={
  state:CartItem[]
  dispatch:React.Dispatch<Action>
}

export default function Cart({state,dispatch}:Props){
  return <div>
    {
      state.map(item =>
        <div key={item.id} className='cart-item'>
          <span>{item.name}</span>
          <span className='quan-span'><FaMinus style={{cursor:'pointer'}} onClick={()=>dispatch(
            {
              type:'decrement',payload:{id:item.id}
            }
          )}/>quantity:{item.quantity} <FaPlus style={{cursor:'pointer'}} onClick={
           ()=>dispatch({
            type:'increment',payload:{id:item.id}
          })
          }/></span>
          <span>price:{item.price * item.quantity}</span>
          <button onClick={()=>dispatch(
            {
              type:'delete',payload:{id:item.id}
            }
          )}>Delete</button>
        </div>
      )
    }
    {state.length === 0?
    <h3>Your cart is empty</h3>
    :(<h3>Total price:    £{state.reduce((sum,item)=>{
    return sum + item.price * item.quantity},0).toFixed(2)}</h3>)}
  </div>
}