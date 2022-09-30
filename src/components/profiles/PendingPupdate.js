import { useEffect, useState } from "react"
import { getAllDogs, getAllRequests, getAllUsers } from "../ApiManager"
import "./PendingPupdates.css"


export const PendingPupdate = () => {
   
    const [requests, setRequests] = useState([])

    const [dogs, setDogs] = useState([])
    const [users, setUsers] = useState([])
 

    const [accept, setAccept] = useState(
        {
            acceptButtonId: 0,
            click: false
        }
    )

 useEffect(
    () => {
       getAllDogs()
       .then(
        (dogArray) => setDogs(dogArray)
       )
       getAllUsers()
       .then(
        (usersArray) => setUsers(usersArray)
       )
       getAllRequests()
       .then(
            (requestArray) => setRequests(requestArray)    
       )
      
    },
    
    []
 )

  
    let localPupUser = localStorage.getItem("pup_user")
    let pupUserObject = JSON.parse(localPupUser)
 
    let foundUserDog = dogs.find(dog =>dog.userId === pupUserObject.id) 
    let requestsArray = requests.filter(request=> request.recievingDogId === foundUserDog?.id)
    

    if (requestsArray.length > 0) {
        return <>
        <div className="line_container_pupdates">
            <div className="line_divider_pupdates"></div>
        </div>
        {
            requestsArray.map(
                (request) => {
                    const foundInitiatingDog = dogs.find(dog=> dog.id === request.initiatingDogId)
                    const foundInitiatingUser = users.find(user => user?.id === foundInitiatingDog?.userId)
                    const foundRecievingDog = dogs.find(dog=> dog.id === request.recievingDogId)

                        return <>
                        <section className="pupdate_request" key={request.id}>
                            <div className="text">"{foundInitiatingDog?.name}" would like a playdate with "{foundRecievingDog?.name}"
                            <button id={foundInitiatingDog?.id} className="contact_button"
                            onClick={
                                (evt) => {
                                    const copy = structuredClone(accept)
                                    copy.click = true
                                    copy.acceptButtonId = parseInt(evt.target.id)
                                    setAccept(copy)
                                }
                            }>Show Contact</button>
                            <button id={request.id} className="decline_button"
                            onClick={
                                () => {
                                    fetch(`http://localhost:8088/requests/${request.id}`, {
                                        method: "DELETE"
                                    })
                                    .then(
                                        () => getAllRequests()
                                    )
                                    .then(
                                        (requestsArray) => setRequests(requestsArray)
                                    )
                                    .then(
                                        () => {
                                            window.location.reload(false)
                                        }
                                    )
                                
                                }
                            }>Remove</button>
                            {
                                accept.click && accept.acceptButtonId === foundInitiatingDog.id
                                ? <section className="contact_info">
                                <div>Contact {foundInitiatingDog.name}'s owner <b>{foundInitiatingUser.name}</b>, to set up a playdate!</div> 
                                <div><b>Email: </b>{foundInitiatingUser.email}</div>
                                </section>
                                : ""
                            }
                            </div>
                        </section>
                        </>
                })
        }
        <div className="line_container_pupdates">
            <div className="line_divider_pupdates"></div>
        </div>
        </>      
    }
    else {
      return <div>No Pending Pupdates</div>
    }

}