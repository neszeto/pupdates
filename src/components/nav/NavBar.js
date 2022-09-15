import { Link, useNavigate} from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
    const navigate = useNavigate()


    return (
        <ul className="navbar">
            <li className="navbar_products">
                <Link className="find_pup" to="/findpupdate">Find a Pupdate</Link>
            </li> 
            <li className="navbar_products">
                <Link className="create_profile" to="/createprofile">Create Profile</Link>
            </li> 
            <li className="navbar_products">
                <Link className="my_profile" to="/myprofile">My Profile</Link>
            </li> 
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