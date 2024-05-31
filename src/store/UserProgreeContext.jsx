import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: '',
  showCart: () => {},
  hideCart: () => {},
  showChechout: () => {},
  hideCheckout: () => {}
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState('');

  function showCart() {
    setUserProgress('cart');
  }
  function hideCart() {
    setUserProgress('');
  }
  function showChechout() {
    setUserProgress('checkout');
  }

  function hideCheckout() {
   setUserProgress('');
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart: showCart,
    hideCart: hideCart,
    showChechout:showChechout,
    hideCheckout: hideCheckout
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
