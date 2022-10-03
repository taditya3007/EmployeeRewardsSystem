const actions = {
  toggleLogin: "toggleLogin",
  init: "INIT",
  store_PublicKey: "STORE_PUBLICKEY",
};

const initialState = {
  alias : "",
  isLoggedIn: false,
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null,
  balance: null,
  userPublicKey: null,
};

const reducer = (state, action) => {
  const { type, data } = action;
  // console.log("Somethinf");
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    case actions.store_PublicKey:
      return {...state, ...data};
    case actions.toggleLogin:
      return{...state, ...data};
    default:
      console.log("Undefined reducer action type");
  }
};

export {
  actions,
  initialState,
  reducer
};
