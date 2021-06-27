import React from "react";

type Props = {
    value:any
    onClick:any
    number:any
    next:any
}

const Button:React.FC<Props> = (props) => {

        let button;
        if(props.number) {
            button = <button className="elevator-btn active" value={props.value} onClick={props.onClick}>{props.value === 0 ? '🤖' : props.value}</button>
        }else {
            button = <button className="elevator-btn" value={props.value} onClick={props.onClick}>{props.value === 0 ? '🤖' : props.value}</button>
        }








    return <div className="flex-button">{button}</div>

}



export default Button