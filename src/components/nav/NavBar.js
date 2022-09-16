import { useEffect, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { getAllDogs } from "../ApiManager"
import "./NavBar.css"


export const NavBar = () => {

    const localPupUser = localStorage.getItem("pup_user")
    const pupUserObject = JSON.parse(localPupUser)

    let navigate = useNavigate()

    const [dogs, setDogs] = useState([])
  
    useEffect(
        () => {
            getAllDogs()
            .then(
                (dogArray) => {
                    setDogs(dogArray)
                }
            )
        }, 
        []
    )

    
    let foundDog = dogs.find(dog => dog.userId === pupUserObject.id)

    return (
        <ul className="navbar">
            <li className="navbar_products">
                <Link className="pending_pup" to="/pendingpupdate">Pending Pupdates</Link>
            </li> 
            <li className="navbar_products">
                <Link className="find_pup" to="/findpupdate">Find a Pupdate</Link>
            </li> 
            {
                foundDog
                ?   <li className="navbar_products">
                        <Link className="my_profile" to="/myprofile">My Profile</Link>
                    </li>
                :   <><li className="navbar_products">
                        <Link className="create_profile" to="/createprofile">Create Profile</Link>
                    </li> 
                    <li className="navbar_products">
                        <Link className="my_profile" to="/myprofile">My Profile</Link>
                    </li>
                    </>
            }
            
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