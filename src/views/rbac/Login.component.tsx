import {
   Anchor,
   Button,
   Checkbox,
   Container,
   Group,
   Paper,
   PasswordInput,
   Text,
   TextInput,
   Title,
} from "@mantine/core"
import { useCallback, useEffect, useState } from "react"
import { clearAccessTokens } from "../../axios-utils.ts"
import { useNavigate } from "react-router-dom"
import { useApiRbacLoginPostHook } from "../../api-gen/hooks/rbacController"
import { errorNotification } from "../../utils"
import { useSetAtom } from "jotai"
import {
   accessTokenAtom,
   refreshTokenAtom,
   securitiesAtom,
   userDataSessionAtom,
} from "../../store/rbac.atoms.ts"
import { RESET } from "jotai/utils"

const LoginComponent = () => {
   const navigate = useNavigate()
   const setSecuritiesData = useSetAtom(securitiesAtom)
   const setUserDataSession = useSetAtom(userDataSessionAtom)
   const setAccessToken = useSetAtom(accessTokenAtom)
   const setRefreshToken = useSetAtom(refreshTokenAtom)

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
            setUserDataSession(data.data)
            setAccessToken(data.data.accessToken)
            setRefreshToken(data.data.refreshToken)
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
      setUserDataSession(RESET)
      setAccessToken(RESET)
      setRefreshToken(RESET)
      setSecuritiesData(RESET)
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
