
/*CreateProfile.js -----------

-create a function called CreateProfile()
-create a useState for housing transient state for user's input for DOG information (name, breed etc). Create default settings for these.

-import pup_user from localStorage

-create a useState for housing transient state for users input for USERS information. 
    -create a fetch call on the users array for the specific user who's user id = pup_user.id (`users/{pup_user.id})
    -use setter function to store into user variable

-create function for create profile button
    -create an object for users to send to API
    -create a fetch call that performs a PUT function to the users array
    - .then create another object for dogs to send to API
    -the userId on this new object will be from the updated user object
    -create a fetch call that performs a POST function to the dogs array
    -navigate  users back to their newly created profile 

-create the html for the form (include the create profile button) 
    -make sure value = user.name etc (prepopulate their original inputs)
    -create onchange events for each field and invoke the appropriate setter function (users or dogs)
    -when submit button clicked, invoke create profile function above


     name: "",
            email: "",
            pupSitting: false,
            aboutMe: ""

*/

import { useEffect, useState } from "react"
import { getAllAgeGroups, getAllEnergyLevels, getAllSizes } from "../ApiManager"


export const CreateProfile = () => {
    
    const [dog, setDog] = useState(
        {
            name: "",
            breed: "",
            aboutMe: "",
            image: "",
            userId: 0,
            sizeId: 0,
            energyLevelId: 0,
            ageGroupId: 0
        }
    )

    const [user, setUser] = useState({})

    let [ages, setAges] = useState([])
    let [sizes, setSizes] = useState([])
    let [energies, setEnergies] = useState([])


    const localPupUser = localStorage.getItem("pup_user")
    const pupUserObject = JSON.parse(localPupUser)
    
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${pupUserObject.id}`)
            .then(response => response.json())
            .then(
                (userObject) => {
                    setUser(userObject)
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
        []
    )
    
    
    
    return <>
     <form className="create_form">
            <h2>Create Your Profile</h2>
            <fieldset className="dog_info">
                <label htmlFor="dog_name">Dog's Name: </label>
                <input required autoFocus type="text" value={dog.name} 
                onChange = {
                    (evt) => {
                        const copy = structuredClone(dog)
                        copy.name = evt.target.value
                        setDog(copy)
                    }
                }/>
                <label htmlFor="dog_breed">Breed: </label>
                <input requred autoFocus type="text" value={dog.breed}
                onChange = {
                    (evt) => {
                        const copy = structuredClone(dog)
                        copy.breed = evt.target.value
                        setDog(copy)
                    }
                }/>
                <label htmlFor="age">Age: </label>
                <select id="age"
                onChange={
                    (evt) => {
                        const copy = structuredClone(dog)
                        copy.ageGroupId = parseInt(evt.target.value)
                        setDog(copy)
                    }
                }>
                    <option value="">Select Age Group</option>
                    {
                        ages.map(age => <option value={age.id}>{age.age}</option>)
                    }
                </select>
                <label htmlFor="size">Size: </label>
                <select id="size"
                onChange={
                    (evt) => {
                        const copy = structuredClone(dog)
                        copy.sizeId = parseInt(evt.target.value)
                        setDog(copy)
                    }
                }>
                    <option value="">Select Size</option>
                    {
                        sizes.map(size => <option value={size.id}>{size.size}</option> )
                    }
                </select>
                <label htmlFor="energy">Energy Level: </label>
                <select id="energy"
                onChange={
                    (evt) => {
                        const copy = structuredClone(dog)
                        copy.energyLevelId = parseInt(evt.target.value)
                        setDog(copy)
                    }
                }>
                <option value="">Select Energy Level</option>
                    {
                        energies.map(energy => <option value={energy.id}>{energy.energy}</option> )
                    }
                </select>
                <label htmlFor="about_dog">About Me: </label>
                <textarea id="about_dog" className="text_field" value={dog.aboutMe}
                onChange={
                    (evt) => {
                        const copy = structuredClone(dog)
                        copy.aboutMe = evt.target.value
                        setDog(copy)
                    }
                }/>
                <label htmlFor="upload">Upload Image: </label>
                <input required autoFocus type="text" value={dog.image} 
                onChange={
                    (evt) => {
                        const copy = structuredClone(dog)
                        copy.image = evt.target.value
                        setDog(copy)
                    }
                }/>
                <button>Add Pet</button>
            </fieldset>
            <fieldset className="owner_info">
                <label htmlFor="owner_name">Your Name: </label>
                <input required autoFocus type="text" value={user.name} 
                onChange={
                    (evt) => {
                        const copy = structuredClone(user)
                        copy.name = evt.target.value
                        setUser(copy)
                    }
                }/>
                <label htmlFor="about_owner">About Me: </label>
                <textarea id="about_owner" className="text_field" value={user.aboutMe}
                onChange={
                    (evt) => {
                        const copy = structuredClone(user)
                        copy.aboutMe = evt.target.value
                        setUser(copy)
                    }
                }/>
                <label htmlFor="email">Email: </label>
                <input required autoFocus type="text" value={user.email} 
                onChange={
                    (evt) => {
                        const copy = structuredClone(user)
                        copy.email = evt.target.value
                        setUser(copy)
                    }
                }/>
                <label htmlFor="pupsit">Interested in Pupsit Sharing
                <input id="pupsit" type="checkbox" checked={user.pupSitting? "checked" : ""} //prepopulates with what user choose at registration
                onChange ={ 
                    () => {
                        const copy = structuredClone(user)
                        {
                            user.pupSitting //changes pupSitting value from true to false or false to true when user clicks checkbox
                            ? copy.pupSitting = false 
                            : copy.pupSitting = true
                        }
                        setUser(copy)
                    } 
                }/>
                </label>
            </fieldset>
            <button
            onClick={
                (evt) => {
                    
                }
            }>Create Profile</button>
        </form>
    </>
}