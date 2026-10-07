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


    let [moves,setMoves]=useState({blue:0,red:0,yellow:0,green:0});
    let updateBlue=()=>{
        moves.blue+=1;
        console.log(moves);

        setMoves(moves);
    }
    return(
        <div>
            <p>Game Begins...!</p>
            <div className="board">
                <p  >Blue Moves = {moves.blue}</p> <button style={{backgroundColor:"blue"}} onClick={}>+1</button>
                <p >Yellow Moves ={moves.yellow} </p> <button style={{backgroundColor:"yellow", color:"black"}}>+1</button>
                <p >Green Moves = {moves.green}</p> <button style={{backgroundColor:"green"}}>+1</button>
                <p >Red Moves = {moves.red}</p> <button style={{backgroundColor:"red"}}>+1</button>
                                
            </div>
        </div>
    );
}