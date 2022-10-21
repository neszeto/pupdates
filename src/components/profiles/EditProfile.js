import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllAgeGroups, getAllEnergyLevels, getAllSizes } from "../ApiManager"
import "./EditProfile.css"

let API = "http://localhost:8088"

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
            fetch(`${API}/dogs?_expand=ageGroup&_expand=size&_expand=energyLevel&id=${foundDogId}`)
            .then(response => response.json())
            .then(
                (data) => {
                    let dogObject = data[0]
                    setCurrentDog(dogObject)
                }
            )
            fetch(`${API}/users?id=${pupUserObject.id}`)
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
    
        
        return fetch(`${API}/users/${pupUserObject.id}`, {
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

                return fetch(`${API}/dogs/${foundDogId}`, {
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

        fetch(`${API}/users/${pupUserObject.id}`, {
            method: "DELETE"

        })
        fetch(`${API}/dogs/${foundDogId}`, {
            method: "DELETE"
        })
        .then(
            () => {
                navigate("/login") 
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

    return <section className="whole_page">
        <form className="edit_form">
            <div className="edit_header"><b>Edit Your Profile</b></div>
            <div className="line_container_edit">
                <div className="line_divider_edit"></div>
            </div>
            <fieldset className="dogform_info">
                <label className="form_headers" htmlFor="dog_name">Dog's Name </label>
                <input className="form_input" required autoFocus type="text" value={currentDogObject.name} 
                onChange = {
                    (evt) => {
                        const copy = structuredClone(currentDogObject)
                        copy.name = evt.target.value
                        setCurrentDog(copy)
                    }
                }/>
                <label className="form_headers"  htmlFor="dog_breed">Breed </label>
                <input className="form_input" required autoFocus type="text" value={currentDogObject.breed} 
                onChange = {
                    (evt) => {
                        const copy = structuredClone(currentDogObject)
                        copy.breed = evt.target.value
                        setCurrentDog(copy)
                    }
                }/>
                <label className="form_headers"  htmlFor="age">Age </label>
                <select id="age" className="form_input" 
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
                <label className="form_headers"  htmlFor="size">Size </label>
                <select id="size" className="form_input" 
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
                <label className="form_headers"  htmlFor="energy">Energy Level </label>
                <select id="energy" className="form_input" 
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
                <label className="form_headers" htmlFor="about_dog">About Me </label>
                <textarea id="about_dog" className="text_field" value={currentDogObject.aboutMe}
                onChange={
                    (evt) => {
                        const copy = structuredClone(currentDogObject)
                        copy.aboutMe = evt.target.value
                        setCurrentDog(copy)
                    }
                }/>
                <div className="upload_preview">
                    <button className="form_upload_button" value={currentDogObject.image} onClick={(evt) => showWidget(evt)}>Upload Image</button>
                    <div className="image_preview">
                        <div>Image Preview: </div>
                        <img src={currentDogObject.image} width="100px"/>
                    </div>
                </div>
                <div className="add_pet_box">
                    <button className="add_button">Add Pet</button>
                </div>
            </fieldset>
            <fieldset className="owner_info">
                <label className="form_headers" htmlFor="owner_name">Your Name </label>
                <input required autoFocus type="text" value={currentUserObject.name} className="form_input"
                onChange={
                    (evt) => {
                        const copy = structuredClone(currentUserObject)
                        copy.name = evt.target.value
                        setCurrentUser(copy)
                    }
                }/>
                <label className="form_headers" htmlFor="about_owner">About Me </label>
                <textarea id="about_owner" className="text_field" value={currentUserObject.aboutMe}
                onChange={
                    (evt) => {
                        const copy = structuredClone(currentUserObject)
                        copy.aboutMe = evt.target.value
                        setCurrentUser(copy)
                    }
                }/>
                <label className="form_headers" htmlFor="email">Email address </label>
                <input required autoFocus type="text" value={currentUserObject.email} className="form_input"
                onChange={
                    (evt) => {
                        const copy = structuredClone(currentUserObject)
                        copy.email = evt.target.value
                        setCurrentUser(copy)
                    }
                }/>
                <label className="form_interested" htmlFor="pupsit">Interested in Pupsit Sharing
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
            <div className="update_button_box">
                <button className="update_button"
                onClick={
                    (evt) => {
                        UpdateProfileButton(evt)
                    }
                }>Update Profile</button>
            </div>
        </form>
        <div className="delete_button_box">
            <button className="delete_button"
            onClick={
                (evt) => {
                    DeleteProfileButton(evt)
                }
            }>Delete Profile</button>
        </div>
    </section>
}




