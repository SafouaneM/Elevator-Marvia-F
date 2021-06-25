import React, {useEffect, useState} from 'react';
import Elevator from './components/Elevator';
import Keypad from './components/Keypad';

import './App.css';

function App() {

    // const [stops,setStops] = useState([]);
    const [currentFloor,setCurrentFloor] = useState(0)
    const [isMoving,setMoving] = useState(false)
    const [upcomingFloor,setUpcomingFloor] = useState(0)

    let floorNumber:any = currentFloor;
    let interval:any;

    const handleButtonClick =  (e:any) => {
        if (e.target.value != currentFloor && !isMoving) {
            console.log("click1")
            setUpcomingFloor(e.target.value);
            // setMoving(true);
        }


        // const stop:any = parseInt(e.target.value);
        // // console.log(stop)
        // setStops((oldArray:any) => oldArray.concat(stop))
        //
        // setTimeout(() => {
        //     startElevator()
        // }, 3000);
        //
        //
        // const startElevator = () => {
        //     const copyStops = [...stops];
        //
        //     let stop:any = copyStops.shift()
        //     console.log(stops)
        //     console.log(stop)
        //     let counter:any = currentFloor;
        //     let timer:any;
        //     if(currentFloor < stop ) {
        //         counter = currentFloor + 1;
        //         setInterval(() => {
        //             if(counter === stop) {
        //                 setCurrentFloor(stop)
        //                 setStops(copyStops)
        //                 setUpcomingFloor(null)
        //                 setMoving(true)
        //             }
        //             else {
        //                setUpcomingFloor(counter)
        //                 counter ++;
        //             }
        //         }, 1000);
        //     }
        //
        //     if(currentFloor > stop) {
        //         counter = currentFloor - 1;
        //             timer = setInterval(() => {
        //             if(counter === stop) {
        //                 setCurrentFloor(stop)
        //                 setUpcomingFloor(null)
        //                 setStops(copyStops)
        //                 setMoving(true)
        //                 clearInterval(timer);
        //             }
        //             else {
        //                 setUpcomingFloor(counter)
        //                  // setCurrentFloor(null)
        //                 counter --;
        //             }
        //         }, 1000);
        //     }
        // }

    }

    useEffect(() => {
        if (!isMoving) {
            setMoving(true)
            floorNumber = currentFloor
            console.log("effect upcomingfloor")
            switch (true) {
                case (upcomingFloor < currentFloor):
                       interval = setInterval(() => {
                            movingDown()
                        },3000)
                    break;
                case (upcomingFloor > currentFloor):
                    interval = setInterval( () => {
                        movingUp()
                    }, 3000)

                    break;
            }
        }
        else {
            clearInterval(interval)
        }

    }, [upcomingFloor])

    useEffect(() => {
        console.log("second effect")
        if (upcomingFloor == currentFloor) {
            setMoving(false)
            clearInterval(interval)
        }
    },[currentFloor])
    const movingUp = () => {
        // setInterval(() => {
        if (upcomingFloor == floorNumber) {
            setMoving(false)
            setCurrentFloor(floorNumber)
        } else {
            floorNumber += 1;
        }
        console.log("moving up ^")
            // setCurrentFloor(currentFloor + 1);
        // }
        // },3000)

        // console.log("interval here i am")

    }

    const movingDown = () => {
        // setInterval(() => {
        console.log("moving down")

        setCurrentFloor(currentFloor -1);
        // }
        // },3000)

        // console.log("interval here i am")

    }

    return (
    <div className="App">
      <header className="App-header">
          <div className="elevator-container">
          <Elevator current={currentFloor} moving={isMoving}/>
    </div>
          <Keypad onClick={handleButtonClick} stops={isMoving} current={floorNumber} next={upcomingFloor} />

      </header>
    </div>
  );
}

export default App;
