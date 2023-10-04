import { BrowserRouter } from "react-router-dom"
import { MantineProvider } from "@mantine/core"
import { DatesProvider } from "@mantine/dates"
import { Notifications } from "@mantine/notifications"
import { Provider } from "react-redux"
import { rootStore } from "./store"
import RoutesComponent from "./Routes.component.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         retry: 2,
         refetchOnWindowFocus: false,
         refetchOnMount: false,
         cacheTime: 0,
      },
   },
})

function App() {
   return (
      <Provider store={rootStore}>
         <QueryClientProvider client={queryClient}>
            <BrowserRouter>
               <MantineProvider withGlobalStyles withNormalizeCSS>
                  <DatesProvider settings={{ locale: "es" }}>
                     <Notifications />
                     <RoutesComponent />
                  </DatesProvider>
               </MantineProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
         </QueryClientProvider>
      </Provider>
   )
}

export default App
