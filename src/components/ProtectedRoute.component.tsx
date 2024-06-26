import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAtomValue } from "jotai"
import { userDataSessionAtom } from "../store/rbac.atoms.ts"

const ProtectedRouteComponent = ({
   children,
}: {
   children: React.ReactNode
}) => {
   const userDataSession = useAtomValue(userDataSessionAtom)
   const navigate = useNavigate()

   useEffect(() => {
      window.addEventListener("storage", () => {
         if (
            userDataSession?.accessToken === undefined ||
            userDataSession?.accessToken === "" ||
            userDataSession?.accessToken === null
         ) {
            console.log("entro en userDataSession igual a null")
            navigate("/login")
         }
      })
   }, [])

   /*   if (
      userDataSession?.accessToken === undefined ||
      userDataSession?.accessToken === "" ||
      userDataSession?.accessToken === null
   ) {
      return <Navigate to="/login" />
   }*/
   return children
}

export default ProtectedRouteComponent
