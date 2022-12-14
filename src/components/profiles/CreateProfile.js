import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllAgeGroups, getAllDogs, getAllEnergyLevels, getAllSizes } from "../ApiManager"
import "./EditProfile.css"


let API = "http://localhost:8088"

export const CreateProfile = () => {
    
    const [dog, setDog] = useState(
        {
            name: "",
            breed: "",
            aboutMe: "",
            image: "",
            sizeId: 0,
            energyLevelId: 0,
            ageGroupId: 0
        }
    )
    const [dogs, setDogs] = useState([])
    const [user, setUser] = useState({})

    let [ages, setAges] = useState([])
    let [sizes, setSizes] = useState([])
    let [energies, setEnergies] = useState([])


    const localPupUser = localStorage.getItem("pup_user")
    const pupUserObject = JSON.parse(localPupUser)

    let navigate = useNavigate()
    
    
    useEffect(
        () => {
            fetch(`${API}/users/${pupUserObject.id}`)
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
            .then(() => getAllDogs())
            .then(
                (dogsArray) => {
                    setDogs(dogsArray)
                }
            )
        },
        []
    )
  

    const CreateProfileButton = (event) => {
        event.preventDefault()
    

        const updatedUserToSendToAPI = {
            name: user.name,
            email: user.email,
            pupSitting: user.pupSitting,
            aboutMe: user.aboutMe
        }

        return fetch(`${API}/users/${pupUserObject.id}`, {
            method: "PUT", 
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedUserToSendToAPI)
        })
        .then(response => response.json())
        .then(
            (updatedUserObject) => {
                const dogToSendToAPI = {
                    name: dog.name,
                    breed: dog.breed,
                    aboutMe: dog.aboutMe,
                    image: dog.image,
                    userId: updatedUserObject.id,
                    sizeId: dog.sizeId,
                    energyLevelId: dog.energyLevelId,
                    ageGroupId: dog.ageGroupId
                }
                return fetch(`${API}/dogs`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(dogToSendToAPI)
                })
        })
        .then(response=>response.json())
        .then(
            () => {
                navigate("/myprofile")
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
            console.log(result.info.url)
            const copy = structuredClone(dog)
            copy.image = result.info.url
            setDog(copy)
        }})
        widget.open()
      }


    let foundDog = dogs.find(dog => dog.userId === pupUserObject.id)
    
    if (pupUserObject && foundDog) {
        return <div>Your profile has already been created</div>
    }
    else {
        return <section className="whole_page">
        <form className="edit_form">
               <div className="edit_header"><b>Create Your Profile</b></div>
               <div className="line_container_edit">
                    <div className="line_divider_edit"></div>
                </div>
               <fieldset className="dogform_info">
                   <label className="form_headers" htmlFor="dog_name">Dog's Name: </label>
                   <input className="form_input" required autoFocus type="text" value={dog.name} 
                   onChange = {
                       (evt) => {
                           const copy = structuredClone(dog)
                           copy.name = evt.target.value
                           setDog(copy)
                       }
                   }/>
                   <label className="form_headers" htmlFor="dog_breed">Breed: </label>
                   <input requred autoFocus type="text" value={dog.breed} className="form_input"
                   onChange = {
                       (evt) => {
                           const copy = structuredClone(dog)
                           copy.breed = evt.target.value
                           setDog(copy)
                       }
                   }/>
                   <label className="form_headers" htmlFor="age">Age: </label>
                   <select id="age" className="form_input"
                   onChange={
                       (evt) => {
                           const copy = structuredClone(dog)
                           copy.ageGroupId = parseInt(evt.target.value)
                           setDog(copy)
                       }
                   }>
                       <option value="">Select Age Group</option>
                       {
                           ages.map(age => <option value={age.id} key={age.id}>{age.age}</option>)
                       }
                   </select>
                   <label className="form_headers" htmlFor="size">Size: </label>
                   <select id="size" className="form_input"
                   onChange={
                       (evt) => {
                           const copy = structuredClone(dog)
                           copy.sizeId = parseInt(evt.target.value)
                           setDog(copy)
                       }
                   }>
                       <option value="">Select Size</option>
                       {
                           sizes.map(size => <option value={size.id} key={size.id}>{size.size}</option> )
                       }
                   </select>
                   <label className="form_headers" htmlFor="energy">Energy Level: </label>
                   <select id="energy" className="form_input"
                   onChange={
                       (evt) => {
                           const copy = structuredClone(dog)
                           copy.energyLevelId = parseInt(evt.target.value)
                           setDog(copy)
                       }
                   }>
                   <option value="">Select Energy Level</option>
                       {
                           energies.map(energy => <option value={energy.id} key={energy.id}>{energy.energy}</option> )
                       }
                   </select>
                   <label className="form_headers" htmlFor="about_dog">About Me: </label>
                   <textarea id="about_dog" className="text_field" value={dog.aboutMe}
                   onChange={
                       (evt) => {
                           const copy = structuredClone(dog)
                           copy.aboutMe = evt.target.value
                           setDog(copy)
                       }
                   }/>
                    <div className="upload_preview">
                        <button className="form_upload_button" onClick={(evt) => showWidget(evt)}>Upload Image</button>
                        <div>Image Preview: </div>
                        <img src={dog.image} width="100px"/>
                    </div>
                    <div className="add_pet_box">
                        <button className="add_button">Add Pet</button>
                    </div>
               </fieldset>
               <fieldset className="owner_info">
                   <label className="form_headers" htmlFor="owner_name">Your Name: </label>
                   <input required autoFocus type="text" value={user.name} className="form_input"
                   onChange={
                       (evt) => {
                           const copy = structuredClone(user)
                           copy.name = evt.target.value
                           setUser(copy)
                       }
                   }/>
                   <label className="form_headers" htmlFor="about_owner">About Me: </label>
                   <textarea id="about_owner" className="text_field" value={user.aboutMe}
                   onChange={
                       (evt) => {
                           const copy = structuredClone(user)
                           copy.aboutMe = evt.target.value
                           setUser(copy)
                       }
                   }/>
                   <label className="form_headers" htmlFor="email">Email: </label>
                   <input required autoFocus type="text" value={user.email}  className="form_input"
                   onChange={
                       (evt) => {
                           const copy = structuredClone(user)
                           copy.email = evt.target.value
                           setUser(copy)
                       }
                   }/>
                   <label className="form_interested" htmlFor="pupsit">Interested in Pupsit Sharing
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
               <button className="create_button"
               onClick={
                   (evt) => {
                       CreateProfileButton(evt)
                   }
               }>Create Profile</button>
           </form>
           
       </section>
    }
}


