import React from "react";

function BoxDiv(props){
    return(
    <div id="box" onClick={props.changeBoxState} data-key={props.data}>{props.checkstate}</div>

    )
}

export default BoxDiv;