import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllDogsAndTheirUsers } from "../ApiManager"
import "./FindPupdate.css"
import Create from "../assets/createPF.jpeg"
import Match from "../assets/match.jpeg"
import Request from "../assets/email.jpeg"
import Video_main from "../assets/dogs_playing.mp4"



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
        <video loop autoPlay muted id="video_banner">
            <source src={Video_main} type="video/mp4"/>
        </video>
        <div className="welcome">
            <div className="tag_line"><b>Welcome To</b></div>
            <h2 className="banner_words">Pup
                <font color="#ff8c1a"><i>dates</i></font>
            </h2>
            <div className="line_container_welcome">
                <div className="line_divider_welcome"></div>
            </div>
            <div className="tag_line_welcome"><b>Find a playdate for your pup!</b></div>
        </div>
        
        <div className="divider-container">
   
                <div className="Instruction_box">
                    <div className="how_to_header"><b>How to find a match with Pupdates!</b></div>
                </div>
                <div className="illustrations">
                    <div className="single_illustration">
                        <img className="icon_create" src={Create} alt="" width="35%%" height="50%"></img>
                        <div className="illustration_header">Create a Profile</div>
                        <div className="instructions">Create a personalized profile to let other users know a little about your pup and what you're looking for in a match. </div>
                    </div>
                    <div className="single_illustration">
                        <img className="icon_match" src={Match} alt="" width="35%" height="50%"></img>
                        <div className="illustration_header">Find a Match</div>
                        <div className="instructions">Browse all listed active profiles below. Useful information like energy level and age group are listed to help find your pup's perfect match. </div>
                    </div>
                    <div className="single_illustration">
                        <img className="icon_request" src={Request} alt="" width="35%" height="50%"></img>
                        <div className="illustration_header">Send a Pupdate Request</div>
                        <div className="instructions">When you have found a perfect match, send that user a Pupdate request. Your match will reach out to you through the email address provided at registration.</div>
                    </div>
                </div>
        </div>
        <div className="line_container">
            <div className="line_divider"></div>
        </div>
        <section className="sub_header">
            <h3>Browse All Profiles : </h3>
            <section className="search_filter">
                <div className="search_input">
                    <label className="search" htmlFor="search_profile">Search Profiles </label>
                    <input 
                    onChange={
                        (evt) => {setSearch(evt.target.value)}
                    }type="text" name="search_profiles" className="input_field" placeholder="enter dog's name..."/>
                </div>
                <div className="filter_buttons">
                    <button className="sharing_button"
                    onClick={
                        () => {
                            setButton(true)
                        }
                    }>Pupsitting Only</button>
                    <button className="all_button"
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
                        <div className="dog_name">"{dog.name}"</div>
                        <img className="image" src={dog.image} width="300px" alt=""></img>
                        <div className="dog_info">
                            <div><b>Breed: </b>{dog.breed}</div>
                            <div><b>Age: </b>{dog.ageGroup.age}</div>
                            <div><b>Size: </b>{dog.size.size}</div>
                            <div><b>Energy Level: </b>{dog.energyLevel.energy}</div>
                        </div>
                        <div className="aboutMe">
                            <div><b>About Me: </b>{dog.aboutMe}</div>
                        </div>
                        <button id={dog.id} className="view_button"
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


