import { useContext, useRef } from "react";
import UserProgressContext from "../store/UserProgreeContext";
import CartContext from "../store/CartContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/input";
import Button from "./UI/button";
import useHttp from "./hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
  }
};

export default function Checkout() {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const fullName = useRef();
  const emailAddress = useRef();
  const street = useRef();
  const postalCode = useRef();
  const city = useRef();

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleClose = () => {
    userProgressCtx.hideCheckout();
  };

  function handleFinish () {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();

  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customersData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customersData,
        },
      })
    );

    // fetch("http://localhost:3000/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items: cartCtx.items,
    //       customer: customersData,
    //     },
    //   }),
    // });
  }

  let actions = (
    <>
      <Button type="button" onClick={handleClose} textOnly>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }
  if (data && !error) {
    return (
      <Modal open={userProgressCtx.progress === "checkout"}>
        <h2>Success</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get to you with more details via email within the next few
          minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" ref={fullName} type="text" id="name" />
        <Input
          label="Email Address"
          ref={emailAddress}
          type="email"
          id="email"
        />
        <Input label="Street" ref={street} type="text" id="street" />

        <div className="control-row">
          <Input
            label="Postal Code"
            ref={postalCode}
            type="text"
            id="postal-code"
          />
          <Input label="City" ref={city} type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
