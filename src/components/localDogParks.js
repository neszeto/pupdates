import { useEffect, useState } from "react"
import { getAllParks } from "./ApiManager"


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
        {
            dogParks.map(
                (park) => {
                    return <section key={park.id}>
                        <section>
                            <div>{park.name}</div>
                            <div>{park.hours}</div>
                            <div>{park.location}</div>
                        </section>
                        <section>
                            <img src={park.image} width="300px" alt=""></img>
                        </section>
                    </section>
            })
        }
    </section>
}