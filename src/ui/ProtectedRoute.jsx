import { useEffect } from "react"
import { useUser } from "../features/authentication/useUser"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Spinner from "./Spinner"

const Fullpage = styled.div`
    height: 100vh;
    width: 100vw;
    background: var(--color-gray-50);
    display: flex;
    align-items: center;
    justify-content: center;
`

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    // 1)  load current user for supabase
    const {isLoadingUser, isAuthenticated } = useUser()
    // console.log(isAuthenticated);
    

    // 2) if there is no authenticated user , then redirect to /login page
    useEffect(() => {
        if(!isAuthenticated && !isLoadingUser) navigate('/login')
    } , [isAuthenticated, isLoadingUser, navigate]);

    // 3) if user is loading , show spinner 
    if(isLoadingUser) return <Fullpage> <Spinner /> </Fullpage> 

    // 4) if there is authenticated user , then return the 👇
  if(isAuthenticated) return (
    children
  )
}

export default ProtectedRoute