import { Link, useNavigate} from "react-router-dom"


export const NavBar = () => {
    const navigate = useNavigate()


    return (
        <ul className="navbar">
            <li className="navbar_logout">
                <Link className="navbar_link" to="" 
                onClick={
                    () => {
                        localStorage.removeItem("pup_user")
                    navigate("/", {replace: true})
                    }}>Logout</Link>
            </li>
        </ul>
    )
}