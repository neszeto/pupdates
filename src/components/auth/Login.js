import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"


export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("pup_user", JSON.stringify({
                        id: user.id   
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main style={{height: '100vh'}} className="container--login">
            <h1>Pup
                <font color="#ff8c1a"><i>dates</i></font>
                <div className="tag_line"><i>"Find a playdate for your pup!"</i></div>
            </h1>
            <section>
                <form className="form--login" onSubmit={handleLogin}> 
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail" className="email">Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="email"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button className="myButton" type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="register_link">
                <Link to="/register" >Not a member yet?</Link>
            </section>
        </main>
    )
}