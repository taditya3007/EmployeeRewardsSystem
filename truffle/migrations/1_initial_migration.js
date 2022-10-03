const Migrations = artifacts.require("Migrations");
const MockToken = artifacts.require("MockToken");

module.exports = async function(deployer) {
    await deployer.deploy(Migrations);
    await deployer.deploy(MockToken);

    const token = await MockToken.deployed();

    await token.mint(
        '0xF64dbaEF728f0867fefd88A25EDb729A3cdB0Bce',
        '500'
    );

    await token.mint(
        '0x11CfB7B20d35b8D97D7185Ca2EE6e34C921463ce',
        '500'
    );
};
