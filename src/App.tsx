import React, {useEffect, useState,useRef} from 'react';
import Elevator from './components/Elevator';
import Keypad from './components/Keypad';

import './App.css';

function App() {

    // const [stops,setStops] = useState([]);
    const [currentFloor,setCurrentFloor] = useState(0)
    const collectionFloor:any = useRef([]);
    // const [checkFloor, setCheckfloor] = useState(currentFloor.current)
    const [isMoving,setMoving] = useState(false)
    const [upcomingFloor,setUpcomingFloor] = useState(0)

    let floorNumber:number = currentFloor;
    let interval:any;

const buttonMovement = (direction:string) => {

  if (direction == "up" && currentFloor != 6) {
      setCurrentFloor(floorNumber+1)
  } else if (direction == "down" && currentFloor != 0)
  {
      setCurrentFloor(floorNumber-1)
  }
}
    let buttonInputTimeOut:any

    const handleButtonClick =  (e:any) => {


        if (e.target.value != currentFloor && !isMoving) {
            setUpcomingFloor(e.target.value);
            // collectionFloor.current.push(e.target.value)
        }


        // clearTimeout(buttonInputTimeOut)
        // buttonInputTimeOut = setTimeout(
        //     // sortArray
        //  ,3000)
    }

    useEffect(() => {
        if (!isMoving) {
            setMoving(true)
            floorNumber = currentFloor
            console.log("first useEffect")
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
            // console.log('je bent bij else aangekomen')
            clearInterval(interval)
        }

    }, [upcomingFloor])

    useEffect(() => {
        console.log("second useEffect")
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
        } else {
            floorNumber++;
            setCurrentFloor(floorNumber)
            // console.log(floorNumber + 'dit is van else')
        }
        console.log("moving up ^")
    }
    const movingDown = () => {
        console.log("moving down")
        if (upcomingFloor == floorNumber) {
            setCurrentFloor(floorNumber)
            clearInterval(interval)
            setMoving(false)
        }
        else {
            floorNumber --;
            setCurrentFloor(floorNumber)
            // console.log(floorNumber + 'dit is van else')

        }


    }

    // const sortArray = (testData:any) => {
    //
    // // console.log(collectionFloor)
    //
    //     for (let i = 0; i < collectionFloor.current.length; i++) {
    //         console.log(collectionFloor.current[i])
    //         setUpcomingFloor(collectionFloor.current[i])
    //     }
    //
    // }

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

          <button className="test" onClick={ () => {
              buttonMovement("up");
          }}>
             ^
          </button>

          <button className="test" onClick={ () => {
              buttonMovement("down");
          }}>
              down
          </button>
      </header>
    </div>
  );
}

export default App;
