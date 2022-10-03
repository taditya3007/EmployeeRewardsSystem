import React from "react";

const Divider = ({
    size,
    BackGroundColor = "black",
    MarginLeft,
    MarginRight
}) => {

    const dividerStyle = {
        width: "90%",
        height: size,
        marginLeft: MarginLeft,
        marginRight: MarginRight,
        backgroundColor: BackGroundColor,
    }

    return(
        <div style={dividerStyle}></div>
    );
};

export default Divider;