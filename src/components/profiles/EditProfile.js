import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllAgeGroups, getAllEnergyLevels, getAllSizes } from "../ApiManager"
import "./EditProfile.css"


export const EditProfile = () => {
    let {foundDogId} = useParams()

    let [currentDogObject, setCurrentDog] = useState({})
    let [currentUserObject, setCurrentUser] = useState({})

    let [ages, setAges] = useState([])
    let [sizes, setSizes] = useState([])
    let [energies, setEnergies] = useState([])

    const localPupUser = localStorage.getItem("pup_user")
    const pupUserObject = JSON.parse(localPupUser)

    let navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/dogs?_expand=ageGroup&_expand=size&_expand=energyLevel&id=${foundDogId}`)
            .then(response => response.json())
            .then(
                (data) => {
                    let dogObject = data[0]
                    setCurrentDog(dogObject)
                }
            )
            fetch(`http://localhost:8088/users?id=${pupUserObject.id}`)
            .then(response => response.json())
            .then(
                (data) => {
                    let userObject = data[0]
                    setCurrentUser(userObject)
                }
            )
            .then(() => getAllAgeGroups())
            .then(
                (agesArray) => {
                    setAges(agesArray)
                }
            )
            .then(() => getAllSizes())
            .then(
                (sizesArray) => {
                    setSizes(sizesArray)
                }
            )
            .then(() => getAllEnergyLevels())
            .then(
                (energiesArray) => {
                    setEnergies(energiesArray)
                }
            )
        },
        [foundDogId]
    )

    const UpdateProfileButton = (event) => {
        event.preventDefault()

        const updatedUserToSendToAPI = {
            name: currentUserObject.name,
            email: currentUserObject.email,
            pupSitting: currentUserObject.pupSitting,
            aboutMe: currentUserObject.aboutMe
        }
    
        
        return fetch(`http://localhost:8088/users/${pupUserObject.id}`, {
            method: "PUT", 
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedUserToSendToAPI)
        })
        .then(response=>response.json())
        .then(
            (updatedUser) => {
                const updatedDogToSendToAPI = {
                    name: currentDogObject.name,
                    breed: currentDogObject.breed,
                    aboutMe: currentDogObject.aboutMe,
                    image: currentDogObject.image,
                    userId: updatedUser.id,
                    sizeId: currentDogObject.sizeId,
                    energyLevelId: currentDogObject.energyLevelId,
                    ageGroupId: currentDogObject.ageGroupId
                }

                return fetch(`http://localhost:8088/dogs/${foundDogId}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(updatedDogToSendToAPI)
                })
            })      
            .then(response =>response.json())
            .then(
                () => {
                    navigate("/myprofile")
                }
            )
        }

    const DeleteProfileButton = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/users/${pupUserObject.id}`, {
            method: "DELETE"

        })
        fetch(`http://localhost:8088/dogs/${foundDogId}`, {
            method: "DELETE"
        })
        .then(
            () => {
                navigate("/register") 
            }
        )

    }


    const showWidget = (event) => {
        event.preventDefault()

        let widget = window.cloudinary.createUploadWidget(
            { 
            cloudName: `pupdates`,
            uploadPreset: `pup_uploads`
            },
        (error, result) => {
            if (!error && result && result.event === "success") { 
            const copy = structuredClone(currentDogObject)
            copy.image = result.info.url
            setCurrentDog(copy)
        }})
        widget.open()
    }

    return <>
        <form className="edit_form">
            <h2>Edit Your Profile</h2>
            <fieldset className="dog_info">
                <label htmlFor="dog_name">Dog's Name: </label>
                <input required autoFocus type="text" value={currentDogObject.name} 
                onChange = {
                    (evt) => {
                        const copy = structuredClone(currentDogObject)
                        copy.name = evt.target.value
                        setCurrentDog(copy)
                    }
                }/>
                <label htmlFor="dog_breed">Breed: </label>
                <input requred autoFocus type="text" value={currentDogObject.breed} 
                onChange = {
                    (evt) => {
                        const copy = structuredClone(currentDogObject)
                        copy.breed = evt.target.value
                        setCurrentDog(copy)
                    }
                }/>
                <label htmlFor="age">Age: </label>
                <select id="age" 
                onChange={
                    (evt) => {
                        const copy = structuredClone(currentDogObject)
                        copy.ageGroupId = parseInt(evt.target.value)
                        setCurrentDog(copy)
                    }
                }>
                    <option value="">{currentDogObject?.ageGroup?.age}</option>
                    {
                        ages.map(age => <option value={age.id} key={age.id}>{age.age}</option>)
                    }
                </select>
                <label htmlFor="size">Size: </label>
                <select id="size"
                onChange={
                    (evt) => {
                        const copy = structuredClone(currentDogObject)
                        copy.sizeId = parseInt(evt.target.value)
                        setCurrentDog(copy)
                    }
                }>
                    <option value="">{currentDogObject?.size?.size}</option>
                    {
                        sizes.map(size => <option value={size.id} key={size.id}>{size.size}</option> )
                    }
                </select>
                <label htmlFor="energy">Energy Level: </label>
                <select id="energy"
                onChange={
                    (evt) => {
                        const copy = structuredClone(currentDogObject)
                        copy.energyLevelId = parseInt(evt.target.value)
                        setCurrentDog(copy)
                    }
                }>
                <option value="">{currentDogObject?.energyLevel?.energy}</option>
                    {
                        energies.map(energy => <option value={energy.id} key={energy.id}>{energy.energy}</option> )
                    }
                </select>
                <label htmlFor="about_dog">About Me: </label>
                <textarea id="about_dog" className="text_field" value={currentDogObject.aboutMe}
                onChange={
                    (evt) => {
                        const copy = structuredClone(currentDogObject)
                        copy.aboutMe = evt.target.value
                        setCurrentDog(copy)
                    }
                }/>
                <button className="uploadButton" value={currentDogObject.image} onClick={(evt) => showWidget(evt)}>Upload Image</button>
                <img src={currentDogObject.image} width="100px"/>
                <button>Add Pet</button>
            </fieldset>
            <fieldset className="owner_info">
                <label htmlFor="owner_name">Your Name: </label>
                <input required autoFocus type="text" value={currentUserObject.name} 
                onChange={
                    (evt) => {
                        const copy = structuredClone(currentUserObject)
                        copy.name = evt.target.value
                        setCurrentUser(copy)
                    }
                }/>
                <label htmlFor="about_owner">About Me: </label>
                <textarea id="about_owner" className="text_field" value={currentUserObject.aboutMe}
                onChange={
                    (evt) => {
                        const copy = structuredClone(currentUserObject)
                        copy.aboutMe = evt.target.value
                        setCurrentUser(copy)
                    }
                }/>
                <label htmlFor="email">Email: </label>
                <input required autoFocus type="text" value={currentUserObject.email} 
                onChange={
                    (evt) => {
                        const copy = structuredClone(currentUserObject)
                        copy.email = evt.target.value
                        setCurrentUser(copy)
                    }
                }/>
                <label htmlFor="pupsit">Interested in Pupsit Sharing
                <input id="pupsit" type="checkbox" checked={currentUserObject.pupSitting? "checked" : ""} //prepopulates with what user choose at registration
                onChange ={ 
                    () => {
                        const copy = structuredClone(currentUserObject)
                        {
                            currentUserObject.pupSitting //changes pupSitting value from true to false or false to true when user clicks checkbox
                            ? copy.pupSitting = false 
                            : copy.pupSitting = true
                        }
                        setCurrentUser(copy)
                    } 
                }/>
                </label>
            </fieldset>
            <button
            onClick={
                (evt) => {
                    UpdateProfileButton(evt)
                }
            }>Update Profile</button>
        </form>
        <button
        onClick={
            (evt) => {
                DeleteProfileButton(evt)
            }
        }>Delete Profile</button>
    </>
}




/**EditProfile.js ------------

-in ApplicationViews, create a path with :dogId (this was set in the onClick for the edit profile button in MyProfile.js)
-deconstruct the object using useParams()
-create a useState to store current dogObject
-create a useEffect to observe state when dogId changes
    -when dogId changes, fetch that dog Object with the {dogId} and use the setter function to set that dogObject into state variable

-import pup_user from localStorage

-create a useState for housing transient state for users input for USERS information. 
    -create a fetch call on the users array for the specific user who's user id = pup_user.id (`users/{pup_user.id})
    -use setter function to store into user variable

-create update profile button function
    -create a fetch call to a specific userId 
    -method should be PUT to update with users updated input

    -create a fetch call to a specific dogId
    -method should be PUT to update with users updated input

    -include event.preventDefault()

    -navigate users back to their updated profile

-create a delete profile button
    -create a fetch call to the specific userId
    -method should be DELETE

    -create a fetch call to the specific dogId
    -method should be DELETE

    -navigate user back to my profile page 


    -return the html for the form.
    -make sure value=dog.name etc to prepopulate all fields with what user has already input
    -invoke update profile function on button
    -invoke delete profile function on button
 */