import { Stack, Text } from "@fluentui/react";
import React from "react";
import { EthContext } from "../contexts/EthContext";

const Avatar = ({
    Height,
    Width,
    BackgroundColor = "#f7f7f7",
    FontSize = "40px",
    BorderRadius = "100px",
    Padding = "0px"
}) => {
    // eslint-disable-next-line
    const [state , dispatch] = React.useContext(EthContext); 
    const avatarStyle = {
        height: Height,
        width: Width,
        backgroundColor: BackgroundColor,
        borderRadius: BorderRadius,
        padding: Padding
    }

    const [avatarName, setAvatarName] = React.useState("U");;

    React.useEffect(() => {
        if (state.alias === "") 
        {
            return;
        }  
        setAvatarName(state.alias.split("@")[0])
    },[state.alias]);

    return(
        <div style={avatarStyle}>
            <Stack
                horizontalAlign="center"
                verticalAlign="center"
                verticalFill
            >
                <Text style={{ fontSize: FontSize }}> {avatarName} </Text>
            </Stack>
        </div>
    );
}

export default Avatar;