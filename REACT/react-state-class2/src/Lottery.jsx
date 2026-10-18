import { useState } from "react";
import './Lottery.css'
import { genTicket,sum } from "./helper";
import Ticket from "./Ticket";

export default function Lottery({n=4,winCondition})
{
    let [ticket,setTicket] = useState(genTicket(n));
    let isWining = winCondition(ticket);
    let buyTicket = ()=>{
        setTicket(genTicket(n));
    }
    return(
        <div>
            <h1>Lottery Game!</h1>
            <Ticket ticket={ticket}/>
            <h3>{isWining && "Congratulations, you win!"}</h3>
<br />
 <button onClick={buyTicket}>Buy Ticket</button>
        </div>
        
    
    );
}