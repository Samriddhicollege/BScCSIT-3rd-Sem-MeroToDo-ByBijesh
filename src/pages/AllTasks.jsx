import { Link, Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const AllTasks = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}