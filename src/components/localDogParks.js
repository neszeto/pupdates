import { useEffect, useState } from "react"
import { getAllParks } from "./ApiManager"
import "./LocalDogParks.css"
import Video from "./assets/dog_running.mp4"


export const LocalDogParks = () => {
    const [dogParks, setDogParks] = useState([])

    useEffect(
        () => {
            getAllParks()
            .then(
                (parksArray) => {
                    setDogParks(parksArray)
                }
            )
        },
        []
    )
    
    
    return <section>
        <div>
            <video loop autoPlay muted id="video">
                <source src={Video} type="video/mp4"/>
            </video>
            <div className="header_subheader">
                <div className="dogPark_header"><b>Find the perfect spot for your pupdate!</b></div>
                <div className="dogPark_subHeader">Browse a list of Nashville's local dog parks below, including location and hours of operation. </div>
            </div>
        </div>
        <div className="information_section">
        {
            dogParks.map(
                (park) => {
                    return <>
                    <section key={park.id} className="info_image" >
                        <section className="park_info">
                            <div className="park_name">{park.name}</div>
                            <div className="park_details"><b>Hours: </b>{park.hours}</div>
                            <div className="park_details"><i>{park.location}</i></div>
                        </section>
                        <section className="park_image">
                            <img className="image_of_park" src={park.image} width="300px" alt=""></img>
                        </section>
                    </section>
                    </>
            })
        }
        </div>
    </section>
}

