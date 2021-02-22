import React from "react"
import "./App.scss"
import { AppRoutes } from "./AppRoutes"
import { BrowserRouter as Router } from "react-router-dom"
import { APIServiceContext, Service } from "./hooks/useClientAPIService"
import { SnackProvider } from "./hooks/useSnackNotification"

function App({ service }: { service: Service | null }) {
  return (
    <div>
      <APIServiceContext.Provider value={service}>
        <SnackProvider>
          <Router>
            <AppRoutes />
          </Router>
        </SnackProvider>
      </APIServiceContext.Provider>
    </div>
  )
}

export default App
