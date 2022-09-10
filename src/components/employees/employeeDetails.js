import { useState } from "react"
import { useParams } from "react-router-dom"

export const EmployeeDetails = () => {

const {employeeId} = useParams()

const [employee, updateEmployee] = useState([])
return <> </>


}