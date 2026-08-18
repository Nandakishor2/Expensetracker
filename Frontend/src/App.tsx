import MainActivity from "./Layouts/MainActivity"
import { APIResponseProvider } from "./Context/APIResponse"
import Status from "./Pages/Status"

function App() {
  return (
    <APIResponseProvider>
      <MainActivity />
      <Status />
    </APIResponseProvider>
  )
}

export default App

