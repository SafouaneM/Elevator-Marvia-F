import React, {useEffect, useState, useRef} from 'react';
import Elevator from './components/Elevator';
import Keypad from './components/Keypad';
import {FaArrowUp} from "react-icons/fa";
import {FaArrowDown} from "react-icons/fa";


import './App.css';

function App() {

    const [currentFloor, setCurrentFloor] = useState(0)
    const [isMoving, setMoving] = useState(false)
    const [upcomingFloor, setUpcomingFloor] = useState(0)

    let floorNumber: number = currentFloor;
    let interval: any;

    const buttonMovement = (direction: string) => {

        if (direction == "up" && currentFloor != 6) {
            setTimeout(() => {
                setCurrentFloor(floorNumber + 1)
            }, 1000)
            clearInterval(interval)
        } else if (direction == "down" && currentFloor != 0) {
            setTimeout(() => {
                setCurrentFloor(floorNumber - 1)
            }, 1000)
            clearInterval(interval)

        }
    }

    const handleButtonClick = (e: any) => {

        if (e.target.value != currentFloor && !isMoving) {
            setUpcomingFloor(e.target.value);
            console.log(e.target.value)
        }
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
                    }, 3000)
                    break;
                case (upcomingFloor > currentFloor):
                    interval = setInterval(() => {
                        movingUp()
                        //upcoming floor is floor that is pressed, currentfloor is the floor we are currently on
                        console.log(upcomingFloor, floorNumber)
                    }, 3000)
                    break;
            }
        } else {
            clearInterval(interval)
        }

    }, [upcomingFloor])

    useEffect(() => {
        console.log("second useEffect")
        if (upcomingFloor == currentFloor) {
            setMoving(false)
            clearInterval(interval)
        }
    }, [currentFloor])

    const movingUp = () => {
        if (upcomingFloor == floorNumber) {
            setCurrentFloor(floorNumber)
            clearInterval(interval)
            setMoving(false)
        } else {
            floorNumber++;
            setCurrentFloor(floorNumber)
        }
        console.log("moving up ^")
    }
    const movingDown = () => {
        console.log("moving down")
        if (upcomingFloor == floorNumber) {
            setCurrentFloor(floorNumber)
            clearInterval(interval)
            setMoving(false)
        } else {
            floorNumber--;
            setCurrentFloor(floorNumber)
        }
    }


    return (
        <div className="App-header">
            <div className="elevator-container">
                <Elevator active={upcomingFloor}/>
            </div>
            <div className="floor-display">
                <h1 className="floor-number">{currentFloor}</h1>
            </div>
            <Keypad onClick={handleButtonClick} stops={isMoving} next={upcomingFloor}/>
            <div className="button-grid">
                <button className="test" onClick={() => {
                    buttonMovement("up");
                }}>
                    <FaArrowUp></FaArrowUp>
                </button>

                <button className="test" onClick={() => {
                    buttonMovement("down");
                }}>
                    <FaArrowDown></FaArrowDown>
                </button>
            </div>
        </div>
    );
}

export default App;
