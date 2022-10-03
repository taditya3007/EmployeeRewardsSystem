import React from "react";
import { Stack } from "@fluentui/react";
import { LoginComponent } from "./LoginComponent";


export const UserLoginComponent = () => {
    return(
        <Stack
            horizontalAlign="center"
            verticalAlign="center"
            verticalFill
        >
            <LoginComponent />
        </Stack>
    );
}