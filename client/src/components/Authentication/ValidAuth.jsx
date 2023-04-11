import React from 'react'
import {Navigate} from "react-router-dom"
import {useAuth} from "../../context/AuthContext"

const ValidAuth = ({children}) => {
    const {currentUser}=useAuth();
  return !currentUser? children: <Navigate to="/profile" />
}

export default ValidAuth
