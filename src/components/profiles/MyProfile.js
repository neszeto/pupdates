/*MyProfile.js -------------

-this page is dependent on pup_user so will need to get that out of localstorage 
    -const localPupUser = localStorage.getItem("pup_user") 
    const pupUserObject = JSON.parse(localPupUser)
IF localStorage contains pup_user, run code below
    -import getAllDogs() and getAllUsers() from ApiManager
    -use .find to find the user who's id matches the pup_user.id 
    -set that userObject into the variable foundUser
    -use .find to find the dog who's userId matches the pup_user.id
    -set that dogObject into the variable foundDog
    -return the html for this page (foundDog.image foundDog.name foundUser.name, )
        -create a turnary key for pupsit sharing. If pupsit sharing is TRUE: display `interested...` on page. If FALSE: display "" (nothing)
    -create edit profile button
        -onClick, navigate to EditProfile.js (interpolate dog.id into url code)
ELSE return msg that reads "YOUR PROFILE HAS BEEN DELETED"

*/

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllDogs, getAllUsers } from "../ApiManager"


export const MyProfile = () => {
    const localPupUser = localStorage.getItem("pup_user")
    const pupUserObject = JSON.parse(localPupUser)

    let navigate = useNavigate()

    const [dogs, setDogs] = useState([])
    const [users, setUsers] = useState([])

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
                (usersArray) => {
                    setUsers(usersArray)
                }
            )

        }, 
        []
    )

    let foundUser = users.find(user => user.id === pupUserObject.id)
    let foundDog = dogs.find(dog => dog.userId === pupUserObject.id)
    
    
    if (pupUserObject && foundDog) { 
        return <>
            <h2> My Profile</h2>
            <article>
                <div className="dog">
                    <img src={foundDog?.image} width="300px" alt=""></img>
                    <section className="dog_info">
                        <div>Breed: {foundDog?.breed}</div>
                        <div>Age: {foundDog?.ageGroup?.age}</div>
                        <div>Size: {foundDog?.size?.size}</div>
                        <div>Energy Level: {foundDog?.energyLevel?.energy}</div>
                        <div>About Me: {foundDog?.aboutMe}</div>
                    </section>
                </div>
                
                <div className="owners">
                    <div>{foundDog?.name}'s Human: {foundUser?.name}</div>
                    <div>About Me: {foundUser?.aboutMe}</div>
                    {
                        foundUser?.pupSitting
                        ? <div>* Interested in Pupsit Sharing</div>
                        : ""
                    }
                </div>
            </article>
            <button id={foundDog?.id}
            onClick = {
                (evt) => {
                    let foundDogId = evt.target.id
                    navigate(`/editprofile/${foundDogId}`)
                }
            }>Edit Profile</button>
        </>
    }

    else {
        return <div>No Profile Found</div>
    }
    
  


}