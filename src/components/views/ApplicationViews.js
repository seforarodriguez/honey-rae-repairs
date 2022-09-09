import { Outlet, Route, Routes } from "react-router-dom"
import { TicketForm } from "../serviceTickets/TicketForm"
import { TicketContainer } from "../tickets/TicketContainer"
import { TicketList } from "../tickets/TicketList"
import { TicketSearch } from "../tickets/TicketSearch"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketContainer/>} />
				<Route path="ticket/create" element={ <TicketForm /> } />
            </Route>
        </Routes>
    )
}

