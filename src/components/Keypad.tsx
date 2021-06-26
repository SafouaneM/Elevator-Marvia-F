import Button from './Button';
import React from 'react';
type Props = {
    onClick:any
    stops:any
    next:any
}



const Keypad:React.FC<Props> = (props) => {

    const renderButtons = (i:any) => {
        return(
            <Button key={i} value={i} onClick={props.onClick} activeArray={props.stops}  next={props.next}/>
        );
    }






    return  <div className="centered">

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