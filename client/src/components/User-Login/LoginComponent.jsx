import { Stack, Text, TextField, PrimaryButton, Image } from "@fluentui/react";
import React from "react";

// import { useNavigate } from 'react-router-dom';
import MSLogo from '../../assets/MSLogo.png';
import { actions, EthContext } from "../../contexts/EthContext";

const token = { childrenGap: 20 }

const LoginComponentStyle = {
    root: {
        height: "500px",
        width: "500px"
    }
};

export const LoginComponent = () => {

    //For Context
    //eslint-disable-next-line
    const [state, dispatch] = React.useContext(EthContext);
    const [alias, setAlias] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleOnChangeAlias = (newText) => setAlias(newText);
    const handleOnChangePassw = (newText) => setPassword(newText);

    const onClickLoginButton = (event) => {
        event.preventDefault();
        var userDetailsJson = require('../../DemoData/userData.json');
        if (userDetailsJson[alias] === undefined || userDetailsJson[alias]["Password"] !== password) {
            // console.log(userDetailsJson[alias]);
            return ;
        }
        const userPublicKey = userDetailsJson[alias]["Public Key"];
        const isLoggedIn = true;
        // const alias = alias;
        dispatch({
            type: actions.store_PublicKey,
            data: { alias, userPublicKey , isLoggedIn } 
        });
        // navigate('/_layout/userMainScreen');
    };

    return(
        <Stack
          tokens = {token}  
          styles = {LoginComponentStyle}
          verticalAlign = "center"
          horizontalAlign = "center" 
          className="ms-depth-8"  
        >
            <Stack
                verticalAlign = "center"
                horizontalAlign = "center"
                style = {{ padding: "10px",  width: "100%" }}
                tokens = { token }
            >
                <div  style={{ width : "100%", display: "flex"}}>
                    <Image src={MSLogo} width="150px" height="100px" style={{ justifySelf: "flex-start"}}/>
                    <Stack
                        verticalAlign="center"
                        horizontalAlign="center"
                    >
                        <Text style = {{ textAlign: "left" , width: "100%", fontWeight:"400" }} variant="xxLarge"> Welcome to Microsoft! </Text>
                    </Stack>
                </div>   
                <TextField style = {{ width: "320px" }} placeholder="Enter Your Alias" underlined label="Alias"
                    onChange={(event) => handleOnChangeAlias(event.target.value)}/>
                <TextField type="password" style = {{ width: "320px" }} placeholder="Enter Your Password" underlined label="Pass"
                    onChange={(event) => handleOnChangePassw(event.target.value)}/>
                <div style={{ width: "100%" , marginLeft: "80px"}}>
                    <PrimaryButton text="Log In" allowDisabledFocus onClick={(event) => onClickLoginButton(event)} 
                        style = {{ height: "40px"}}/>
                </div>
            </Stack>
        </Stack>
    );
}