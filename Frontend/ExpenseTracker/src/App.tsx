
function App() {

  return (
    <>
      <div className="grid gap-2 m-2 sm:grid-cols-12 ">
        <div className="sm:col-span-12 bg-blue-400"> Navbar</div>
        <div className="sm:col-span-3 bg-red-400"> Sidebar</div>
        <div className="sm:col-span-6 bg-green-400"> Main</div>
        <div className="sm:col-span-3 bg-yellow-400"> Adverts </div>
      </div>

    </>
  )
}

export default App
