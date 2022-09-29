import { useEffect, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { getAllDogs, getAllRequests, getAllUsers } from "../ApiManager"
import "./NavBar.css"



export const NavBar = () => {

    const localPupUser = localStorage.getItem("pup_user")
    const pupUserObject = JSON.parse(localPupUser)

    let navigate = useNavigate()

    const [dogs, setDogs] = useState([])
    const [users, setUsers]= useState([])
    const [requests, setRequests] = useState([])
    
  
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
            getAllRequests()
            .then( 
                (requestArray) => {
                    setRequests(requestArray)
                }
            )
        }, 
        []
    )

  

    let foundUser = users.find(user => user.id === pupUserObject.id)
    let foundDog = dogs.find(dog => dog.userId === pupUserObject.id)

    let userRequests = requests.filter(request=> request.recievingDogId === foundDog?.id)

    return (<>
        <ul className="navbar">
            <div className="left_side_links">
                <div className="greeting"><b>Hello, </b><i>{foundUser?.name}!</i></div>
            </div>
            <div className="right_side_links">
                <li className="navbar_products">
                    <Link className="link" to="/localParks">Local Dog Parks</Link>
                </li>
                <li className="navbar_products">
                    <div className="notify-container">
                        {
                            userRequests.length > 0 ?<span className="notify-bubble">{userRequests.length}</span> : ""
                        }
                    
                    <Link className="link" to="/pendingpupdate">Pending Pupdates</Link>
                    </div>
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
                            <div className="avatar">
                                <img src={foundDog?.image}></img>
                            </div>
                        
                        </li>
                        </>
                }
                <li className="navbar_logout">   
                    <Link className="link" to="" 
                    onClick={
                        () => {
                            localStorage.removeItem("pup_user")
                        navigate("/", {replace: true})
                        }}><b>Logout</b></Link>
                </li>
            </div>
        </ul>
        </>
    )
}