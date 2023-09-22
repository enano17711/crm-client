import { BrowserRouter } from "react-router-dom"
import { MantineProvider } from "@mantine/core"
import { DatesProvider } from "@mantine/dates"
import { Notifications } from "@mantine/notifications"
import { Provider } from "react-redux"
import { rootStore } from "./store"
import RoutesComponent from "./Routes.component.tsx"

function App() {
   return (
      <Provider store={rootStore}>
         <BrowserRouter>
            <MantineProvider withGlobalStyles withNormalizeCSS>
               <DatesProvider settings={{ locale: "es" }}>
                  <Notifications />
                  <RoutesComponent />
               </DatesProvider>
            </MantineProvider>
         </BrowserRouter>
      </Provider>
   )
}

export default App
