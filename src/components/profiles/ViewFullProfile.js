import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllDogs, getAllUsers } from "../ApiManager"
import "./ViewFullProfile.css"

let API = "http://localhost:8088"



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

        fetch(`${API}/requests`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestObjectToSendToAPI)
        })
        .then(response=>response.json())
        .then(
            () => {
                setFeedback("Your Pupdate request has been successfully sent!")
            }
        )

    }

    return<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>{feedback}</div>
        <section className="profile_page">
            <div className="my_profile"><b>{foundDog?.name}'s Profile</b></div>
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
                        ? <div className="interested_pupsit">🐾  <b>Interested in Pupsitting</b></div>
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

