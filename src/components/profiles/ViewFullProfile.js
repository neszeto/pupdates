import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllDogs, getAllUsers } from "../ApiManager"
import "./ViewFullProfile.css"

export const ViewFullProfile = () => {
    const {dogId} = useParams()
    const [dogs, setDogs] = useState([])
    const [users, setUsers] = useState([])

    const[feedback, setFeedback] = useState("")

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

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000); //timer set to 3000milliseconds(3 secs) and then setFunction("") will execute
        }
        }, 
    [feedback]
    )

    let foundDog = dogs.find(dog => dog.id === parseInt(dogId))
 
    let foundUser = users.find(user => user.id === foundDog?.userId)
    
    let foundInitiatingDog = dogs.find(dog=> dog.userId === pupUserObject.id)


    const SchedulePupdateButton =(evt) => {
        evt.preventDefault()

        const requestObjectToSendToAPI = {
            initiatingDogId: foundInitiatingDog.id,
            recievingDogId: parseInt(dogId)
        }

        fetch(`http://localhost:8088/requests`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestObjectToSendToAPI)
        })
        .then(response=>response.json())
        .then(
            () => {
                setFeedback("Your Pupdate request has been successfully sent")
            }
        )

    }

    return<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>{feedback}</div>
        <section className="profile_page">
            <div className="my_profile">{foundDog?.name}'s Profile</div>
            <article className="dog_owner">
                <div className="dog_image">
                    <img className="profile_image" src={foundDog?.image} height="500px" alt=""></img>
                </div>
                <div className="all_info">
                    <section className="dog_stats">
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
                        ? <div className="interested_pupsit">🐾  Interested in Pupsitting</div>
                        : ""
                    }
                </div>
                </div>
            </article>
            {
                pupUserObject.id === foundDog?.userId
                ? ""
                : <article className="button_box">
                    <button className="edit_button"
                onClick={
                    (evt) => {
                        SchedulePupdateButton(evt)
                    }
                }>Schedule Pupdate</button>
                </article>
            }
        </section>
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