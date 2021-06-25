import React from "react";

type Props = {
    value:any
    onClick:any
    activeArray:any
    current:any
    next:any
}

const Button:React.FC<Props> = (props) => {



        let button;
        if(props.activeArray.includes(props.value)) {
            button = <button className="elevator-btn active" value={props.value} onClick={props.onClick}>{props.value === 0 ? '🤖' : props.value}</button>
        }else {
            button = <button className="elevator-btn" value={props.value} onClick={props.onClick}>{props.value === 0 ? '🤖' : props.value}</button>
        }

        if(props.current === props.value) {
            button = <button className="elevator-btn current" value={props.value} >{props.value === 0 ? '🤖' : props.value}</button>
        }

        if(props.next === props.value) {
            button = <button className="elevator-btn next" value={props.value} >{props.value === 0 ? '🤖' : props.value}</button>
        }








    return <div className="flex-button">{button}</div>

}



export default Button