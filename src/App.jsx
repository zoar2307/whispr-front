import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ChatsPage } from "./pages/ChatsPage"
import { userChatsService } from "./services/userChats.service"

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
