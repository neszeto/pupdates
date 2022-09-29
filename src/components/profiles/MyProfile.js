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
import "./MyProfile.css"


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
        return  <section className="profile_page">
            <div class="container">
            </div>
            <div className="my_profile"><b>My Profile</b></div>
            <article className="dog_owner">
                <div className="dog_image">
                    <img className="profile_image" src={foundDog?.image} height="500px" alt=""></img>
                </div>
                <div className="all_info">
                    <section className="dog_stats">
                        <div><b>Name: </b>{foundDog?.name}</div>
                        <div><b>Breed: </b>{foundDog?.breed}</div>
                        <div><b>Age: </b>{foundDog?.ageGroup?.age}</div>
                        <div><b>Size: </b>{foundDog?.size?.size}</div>
                        <div><b>Energy Level: </b>{foundDog?.energyLevel?.energy}</div>
                        <div className="profile_aboutMe"><b>About Me: </b>{foundDog?.aboutMe}</div>
                    </section>
                  
                    <div className="owner">
                        <div><b>{foundDog?.name}'s Human: </b>{foundUser?.name}</div>
                        <div className="profile_aboutMe"><b>About Me: </b>{foundUser?.aboutMe}</div>
                        {
                            foundUser?.pupSitting
                            ? <div className="interested_pupsit"><b>🐾 Interested in Pupsitting</b></div>
                            : ""
                        }
                    </div>
                </div>
            </article>
            <article className="button_box">
                <button id={foundDog?.id} className="edit_button"
                onClick = {
                    (evt) => {
                        let foundDogId = evt.target.id
                        navigate(`/editprofile/${foundDogId}`)
                    }
                }>Edit Profile</button>
            </article>
        </section>
    }

    else {
        return <div>No Profile Found</div>
    }

}