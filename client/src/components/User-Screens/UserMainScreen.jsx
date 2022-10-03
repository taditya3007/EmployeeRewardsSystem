import { Stack, Text } from "@fluentui/react";
import React, { useEffect } from "react";
import { EthContext } from "../../contexts/EthContext";
import { BadgesList, BadgeTypes } from "../../DemoData/Badges";
import { rewardBalance, transfer, transferQuota } from "../../Utils/ContractFunctions";
import Avatar from "../Avatar";
import NavBar from "../Navbar";
import SendToken from "../SendToken";
import { Toast } from "../Toast";
import UserBadge from "./UserBadge";

export const UserMainScreen = () => {

    const userDetailsJson = require('../../DemoData/userData.json');
    const [updated, setUpdated] = React.useState(true);

    //State to maintain card count
    const [GWCard, setGWCard] = React.useState(0);
    const [TPCard, setTPCard] = React.useState(0);
    const [TYCard, setTYCard] = React.useState(0);

    //For Modal
    const [showModal, setShowModal] = React.useState(false);
    const toggleModal = () => setShowModal(!showModal);
    const [toastMessage, setToastMessage] = React.useState("");

    const toggleUpdate = (alias, cardSent) => {
        setUpdated(!updated);
        //Increment Receiver Card Count
        var prevCount = window.badges[alias]["BadgeCount"][cardSent.key];
        window.badges[alias]["BadgeCount"][cardSent.key] = prevCount + 1;

        setToastMessage("Card Sent Successfully!");
        toggleModal();
    }

    const userDetails = [
        { key: "User", value: "abhishekUpamanyu@ms.com"},
        { key: "Employee Id", value: "123456" },
        { key: "Your Reward balance", value: "1000 MTC" },
        { key: "Peer Transfer balance", value: "100 MTC" }
    ];

    //eslint-disable-next-line
    const [state, dispatch] = React.useContext(EthContext);  
    const [reward, setReward] = React.useState(null);
    const [tranferQuota, SetTranferQuota] = React.useState(null);

    const getRewardBalanceOfUser = async() => {
        if(state.contract === null || state.accounts === null) {
            return;
        }
        var contract = state.contract;
        var account = userDetailsJson[state.alias]["Public Key"];
        setReward(await rewardBalance(contract, account));
    };

    const getTranferQuotaOfUser = async() => {
        if(state.contract === null || state.accounts === null) {
            return;
        }
        var contract = state.contract;
        var account = userDetailsJson[state.alias]["Public Key"];
        SetTranferQuota(await transferQuota(contract, account));
    }

    const getCardsCount = () => {
        if (state.alias === "") {
            return;
        }
        setGWCard(window.badges[state.alias]["BadgeCount"][BadgeTypes.GreatWorkCard]);
        setTPCard(window.badges[state.alias]["BadgeCount"][BadgeTypes.TeamPlayerCard]);
        setTYCard(window.badges[state.alias]["BadgeCount"][BadgeTypes.ThankYouCard]);
    }

    const getEachCardCount = (cardName) => {
        if (cardName === BadgeTypes.GreatWorkCard) return GWCard;
        else if (cardName === BadgeTypes.TeamPlayerCard) return TPCard;
        else return TYCard;
    }

    //Runs when the Pages loads
    // eslint-disable-next-line
    useEffect(() => {
        getRewardBalanceOfUser();
        getTranferQuotaOfUser();
        getCardsCount();
    } , [state.accounts, updated]);// eslint-disable-next-line

    return(
        <React.Fragment>
            <NavBar NavBarHeading = "Microsoft Rewards System"/>
            <Stack
                horizontalAlign = "center"
                verticalFill
                style={{paddingTop: "5rem"}}
            >
                <Stack 
                    horizontalAlign="center" 
                    style={{ width: "70%" }}
                    className="ms-depth-8"
                    id="MainContainer"
                >
                    <Stack
                        horizontal={true}
                        verticalAlign="center"
                        verticalFill
                        style={{width: "100%", display: "flex", padding: "20px" }}
                        id="userProfileDetails"
                    >
                        <Avatar Height="200px" Width="200px"/>
                        <Stack
                            style={{ marginLeft: "30px" , flex: "1", padding: "20px"}}
                            verticalFill
                            verticalAlign="center"
                            // horizontalAlign="center"
                        >
                            {
                                userDetails.map(item => {
                                    const { key, value } = item;
                                    return(
                                        <div style={{ display:"flex", width: "85%", flexDirection: "row" }}>
                                            <Text variant="xLarge" style={{ flex: "1", fontWeight: "400", fontSize: "1.65rem" }}> {key} </Text>
                                            {
                                                key === "User" &&
                                                <Text 
                                                    variant="xLarge" 
                                                    style={{ flex: "1", fontWeight:"400", fontSize: "1.65rem" }}
                                                > 
                                                    {state.alias} 
                                                </Text>
                                            }
                                            {
                                                key === "Employee Id" &&
                                                <Text variant="xLarge" style={{ flex: "1", fontWeight:"400", fontSize: "1.65rem" }}> {value} </Text>
                                            }
                                            {   
                                                key === "Your Reward balance" && 
                                                reward && 
                                                <Text variant="xLarge" style={{ flex: "1", fontWeight:"400", fontSize: "1.65rem" }}> {reward} MSCoins</Text>
                                            }
                                            {
                                                key === "Peer Transfer balance" &&
                                                <Text variant="xLarge" style={{ flex: "1", fontWeight:"400", fontSize: "1.65rem" }}> {tranferQuota} MSCoins</Text>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </Stack>
                    </Stack>
                    <Toast showModal={showModal} closeModal={toggleModal} title={toastMessage}/>
                    <Stack 
                        verticalAlign="center"
                        horizontalAlign="center"
                        style={{ padding: "20px", width: "100%" }}
                        // horizontal=
                    >
                        <Text 
                            variant="xLargePlus" 
                            style={{ marginTop: "20px", width: "100%", boxSizing: "border-box", fontWeight: "400", paddingLeft: "2rem" }}
                        > 
                            Your Badges!! 
                        </Text>
                        <Stack
                            verticalAlign="center"
                            horizontalAlign="center"
                            horizontal={true}
                            style={{ 
                                width: "inherit", 
                                display: "flex", 
                                justifyContent: "left", 
                                padding: "20px 0",
                                // marginLeft: "20px"
                            }}
                            className="ms-Grid"
                        >
                            {
                                BadgesList.map(badge => {
                                    const { cardName, image } = badge;
                                    const count = getEachCardCount(cardName);
                                    return(
                                        <UserBadge W="200px" H="200px" count={count} imageSrc={image}/>
                                    );
                                })
                            }
                        </Stack>
                    </Stack>
                </Stack>
                <Stack 
                    style={{ width: "70%", marginTop: "20px"}}
                    // className="ms-depth-8"
                >
                    <div 
                        style={{ width: "100%", padding: "20px", marginBottom: "50px", boxSizing:"border-box" }}
                        className="ms-depth-8"
                    >
                        <SendToken updated = {toggleUpdate}/>
                    </div>
                </Stack>
            </Stack>
        </React.Fragment>
    )
}

   
    