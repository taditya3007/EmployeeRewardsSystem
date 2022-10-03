import { Dropdown, PrimaryButton, SearchBox, Stack, Text, Image } from "@fluentui/react";
import React , { useState } from "react";
import Avatar from "./Avatar";
import { IconButton } from '@fluentui/react/lib/Button';

import X from '../assets/x.png';
import { transfer } from "../Utils/ContractFunctions";
import { EthContext } from "../contexts/EthContext";
import { BadgeTypes, BadgesList } from "../DemoData/Badges";

const SendToken = ({ updated }) => {

    // eslint-disable-next-line
    const [state, dispatch] = React.useContext(EthContext);
    
    //importing the json files
    const userDetailsJson = require('../DemoData/userData.json');
    const badgesDetails = require('../DemoData/BadgeData.json');

    //Alias
    const [alias, setAlias] = useState("");
    const [searchBoxAlias, setSearchBoxAlias] = useState("");
    const [selectedCard, setSelectedCard] = useState("");
    // const [selectedCardIndex, setSelectedCardIndex] = useState("");

    const resetState = () => {
        setAlias("");
        setSearchBoxAlias("");
        // setSelectedCard("");
    }

    const setAliasToSearch = (newValue) => {

        if (userDetailsJson[newValue] === undefined) {
            console.log("No such Alias Exist in Database");
            return;
        }

        setAlias(newValue);
        setSearchBoxAlias("");
    }

    const removeSearchedAlias = () => setAlias("");

    const dropdownStyles = {
        dropdown: { width: "100%" },
    };

    const options = [
        { key: BadgeTypes.ThankYouCard, text: BadgeTypes.ThankYouCard + " (" + BadgesList[2].value + " MSCoins)" },
        { key: BadgeTypes.TeamPlayerCard, text: BadgeTypes.TeamPlayerCard + " (" + BadgesList[1].value + " MSCoins)" },
        { key: BadgeTypes.GreatWorkCard, text: BadgeTypes.GreatWorkCard + " (" + BadgesList[0].value + " MSCoins)" }
    ]

    const sendCardToPeer = async () => {

        if (userDetailsJson[alias] === undefined) {
            console.log("You Have Not Entered the Alias.");
            return;
        }

        const contract = state.contract;
        const senderAccount = state.userPublicKey;
        const receiverAccount = userDetailsJson[alias]["Public Key"];
        const amount = badgesDetails[selectedCard.key]["value"];

        await transfer(contract, senderAccount, receiverAccount, amount)
        .then(success => {
            // Successfully Transferred;
            if(success.status) {
                updated(alias, selectedCard);
                resetState();
            } else {
                console.log("Failed Transaction");
            }
        })
        .catch(err => console.log("Some Error Occured: ", err));
    };

    return(
        <React.Fragment>
            <Text variant="xLargePlus" style={{fontWeight: "400"}}> Send a Badge!! </Text>
            <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: "30px" }}>
                <div>
                    <Text variant="mediumPlus" > Alias </Text>
                    <div style={{ marginBottom: "10px" , marginTop: "7px"}}>
                        <SearchBox 
                            placeholder="Search"  
                            value={searchBoxAlias}
                            onSearch={newValue => setAliasToSearch(newValue)} 
                            style={{ width: "100%"}} 
                            onChange = {(event) => setSearchBoxAlias(event.target.value)}
                        />
                    </div>
                    { alias && <AliasComponent alias={alias} removeSearchedAlias = {removeSearchedAlias}/>}
                    <Dropdown 
                        placeholder="Select Badges"
                        label="Badges"
                        options={options}
                        styles={dropdownStyles}
                        onChange = {(event, item, idx) => { 
                            setSelectedCard(item);
                            // setSelectedCardIndex(idx);
                        }}
                        // selectedKey={se}
                    />
                    <div style={{ widhth: "100%" , marginTop: "20px"}}>
                        <PrimaryButton onClick={() => sendCardToPeer()}> Send Card </PrimaryButton>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};


const AliasComponent = ({ alias , removeSearchedAlias }) => {

    const emojiIcon = { iconName: 'AcceptIcon' };

    return(
        <Stack style={{
            width: "fit-content",
            height: "30px",
            borderRadius: "5px",
            // backgroundColor: "#f7f7f7",
            padding: "10px",
            display: "flex",
            justifyContent: "space-around"
        }}
            horizontalAlign="center"
            verticalAlign="center"
            horizontal={true}
            verticalFill
        >
            <div>
                <Avatar 
                    Height="15px" 
                    Width="15px" 
                    FontSize="10px"
                    BorderRadius="50px"
                    BackgroundColor="#f7f7f7"
                    Padding="10px"
                />
            </div>
            <div style={{ marginLeft: "10px"}}>
                <Text style={{ fontSize: "1.55rem"}} variant="large"> {alias} </Text>
            </div>
            <IconButton
                style={{ marginLeft: "10px" , color: "black"}}
                iconProps={emojiIcon}
                onClick={() => removeSearchedAlias() }
            >
                <Stack
                    horizontalAlign="center"
                    verticalAlign="center"
                    verticalFill
                >
                    <Image src={X}/>
                </Stack>
            </IconButton>
        </Stack>
    )
}

export default SendToken;