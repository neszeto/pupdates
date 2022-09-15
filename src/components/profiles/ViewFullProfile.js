import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllDogs, getAllUsers } from "../ApiManager"

export const ViewFullProfile = () => {
    const {dogId} = useParams()
    const [dogs, setDogs] = useState([])
    const [users, setUsers] = useState([])

    const localPupUser = localStorage.getItem("pup_user")
    const pupUserObject = JSON.parse(localPupUser)

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

    let foundDog = dogs.find(dog => dog.id === parseInt(dogId))
 
    let foundUser = users.find(user => user.id === foundDog.userId)
    

    return<>
        <h2>{foundDog?.name}'s Profile</h2>
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
        {
            pupUserObject.id === foundDog?.userId
            ? ""
            : <button>Schedule Pupdate</button>
        }
    </>
    
}



/**ViewFullProfile.js -----------

-create a function called ViewFullProfile() 
-useParams to get the dogId
-create a useState to set the dog array into state variable
-create useState to set usersArray into state variable

-create a useEffect to observe initial state and set the dogArray into the state variable (getAllDogs()) and also set users into state variable (getAllUsers())
-use the .find to find the dogObject that has the same id as the params dogId -set into variable foundDog

-use .find again to find userObject who's id === foundDog.userId -set into variable foundUser

 -return the html for this page (foundDog.image foundDog.name foundUser.name, )
        -create a turnary key for pupsit sharing. If pupsit sharing is TRUE: display `interested...` on page. If FALSE: display "" (nothing)
    -create schedule pupdate button


***STRETCH GOAL --STILL NEED TO IMPLEMENT****
-create a function for schedule pupdate button
    -create a requestObject to send to API
        -should have initiatingDogId 
            -import pup_user and do a .find on the dogs array to find dog object who's userId === pup_user.Id 
            -get the id from this dogObject and use as property for initiatingDogId
        -and a recievingDogId {dogId}
    -creates a POST to the requests array (need to fetch requests array)
    -**CREATE ALGORITHM FOR SUCCESS POPUP MESSAGE**
 */