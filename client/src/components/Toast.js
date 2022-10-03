import { Dialog, DialogType, Stack, Text } from "@fluentui/react";
import React from "react";

export const Toast = ({
    SubText = "",
    title = "",
    closeModal,
    showModal
}) => {
    const modelProps = {
        isBlocking: false,
        styles: { main: { maxWidth: 450 } },
    };

    const dialogContentProps = {
        type: DialogType.largeHeader,
        // title: title,
        // subText: SubText
    }

    return(
        <React.Fragment>
            <Dialog 
                hidden={!showModal}
                onDismiss={() => closeModal()}
                dialogContentProps = {dialogContentProps}
                modalProps={modelProps}
            >
                <Stack
                    verticalFill
                    verticalAlign="center"
                    horizontalAlign="center"
                >
                    <Text variant="xxLargePlus"> { title } </Text>
                </Stack>
                {/* <PrimaryButton onClick={() => closeModal()}> Got It! </PrimaryButton> */}
            </Dialog>
        </React.Fragment>
    )
}