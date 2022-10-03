// import React from "react";
// import EthContext from "../contexts/EthContext/EthContext";

export async function rewardBalance(contract, account) {
    return await contract.methods.balanceOf(account).call();
}

export async function transferQuota(contract, account) {
    // var contract = this.getContract();
    return await contract.methods.allowance(account, account).call(); 
}

export async function transfer(contract, sender, recipient, amount) {
    // console.log();
    return await contract.methods.transfer(recipient, amount).send({from: sender});
}