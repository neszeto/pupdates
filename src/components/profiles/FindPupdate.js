import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllDogsAndTheirUsers } from "../ApiManager"
import "./FindPupdate.css"




export const FindPupdate = () => {
    const navigate = useNavigate()
    const [dogs, setDogs] = useState([])

    const [search, setSearch] = useState("")
    const [filteredDogs, setFiltered] = useState([])
    const [pupsitButton, setButton] = useState(false)

    useEffect(
        () => {
            getAllDogsAndTheirUsers()
            .then(
                (dogsArray) => {
                    setDogs(dogsArray)
                    setFiltered(dogsArray)
                }
            )
        }, 
        []
    )

    useEffect(
        () => {
            if (search) {
                const searchedDog = dogs.filter(dog=>dog.name.toLowerCase().startsWith(search.toLowerCase()))
                setFiltered(searchedDog)
            }
            else {
                setFiltered(dogs)
            }

        }, 

        [search]
    )
   
    useEffect(
        () => {
            if (pupsitButton) {
                const pupsitDogArray = dogs.filter(dog=>dog.user.pupSitting === true)
                setFiltered(pupsitDogArray)
            }
            else {
                setFiltered(dogs)
            }
        },
        [pupsitButton]
    )
    
    return <article className="main_background">
        <h2 className="banner">Pup
            <font color="#ff8c1a"><i>dates</i></font>
        </h2>
        <section className="sub_header">
            <h3>View All Profiles</h3>
            <section className="search_filter">
                <div className="search_input">
                    <label className="search" htmlFor="search_profile">Search Profiles </label>
                    <input 
                    onChange={
                        (evt) => {setSearch(evt.target.value)}
                    }type="text" name="search_profiles" placeholder="enter dog's name..."/>
                </div>
                <div className="filter_buttons">
                    <button
                    onClick={
                        () => {
                            setButton(true)
                        }
                    }>Pupsit Sharing Only</button>
                    <button
                    onClick={
                        () => {
                            setButton(false)
                        }
                    }>All Profiles</button>
                </div>
            </section>
        </section>
        
        <section className="all_profiles">
            {
                filteredDogs.map(
                    (dog) => {
                        return <section className="dog_profile" key={dog.id}>
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
                        </section>
                        
                    }
                )
            }    
        </section>
        </article>
       
    
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