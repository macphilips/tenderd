import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./app/App"
import reportWebVitals from "./app/reportWebVitals"
import firebase from "firebase"
import { loadIcons } from "./app/config/load-icon"
import setupAxiosInterceptors from "./app/config/axios-config"
import { Service } from "./app/hooks/useClientAPIService"
import { APIServiceImpl, AuthService } from "./app/services/APIService"

const config = require("./firebase-config.json")
firebase.initializeApp(config)

const auth = firebase.auth()

setupAxiosInterceptors(auth)

if (process.env.REACT_APP_USE_FIREBASE_EMULATOR) {
  auth.useEmulator("http://localhost:9099")
}

const service: Service = {
  auth: new AuthService(auth),
  api: new APIServiceImpl()
}

loadIcons()

ReactDOM.render(
  <React.StrictMode>
    <App service={service} />
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your config, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
