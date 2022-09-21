
/**
 * 
 * PendingPupdates.js ----------
-create a PendingPupdates function
-create useState to store dogArray into state
-create useState to store userArray into state
-create useState for storing requests Array into state
-useEffect to observe initial state should invoke getAllDogs() and getAllUsers() and getAllRequests() and set them into their state variables

import pup_user
-create a .find to find the dogObject who's userId === pup_user.id (foundReceivingDog)
-create a .find to find the dogObject who's id === requests.initiatingDogId (foundInitiatingDog)
-create a .find for the userObject who's id === foundInitiatingDog.userId (foundInitiatingUser)
-map through the requests array
    -IF foundRecievingDog.id === request.recievingDogId
        -display html for foundInitiatingDog.name wants a play date with foundRecievingDog.name
        -include two buttons: Accept and Decline
        -create turnary key for IF click: true
            -then display foundInitiatingUser.email
            ELSE ...display ""
-Build out Accept button
    -create a useState to store whether button has been clicked or not
    -create default setting to click: false
    -create an onClick function for the Accept button, when clicked, change click: true 
        -IF true, then turnary key in html should display the contact info for initiatingDog Owner

 */

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllDogs, getAllRequests, getAllUsers } from "../ApiManager"
import "./PendingPupdates.css"



export const PendingPupdate = () => {
 const [dogs, setDogs] = useState([])
 const [users, setUsers] = useState([])
 const [requests, setRequests] = useState([])

 const [accept, setAccept] = useState(
    {
        acceptButtonId: 0,
        click: false
    }
 )

 let navigate = useNavigate()

const localPupUser = localStorage.getItem("pup_user")
const pupUserObject = JSON.parse(localPupUser)

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
        (requestsArray) => setRequests(requestsArray)
       )
    },
    
    []
 )


    
 const requestsArray = requests.filter(request=> request.recievingDogId === pupUserObject.id)

 const foundRecievingDog = dogs.find(dog=> dog.userId === pupUserObject.id)


 
    return <>
    {
        requestsArray.map(
            (request) => {
                const foundInitiatingDog = dogs.find(dog=> dog.id === request.initiatingDogId)
                const foundInitiatingUser = users.find(user => user?.id === foundInitiatingDog.userId)

                return <section className="pupdate_request" key={request.id}>
                <div className="text">"{foundInitiatingDog?.name}" would like a playdate with "{foundRecievingDog.name}"
                <button id={foundInitiatingDog.id} className="contact_button"
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
                    }
                }>Decline</button>
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
            })
          
    }
    </>
}