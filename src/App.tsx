import React, {useState} from 'react';
import Elevator from './components/Elevator';
import Keypad from './components/Keypad';

import './App.css';

function App() {

    const [stops,setStops] = useState([]);
    const [currentFloor,setCurrentFloor] = useState(0)
    const [isMoving,setMoving] = useState(false)
    const [upcomingFloor,setUpcomingFloor] = useState(null)

    const handleButtonClick = async (e:any) => {

        const stop:any = parseInt(e.target.value);
        // console.log(stop)
        setStops((oldArray:any) => oldArray.concat(stop))

        setTimeout(() => {
            startElevator()
        }, 1000);


        const startElevator = () => {
            const copyStops = [...stops];

            let stop:any = copyStops.shift()
            console.log(stops)
            console.log(stop)
            let counter:any = currentFloor;
            let timer:any;
            if(currentFloor < stop ) {
                counter = currentFloor + 1;
                setInterval(() => {
                    if(counter === stop) {
                        setCurrentFloor(stop)
                        setStops(copyStops)
                        setUpcomingFloor(null)
                        setMoving(true)
                    }
                    else {
                       setUpcomingFloor(counter)
                        counter ++;
                    }
                }, 1000);
            }

            if(currentFloor > stop) {
                counter = currentFloor - 1;
                    timer = setInterval(() => {
                    if(counter === stop) {
                        setCurrentFloor(stop)
                        setUpcomingFloor(null)
                        setStops(copyStops)
                        setMoving(true)
                        clearInterval(timer);
                    }
                    else {
                        setUpcomingFloor(counter)
                         // setCurrentFloor(null)
                        counter --;
                    }
                }, 1000);
            }
        }

    }

    return (
    <div className="App">
      <header className="App-header">
          <div className="elevator-container">
          <Elevator current={currentFloor} moving={isMoving}/>
    </div>
          <Keypad onClick={handleButtonClick} stops={stops} current={currentFloor} next={upcomingFloor} />

      </header>
    </div>
  );
}

export default App;
