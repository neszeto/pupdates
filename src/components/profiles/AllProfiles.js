import { useState } from "react"
import { getAllDogs } from "../ApiManager"


export const AllProfiles = () => {
    const [dogs, setDogs] = useState()

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
    
    
    
    
    return <section>
        <h2>View All Profiles</h2>
        {
            dogs.map(
                (dog) => {
                    return <>
                    <div>{dog.name}</div>
                    <img src={dog.image} alt=""></img>
                    <div className="dog_info">
                        <div></div>
                    </div>
                    </>
                    
                }
            )
        }
    </section>
}