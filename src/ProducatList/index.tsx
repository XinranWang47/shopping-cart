import { products } from "./products";
import './styles.css'
import {Action} from '../App'

type Props ={
  dispatch:React.Dispatch<Action>
}

export default function ProductList({dispatch}:Props){
  return <div className="pro-list">
    {products.map(
      item => <div key={item.id} className="product-item">
        <span>{item.name}</span>
        <span>£{item.price}</span>
        <button onClick={()=> dispatch({
          type:'add',payload:{...item,quantity:1}})}>Add to cart</button>
        </div>
    )}
  </div>
}