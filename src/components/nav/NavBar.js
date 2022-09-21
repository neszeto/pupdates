import { useEffect, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { getAllDogs, getAllUsers } from "../ApiManager"
import "./NavBar.css"



export const NavBar = () => {

    const localPupUser = localStorage.getItem("pup_user")
    const pupUserObject = JSON.parse(localPupUser)

    let navigate = useNavigate()

    const [dogs, setDogs] = useState([])
    const [users, setUsers]= useState([])
  
    useEffect(
        () => {
            getAllDogs()
            .then(
                (dogArray) => {
                    setDogs(dogArray)
                }
            )
            getAllUsers()
            .then(
                (userArray) => {
                    setUsers(userArray)
                }
            )
        }, 
        []
    )

    let foundUser = users.find(user => user.id === pupUserObject.id)
    let foundDog = dogs.find(dog => dog.userId === pupUserObject.id)

    return (<>
        <ul className="navbar">
            <div className="greeting">Hello, <i>{foundUser?.name}!</i></div>
            <li className="navbar_products">
                <Link className="link" to="/pendingpupdate">Pending Pupdates</Link>
            </li> 
            <li className="navbar_products">
                <Link className="link" to="/">Find a Pupdate</Link>
            </li> 
            {
                foundDog
                ?   <li className="navbar_products">
                        <Link className="link" to="/myprofile">My Profile</Link>
                    </li>
                :   <><li className="navbar_products">
                        <Link className="link" to="/createprofile">Create Profile</Link>
                    </li> 
                    <li className="navbar_products">
                        <Link className="link" to="/myprofile">My Profile</Link>
                    </li>
                    </>
            }
            
            <li className="navbar_logout">   
                <Link className="link" to="" 
                onClick={
                    () => {
                        localStorage.removeItem("pup_user")
                    navigate("/", {replace: true})
                    }}>Logout</Link>
            </li>
        </ul>
        </>
    )
}