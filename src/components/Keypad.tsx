import Button from './Button';
import React from 'react';
type Props = {
    onClick:any
    stops:any
    current:any
    next:any


}



const Keypad:React.FC<Props> = (props) => {

    const renderButtons = (i:any) => {
        return(
            <Button key={i} value={i} onClick={props.onClick} activeArray={props.stops} current={props.current} next={props.next}></Button>
        );
    }






    return  <div className="centered">
        <div className="floor-display">
            <h1 className="floor-number">{ !props.next ? props.current : props.next }</h1>
        </div>
        <div className="flex-button-row">
            {renderButtons(6)}
        </div>
        <div className="flex-button-row">
            {renderButtons(5)}
            {renderButtons(4)}
            {renderButtons(3)}
        </div>
        <div className="flex-button-row">
            {renderButtons(2)}
            {renderButtons(1)}
            {renderButtons(0)}
        </div>
    </div>
}





export default Keypad