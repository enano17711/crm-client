import React from "react"
import { Navigate } from "react-router-dom"

const ProtectedRouteComponent = ({
   children,
}: {
   children: React.ReactNode
}) => {
   const userDataSession = JSON.parse(localStorage.getItem("userDataSession"))

   if (
      userDataSession?.accessToken === undefined ||
      userDataSession?.accessToken === "" ||
      userDataSession?.accessToken === null
   ) {
      return <Navigate to="/login" />
   }
   return children
}

export default ProtectedRouteComponent
