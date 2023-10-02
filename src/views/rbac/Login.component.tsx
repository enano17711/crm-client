import {
   TextInput,
   PasswordInput,
   Checkbox,
   Anchor,
   Paper,
   Title,
   Text,
   Container,
   Group,
   Button,
} from "@mantine/core"
import { useCallback, useEffect, useState } from "react"
import { clearAccessTokens } from "../../axios-utils.ts"
import { useNavigate } from "react-router-dom"
import { useApiRbacLoginPostHook } from "../../api-gen/hooks/rbacController"
import { errorNotification } from "../../utils"
import { useAtom } from "jotai"
import { securitiesAtom } from "../../store/rbac.atoms.ts"

const LoginComponent = () => {
   const navigate = useNavigate()
   const [securitiesData, setSecuritiesData] = useAtom(securitiesAtom)

   const [userFormData, setUserFormData] = useState({
      account: "",
      password: "",
   })

   const {
      mutate: loginMutate,
      data: loginData,
      isError: isErrorLogin,
      error: loginError,
   } = useApiRbacLoginPostHook({
      mutation: {
         onSuccess: async (data, variables, context) => {
            localStorage.setItem("userDataSession", JSON.stringify(data.data))
            localStorage.setItem("access-token", data.data.accessToken)
            localStorage.setItem("x-access-token", data.data.refreshToken)
            localStorage.setItem(
               "securitiesDataSession",
               JSON.stringify(data.data.securities),
            )
            setSecuritiesData(data.data.securities)
            navigate("/")
         },
         onError: (error, variables, context) => {
            errorNotification((error as ErrorTypes).message)
         },
      },
   })

   const onFormSubmit = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
         event.preventDefault()

         if (
            !userFormData.account ||
            !userFormData.password ||
            userFormData.account === "" ||
            userFormData.password === ""
         )
            return

         loginMutate({
            account: userFormData.account,
            password: userFormData.password,
         })
      },
      [userFormData.account, userFormData.password, loginMutate],
   )

   useEffect(() => {
      clearAccessTokens()
   }, [])

   return (
      <Container size={420} my={40}>
         <Title
            align="center"
            sx={(theme) => ({
               fontFamily: `Greycliff CF, ${theme.fontFamily}`,
               fontWeight: 900,
            })}
         >
            Welcome back!
         </Title>
         <Text color="dimmed" size="sm" align="center" mt={5}>
            Do not have an account yet?{" "}
            <Anchor size="sm" component="button">
               Create account
            </Anchor>
         </Text>

         <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <form onSubmit={onFormSubmit}>
               <TextInput
                  label="Account"
                  placeholder="your user account"
                  required
                  value={userFormData.account}
                  onChange={(e) =>
                     setUserFormData({
                        ...userFormData,
                        account: e.target.value,
                     })
                  }
                  error={isErrorLogin ? "Invalid username or password" : null}
               />
               <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  required
                  mt="md"
                  value={userFormData.password}
                  onChange={(e) =>
                     setUserFormData({
                        ...userFormData,
                        password: e.target.value,
                     })
                  }
                  error={isErrorLogin ? "Invalid username or password" : null}
               />
               <Group position="apart" mt="lg">
                  <Checkbox label="Remember me" />
                  <Anchor component="button" size="sm">
                     Forgot password?
                  </Anchor>
               </Group>
               <Button type="submit" fullWidth mt="xl">
                  Sign in
               </Button>
            </form>
         </Paper>
      </Container>
   )
}
export default LoginComponent
