import React, {useEffect, useState,useRef} from 'react';
import Elevator from './components/Elevator';
import Keypad from './components/Keypad';

import './App.css';

function App() {

    // const [stops,setStops] = useState([]);
    const [currentFloor,setCurrentFloor] = useState(0)
    // const currentFloor:any = useRef(0);
    // const [checkFloor, setCheckfloor] = useState(currentFloor.current)
    const [isMoving,setMoving] = useState(false)
    const [upcomingFloor,setUpcomingFloor] = useState(0)

    let floorNumber:number = currentFloor;
    let interval:any;

    const handleButtonClick =  (e:any) => {
        if (e.target.value != currentFloor && !isMoving) {
            console.log("click")
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
                        //upcoming floor is floor that is pressed, currentfloor is the floor we are currently on
                        console.log(upcomingFloor,floorNumber)
                    }, 3000)
                    break;
            }
        }
        else {
            console.log('je bent bij else aangekomen')
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
            setCurrentFloor(floorNumber)
            clearInterval(interval)
            setMoving(false)
            // setCurrentFloor(floorNumber)
        } else {
            floorNumber++;
            setCurrentFloor(floorNumber)
            console.log(floorNumber + 'dit is van else')
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
        if (upcomingFloor == floorNumber) {
            setCurrentFloor(floorNumber)
            clearInterval(interval)
            setMoving(false)
            // setCurrentFloor(floorNumber)
        }
        else {
            floorNumber --;
            setCurrentFloor(floorNumber)
            console.log(floorNumber + 'dit is van else')

        }
        // setCurrentFloor(currentFloor -1);
        // }
        // },3000)

        // console.log("interval here i am")

    }

    // useEffect(function () {
    //     setTimeout(() => {
    //         currentFloor.current = floorNumber
    //     }, 1000); // Update the content of the element after 1second
    // }, []);

    return (
    <div className="App">
      <header className="App-header">
          <div className="elevator-container">
          <Elevator current={floorNumber} moving={isMoving}/>
    </div>
          <div className="floor-display">
              <h1 className="floor-number">{currentFloor}</h1>
          </div>
          <Keypad onClick={handleButtonClick} stops={isMoving}  next={upcomingFloor} />
      </header>
    </div>
  );
}

export default App;
