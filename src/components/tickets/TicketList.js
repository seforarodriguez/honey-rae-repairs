import { useEffect, useState } from "react"
import "./ticketList.css"

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    
    //!this is grabbing the honey_user from the logIn page
    //!then is making that localhoneyuser into a JSON file, and assinging it to a variable?
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            if(emergency) {
                //?this line will produce a new array, so we need to assing it to a variable
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
        },
        [emergency]
    )

    useEffect(
        () => {
            fetch(' http://localhost:8088/serviceTickets')
            .then(response => response.json())
            .then((ticketArray) => {
                setTickets(ticketArray)
            })    
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (honeyUserObject.staff) {
                //for employees
                setFiltered(tickets)
            }
            else {
                //for customers
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        //This is listening if the state of tickets has changed then it logs the tickets in console.
        [tickets]
    )

    return <>
    <button
        onClick={
            () => {
                setEmergency(true)
            }
        }
    >Emergency Only</button>
    <h2>List of Tickets</h2>
        <article className="tickets">
        {
            //!why am I calling the filtered tickets here instead of just tickets?
            //!am I reassining the tickets to filtered tickets with the second useEffect?
            filteredTickets.map(ticket => {
                return <>
                    <section className="ticket">
                        <header>{ticket.description}</header>
                        <footer>Emergency: {ticket.emergency ? "🧨": "No" }</footer>
                    </section>
                </>
            })
        }

    </article></>
}