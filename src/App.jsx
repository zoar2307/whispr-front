import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ChatsPage } from "./pages/ChatsPage"

function App() {

  return (
    <Router>
      <Routes>
        {/* <Route element={<HomePage />} path="/" /> */}
        <Route element={<ChatsPage />} path="/" />
      </Routes>
    </Router>
  )
}

export default App
