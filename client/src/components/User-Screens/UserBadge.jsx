import { Image, Stack, Text } from "@fluentui/react";
import React from "react";
// const token = { childrenGap: 50 }

const UserBadge = ({
    imageSrc,
    W,
    H,
    count = 0,
}) => {
    return(
        <Stack 
            style={{
                width: W,
                height: H
            }}
            horizontalAlign="center"
            verticalAlign="center"
            // tokens={token}
        >
            <Image src={imageSrc}  height="100%" style={{
                maxWidth: "100%"
            }}/>
            <Text variant="xLarge" style={{ marginBottom: "10px" }}> { count } </Text>
        </Stack>
    );
}

export default UserBadge;