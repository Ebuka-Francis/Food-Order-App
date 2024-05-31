import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Header from "./Components/Header";
import Meal from "./Components/Meal";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgreeContext";

function App() {
  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <Meal />
          <Cart />
          <Checkout />
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;
