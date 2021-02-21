import React from "react"
import "./App.scss"
import { AppRoutes } from "./AppRoutes"
import { BrowserRouter as Router } from "react-router-dom"
import { APIServiceContext, Service } from "./hooks/useClientAPIService"

function App({ service }: { service: Service | null }) {
  return (
    <div>
      <APIServiceContext.Provider value={service}>
        <Router>
          <AppRoutes />
        </Router>
      </APIServiceContext.Provider>
    </div>
  )
}

export default App
