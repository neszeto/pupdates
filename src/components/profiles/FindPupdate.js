import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllDogs } from "../ApiManager"
import { ViewFullProfile } from "./ViewFullProfile"


export const FindPupdate = () => {
    const navigate = useNavigate()
    const [dogs, setDogs] = useState([])

    useEffect(
        () => {
            getAllDogs()
            .then(
                (dogsArray) => {
                    setDogs(dogsArray)
                }
            )
        }, 
        []
    )
   
    
    return <>
        <h2>View All Profiles</h2>
        <article>
            {
                dogs.map(
                    (dog) => {
                        return <>
                        <div>"{dog.name}"</div>
                        <img src={dog.image} width="300px" alt=""></img>
                        <div className="dog_info">
                            <div>Breed: {dog.breed}</div>
                            <div>Age: {dog.ageGroup.age}</div>
                            <div>Size: {dog.size.size}</div>
                            <div>Energy Level: {dog.energyLevel.energy}</div>
                            <div>About Me: {dog.aboutMe}</div>
                        </div>
                        <button id={dog.id}
                        onClick ={
                            (evt) => {
                                let dogId = evt.target.id
                                navigate(`/fullprofile/${dogId}`)
                                
                            }
                        }>View Full Profile</button>
                        </>
                        
                    }
                )
            }    
        </article>
        </>
       
    
}


/**FindPupdate.js ---------

-create a function named FindPupdate()
-create a useState to house the array of dogs
-create a useEffect that observes initial state and invokes the getAllDogs function from ApiManager
-return the html for this page
    -map through the array of dogs and create html for a single dog (name, image, information and view full profile button - this button will invoke the function below and set event.target.value as its arguement)
     -make sure that specific dog's id is stored in value

-create a function for when the view full profile button is clicked that accepts one parameter (dogId)
    -this function should return <ViewFullProfile dogId={dogId}/> prop drilling


    



*/