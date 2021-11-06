const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return {
        ...state, //!ALWAYS RETURN THE OLD STATE AND UNDER IT THE VALUES THAT ARE UPDATED
        cart: [],
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };

    case "GET_TOTAL": {
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemsTotal = price * amount;

          cartTotal.total += itemsTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2)); //? limit the num after .

      return { ...state, total, amount };
    }

    case "LOADING": {
      return { ...state, loading: true };
    }

    case "DISPLAY_ITEMS": {
      return { ...state, cart: action.payload, loading: false };
    }
    case "TOGGLE_AMOUNT": {
        console.log(state);
      let tempCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === action.payload.id) {
            if (action.payload.type === "inc") {
              return { ...cartItem, amount: cartItem.amount + 1 };
            }
            if (action.payload.type === "dec") {
              return { ...cartItem, amount: cartItem.amount - 1 };
            }
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.amount !== 0);
      return { ...state, cart: tempCart };
    }
    default:
      throw new Error("Check your input");
  }
};

export default reducer;
