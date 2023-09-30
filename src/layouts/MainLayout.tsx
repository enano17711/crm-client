import { useEffect, useState } from "react"
import {
   AppShell,
   Box,
   Burger,
   Button,
   Center,
   Header,
   MediaQuery,
   Navbar,
   ScrollArea,
   useMantineTheme,
} from "@mantine/core"
import BrandLayout from "./BrandLayout.tsx"
import NavMenuLayout from "./NavMenuLayout.tsx"
import ShortsHeaderLayout from "./ShortsHeaderLayout.tsx"
import { IconSearch } from "@tabler/icons-react"
import { useAppStore } from "../store"
import { useLocation } from "react-router-dom"

export default function MainLayout({
   children,
}: {
   children: React.ReactNode
}) {
   const theme = useMantineTheme()
   const [opened, setOpened] = useState(false)

   const location = useLocation()

   const { rbacsStore } = useAppStore()

   useEffect(() => {
      const localStorageData = JSON.parse(
         localStorage.getItem("userDataSession"),
      )
      if (
         localStorageData?.account !== undefined &&
         localStorageData?.account !== "" &&
         localStorageData?.account !== null
      ) {
         rbacsStore.actions.loadRBACs({
            account: "dummyTestData",
            password: "dummyTestData",
         })
      }
   }, [])

   return (
      <AppShell
         hidden={location.pathname === "/login" || location.pathname === "/pos"}
         layout="alt"
         styles={{
            main: {
               background: "#ffffff",
            },
         }}
         navbarOffsetBreakpoint="md"
         navbar={
            <Navbar
               py="md"
               hiddenBreakpoint="md"
               hidden={!opened}
               width={{ md: 250, lg: 250 }}
            >
               <Navbar.Section>
                  <Center inline>
                     <MediaQuery largerThan="md" styles={{ display: "none" }}>
                        <Burger
                           opened={opened}
                           onClick={() => setOpened((o) => !o)}
                           size="sm"
                           color={theme.colors.gray[6]}
                           mr="xl"
                        />
                     </MediaQuery>
                     <MediaQuery largerThan="md" styles={{ display: "none" }}>
                        <BrandLayout />
                     </MediaQuery>
                  </Center>
               </Navbar.Section>
               <Navbar.Section grow component={ScrollArea} pt="md">
                  <NavMenuLayout />
               </Navbar.Section>
            </Navbar>
         }
         header={
            <Header height={70} p="md">
               <div
                  style={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "space-between",
                     height: "100%",
                  }}
               >
                  <MediaQuery largerThan="md" styles={{ display: "none" }}>
                     <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                     />
                  </MediaQuery>

                  <Button
                     leftIcon={<IconSearch />}
                     variant="subtle"
                     color="dark.3"
                  >
                     Buscar en la app
                  </Button>
                  <ShortsHeaderLayout />
               </div>
            </Header>
         }
      >
         <Box id="main-comtent-box" pos="relative">
            {children}
         </Box>
      </AppShell>
   )
}
