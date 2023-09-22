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
import {
   accessTokenKey,
   clearAccessTokens,
   getAPI,
   refreshAccessTokenKey,
} from "../../axios-utils.ts"
import { RbacApi } from "../../api-services"
import { useNavigate } from "react-router-dom"
import { notifications } from "@mantine/notifications"
import { useAppStore } from "../../store"

const LoginComponent = () => {
   const navigate = useNavigate()

   const [userFormData, setUserFormData] = useState({
      account: "",
      password: "",
   })

   const { rbacsStore } = useAppStore()

   useEffect(() => {
      clearAccessTokens()
      rbacsStore.actions.disposeState()
   }, [])

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

         rbacsStore.actions
            .loadRBACs({
               account: userFormData.account,
               password: userFormData.password,
            })
            .then((res) => {
               rbacsStore.actions.setSecurities()
               navigate("/")
            })

         /*         getAPI(RbacApi)
            .apiRbacLoginPost({
               account: userFormData.account,
               password: userFormData.password,
            })
            .then((res) => {
               localStorage.setItem(
                  "userDataSession",
                  JSON.stringify(res.data.data),
               )
               localStorage.setItem(accessTokenKey, res.data.data.accessToken)
               localStorage.setItem(
                  refreshAccessTokenKey,
                  res.data.data.refreshToken,
               )
               rbacsStore.actions.loadRBACs({
                  account: userFormData.account,
                  password: userFormData.password,
               })
               navigate("/")
            })
            .catch((error) => {
               notifications.show({
                  title: "Error",
                  message: error.response.data.message,
                  color: "red",
               })
            })*/
      },
      [userFormData.account, userFormData.password, navigate],
   )

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
