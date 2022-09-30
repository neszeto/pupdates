import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Register.css"

let API = "http://localhost:8088"

export const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "", 
        pupSitting: false, 
        aboutMe: ""
        
    })

    const [hover, setHover]= useState(false)

    const onHover = () => {
        setHover(true);
    }

    const onLeave = () => {
        setHover(false);
    }


    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch(`${API}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("pup_user", JSON.stringify({
                        id: createdUser.id,
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`${API}/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{height: '100vh'}}>
            <form className="form--register" onSubmit={handleRegister}>
                <div className="register">
                    <div className="register_title">Please Register for Pupdates</div>
                    <fieldset>
                        <label htmlFor="fullName"> Full name </label>
                        <input onChange={updateUser}
                            type="text" id="name" className="form-control"
                            placeholder="Enter your name" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="email"> Email address </label>
                        <input onChange={updateUser}
                            type="email" id="email" className="form-control"
                            placeholder="Email address" required />
                    </fieldset>
                    <fieldset className="aboutMe_section">
                        <label htmlFor="email"> About Me</label>
                        <textarea onChange={updateUser}
                            type="email" id="aboutMe" className="form-aboutMe"
                            required />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="pupSitting">Interested in Pupsitting </label>
                        <input onClick={
                            (evt) => {
                                const copy = structuredClone(user)
                                copy.pupSitting = evt.target.checked
                                setUser(copy)
                            }
                        }
                        type="checkbox" id="pupSitting" />
                        <div onMouseEnter={onHover} onMouseLeave={onLeave}>Whats this?</div>
                        <div>
                            {
                                hover ? <div><i>'Pupsitting' participants are interested in swapping dog sitting responsibilities with other participants. You can opt into or out of this feature at any time.</i></div> : ""
                            }
                        </div>
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="register_button"> Register </button>
                    </fieldset>
                </div>
            </form>
        </main>
    )
}