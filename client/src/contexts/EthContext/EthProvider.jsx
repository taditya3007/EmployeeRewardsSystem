import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
// import { rewardBalance, transfer, transferQuota } from "../../Utils/ContractFunctions";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifact => {
      if (artifact) {
        const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
        const accounts = await web3.eth.getAccounts();
        const networkID = await web3.eth.net.getId();
        const balance = await web3.eth.getBalance(accounts[0]);
        const { abi } = artifact;
        let address, contract;
        
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);

        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract, balance }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/MockToken.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={[
      state,
      dispatch
    ]}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
