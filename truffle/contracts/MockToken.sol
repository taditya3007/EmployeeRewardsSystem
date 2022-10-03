// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockToken is ERC20, Ownable {

    mapping (address => uint256) private mintedBalance; //TODO: Transfer method should remove update minted balance

    constructor() ERC20("MockToken", "MSC") {}

    /*
    Creates the currency
    "onlyOwner" ensures that this method can only be called by the Issuer of the currency.
    */
    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "ERC20: mint to the zero address");

        mintedBalance[to] += amount;

        _mint(to, amount);
    }

    // rewards earned
    function balanceOf(address account) public view virtual override returns (uint256) {
        return super.balanceOf(account) - mintedBalance[account];
    }

    // minted balance
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        require(spender == owner, "Just to ignore warning");
        return mintedBalance[owner];
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(amount <= mintedBalance[msg.sender], "Insufficient coins");
        bool success = super.transfer(to, amount);
        if(success){
            mintedBalance[msg.sender] -= amount;
            return true;
        }
        return false;
    }
}
