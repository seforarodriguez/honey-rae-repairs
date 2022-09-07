import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ticketList.css"

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()
    
    //!this is grabbing the honey_user from the logIn page
    //!then is making that localhoneyuser into a JSON file, and assinging it to a variable?
    //!explain how come these 2 have the .staff key in the objects?? WHAT IS THIS DOING?! SOS HELP!
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            if(emergency) {
                //?this line will produce a new array, so we need to assing it to a variable
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
                //?I need to set this act another way if the emergency statement changes, otherwise it wont do nothing
                setFiltered(tickets)
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

    useEffect(
        () => {
            if (openOnly) {
            //if openOnly is true we are going to filter the tickets
            const openTicketsArray = tickets.filter(ticket => {
                return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
            })
            setFiltered(openTicketsArray)
        } else {
            setFiltered(filteredTickets)
            }
        },
        [openOnly]
    )

    return <>
    {
        //?this is using ternary statements to render a different view depending on the honeyUserObject
        honeyUserObject.staff
        ? 
        //?for this button to work I have to make sure I told the useEffect, that when its false it should do something else
        //?if not it wont do anything.
        <>
        <button onClick={ () => {setEmergency(true)} }>Emergency Only</button>
        <button onClick={ () => {setEmergency(false)} }>Show All Tickets</button>
        </>
        //?if its not a staff I want them to be able to create a ticket so, this is the "else statement"
        
        :<>
        <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
        <button onClick={() => updateOpenOnly(true)}>Show Open Tickets</button>
        <button onClick={() => updateOpenOnly(false)}>Show All My Tickets</button>
        </> 
    }
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