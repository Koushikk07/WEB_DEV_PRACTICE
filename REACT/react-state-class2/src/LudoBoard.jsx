import { useState } from "react";

export default function LudoBoard()
{
    /* let [blueMove,setBlueMove]=useState(0);
    let [YellowMove,setYellowMove]=useState(0);
    let [GreenMove,setGreenMove]=useState(0);
    let [RedMove,setRedMove]=useState(0);
    return(
        <div>
            <p>Game Begins...!</p>
            <div className="board">
                <p >Blue Moves = {blueMove}</p> <button>+1</button>
                <p>Yellow Moves ={YellowMove} </p> <button>+1</button>
                <p>Green Moves = {GreenMove}</p> <button>+1</button>
                <p>Red Moves = {RedMove}</p> <button>+1</button>
                                
            </div>
        </div>
    ); */


    let [moves,setMoves]=useState({blue:0,red:0,yellow:0,green:0})
    let [arr,setArr]= useState(["no moves"]);
    let updateBlue=()=>{
       // moves.blue+=1;
        console.log(`moves.blue = ${moves.blue}`);

        setMoves((prevMoves)=>{
            return {...prevMoves, blue: prevMoves.blue+1};
        });

        //arr.push("Blue Moves");
        setArr([...arr,"blue moves"]);
        console.log(arr); 
    }   
    let updateYellow=()=>{
       // moves.blue+=1;
        console.log(`moves.yellow = ${moves.yellow}`);

         setMoves((prevMoves)=>{
            return {...prevMoves, yellow: prevMoves.yellow+1};
        });
    } 
    let updateRed=()=>{
       // moves.blue+=1;
        console.log(`moves.red = ${moves.red}`);

        setMoves((prevMoves)=>{
            return {...prevMoves, red: prevMoves.red+1};
        });
    } 
    let updateGreen=()=>{
       // moves.blue+=1;
        console.log(`moves.green = ${moves.green}`);

        setMoves((prevMoves)=>{
            return {...prevMoves, green: prevMoves.green+1};
        });
    } 
    return(
        <div>
            <p>Game Begins...!</p>
            <div className="board">
                <p  >Blue Moves = {moves.blue}</p> <button style={{backgroundColor:"blue"}} onClick={updateBlue}>+1</button>
                <p >Yellow Moves ={moves.yellow} </p> <button style={{backgroundColor:"yellow", color:"black"}} onClick={updateYellow}>+1</button>
                <p >Green Moves = {moves.green}</p> <button style={{backgroundColor:"green"}} onClick={updateGreen}>+1</button>
                <p >Red Moves = {moves.red}</p> <button style={{backgroundColor:"red"}} onClick={updateRed}>+1</button>
                                
            </div>
        </div>
    );
}