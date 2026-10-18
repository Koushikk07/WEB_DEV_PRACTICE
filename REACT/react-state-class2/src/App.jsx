import './App.css'
import Lottery from './Lottery'
/*  import LudoBoard from './LudoBoard'*/
//import TodoList from './TodoList'
//import TicketNum from './TicketNum'
//import Ticket from './Ticket'
import {sum} from './helper';
function App() {
 
let winCondition=(ticket)=>{
  return sum(ticket)==15;
}
  return (
    <>
 
   <Lottery n={4} winCondition={winCondition}/>
    </>
  )
}

export default App
