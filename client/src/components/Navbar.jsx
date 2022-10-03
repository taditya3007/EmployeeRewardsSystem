import { Stack, Text, Image, PrimaryButton } from "@fluentui/react";
import React from "react";

//MS Logo
import MSLogo from '../assets/MSLogo.png';
import { actions, EthContext } from "../contexts/EthContext";

const NavBar = ({ NavBarHeading }) => {
    
    //eslint-disable-next-line
    const [state, dispatch] = React.useContext(EthContext);
    const logoutUser = () => {
        const isLoggedIn = false;
        dispatch({
            type: actions.toggleLogin,
            data: { isLoggedIn }
        });
    }

    return(
        <React.Fragment>
            <div style={{
                width: "100%",
                backgroundColor: "#f7f7f7",
                height: "80px"
            }}
                className="ms-depth-4"
            >
                <Stack
                    horizontal
                    verticalAlign="center"
                    style={{boxSizing: "border-box", padding: "0 2rem"}}
                >
                    <Stack verticalAlign="center" horizontalAlign="center" verticalFill horizontal>
                        <Image src = {MSLogo} width="auto" height="75px"/>
                        <Text variant="xxLarge" style={{fontWeight: "400", fontWeight: "400"}}> {NavBarHeading} </Text>
                    </Stack>
                    <div style={{ width: "70%"}}>
                        <PrimaryButton 
                            style={{ float: "right"}}
                            onClick={() => logoutUser()}
                        >Log Out</PrimaryButton>
                    </div>
                </Stack>
            </div>
        </React.Fragment>
    );
};

export default NavBar;