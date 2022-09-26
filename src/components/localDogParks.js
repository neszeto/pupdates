import { useEffect, useState } from "react"
import { getAllParks } from "./ApiManager"
import "./LocalDogParks.css"


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
        <div className="dogPark_header">Local Dog Parks in Nashville</div>
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
    </section>
}