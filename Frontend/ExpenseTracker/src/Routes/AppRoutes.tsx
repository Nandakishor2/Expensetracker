// import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainActivity from '../Layouts/MainActivity'
import Accounts from '../Pages/Accounts'
import Loans from '../Pages/Loans'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainActivity />}>
                    <Route element={<Accounts />} path='/accounts' />
                    <Route element={<Loans />} path='/loans' />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes