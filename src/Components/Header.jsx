import { useContext } from 'react';

import Button from './UI/button';
import logoImg from '../assets/logo.jpg'; 
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgreeContext';

export default function Header() {
const cartCtx = useContext(CartContext);
const userProgressCtx = useContext(UserProgressContext);

const totalCartItems = cartCtx.items.reduce((totalNumberOfItmes, item) => {
    return totalNumberOfItmes + item.quantity;
}, 0);

function handleOpenCart() {
    userProgressCtx.showCart();
}


    return <header id="main-header"> 
        <div id="title">
            <img src={logoImg} alt='A restaurant' />
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button onClick={handleOpenCart} textOnly>Cart ({totalCartItems})</Button>
        </nav>
    </header>
}