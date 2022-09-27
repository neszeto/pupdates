import { Route, Routes } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { NavBar } from "./nav/NavBar"

import { ApplicationViews } from "./views/ApplicationViews"
import { Authorized } from "./views/Authorized"

export const Pupdates = () => {
    return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />
		

		<Route path="*" element={
			<Authorized>
				<>
                    <NavBar />
					<ApplicationViews />
				</>
			</Authorized>

		} />
	</Routes>
}




/*
ALGORITHMS

index.js -----------

-this module is the first page for the project(login). It renders the route to the very first page the browser will display


pupdates.js ---------

-this module handles the routing for the first page for the project (login and register) and the main page (navbar and ApplicationViews) that is placed as CHILDREN to authorized.js

Login.js --------

-this module returns the html for the login page. 
-create state for holding the user who's email is being typed into the login (onChange event for entering email field)
-when the submit button is hit, the handleLogin function gets triggered. 
-handleLogin function fetches the userObject who's email is typed, if there is one, then it sets that user id into localStorage under the name "pup_user"
-if there isn't, than it does a window.alert saying "invalid login"

Register.js ---------
-on the login page, if users click "Not a member yet?" they will be navigated to this page. 
-This page is responsible for rendering the html for the registration page (full name, email, about me, interested in pupsitting and a register button).
-create state that will hold the transient state for when a user is filling out the form. Create default settings. 
-create a function for registering a new user (registerNewUser)
    -fetch the users array and perform a POST operation for the user in transient state
    -take the newly created user and store it's id in localStorage
    -navigate back to the main page
-create a function for when the user hits the register button
    -perform a fetch for the user's who email matches what was typed. 
    -if there is an email found than this is a duplicate email and a window alert will say account already exists
    -if none found, then invoke registerNewUser function

Authorized.js -------
-this module uses the useLocation hook and sets it to the variable location
-if a user has logged in, it will return the children routes (NavBar and ApplicationViews)
-if not, it will navigate back to login? ***UNSURE OF THIS CODE-REVISIT****

NavBar.js --------
-this module will house the links to all the different views of the project(Pending Pupdates, Find A Pupdate, Local Dog Parks, Create Profile, My Profile)
-onClick it should navigate users to appropriate pages
-applicationviews will house pathways for each. 

ApplicationViews.js ------
-this module will house all the route paths for the main project (everything but login and register)


ApiManager.js -------
-this module will house all the fetch calls from the api
-create a function called getAllDogs()
    -this function will fetch the dogs array with 3 expansions (energyLevel, size, ageGroup)
-create a function called getAllUsers()
    -this function will fetch all users from api
-create a function called getAllRequests()
    -this function will fetch all requests from api


FindPupdate.js ---------

-create a function named FindPupdate()
-create a useState to house the array of dogs
-create a useEffect that observes initial state and invokes the getAllDogs function from ApiManager
-return the html for this page
    -map through the array of dogs and create html for a single dog (name, image, information and view full profile button - this button will invoke the function below and set event.target.value as its arguement)
     -make sure that specific dog's id is stored in value

-create a function for when the view full profile button is clicked that accepts one parameter (dogId)
    -this function should return <ViewFullProfile dogId={dogId}/> prop drilling


CreateProfile.js -----------

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

MyProfile.js -------------

-this page is dependent on pup_user so will need to get that out of localstorage 
    -const localPupUser = localStorage.getItem("pup_user") 
    const pupUserObject = JSON.parse(localPupUser)
IF localStorage contains pup_user, run code below
    -import getAllDogs() and getAllUsers() from ApiManager
    -use .find to find the user who's id matches the pup_user.id 
    -set that userObject into the variable foundUser
    -use .find to find the dog who's userId matches the pup_user.id
    -set that dogObject into the variable foundDog
    -return the html for this page (foundDog.image foundDog.name foundUser.name, )
        -create a turnary key for pupsit sharing. If pupsit sharing is TRUE: display `interested...` on page. If FALSE: display "" (nothing)
    -create edit profile button
        -onClick, navigate to EditProfile.js (interpolate dog.id into url code)
ELSE return msg that reads "YOUR PROFILE HAS BEEN DELETED"

EditProfile.js ------------

-in ApplicationViews, create a path with :dogId (this was set in the onClick for the edit profile button in MyProfile.js)
-deconstruct the object using useParams()
-create a useState to store current dogObject
-create a useEffect to observe state when dogId changes
    -when dogId changes, fetch that dog Object with the {dogId} and use the setter function to set that dogObject into state variable

-import pup_user from localStorage

-create a useState for housing transient state for users input for USERS information. 
    -create a fetch call on the users array for the specific user who's user id = pup_user.id (`users/{pup_user.id})
    -use setter function to store into user variable

-create update profile button
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




ViewFullProfile.js -----------

-create a function called ViewFullProfile({dogId}) this object deconstruction is the dog id number of the dog profile clicked on
-create a useState to set the dog array into state variable
-create useState to set usersArray into state variable

-create a useEffect to observe initial state and set the dogArray into the state variable (getAllDogs()) and also set users into state variable (getAllUsers())
-use the .find to find the dogObject that has the same id as the decontructed object dogId -set into variable foundDog

-use .find again to find userObject who's id === foundDog.userId -set into variable foundUser

 -return the html for this page (foundDog.image foundDog.name foundUser.name, )
        -create a turnary key for pupsit sharing. If pupsit sharing is TRUE: display `interested...` on page. If FALSE: display "" (nothing)
    -create schedule pupdate button


    ***STRETCH GOAL --STILL NEED TO IMPLEMENT****
-create a function for schedule pupdate button
    -create a requestObject to send to API
        -should have initiatingDogId 
            -import pup_user and do a .find on the dogs array to find dog object who's userId === pup_user.Id 
            -get the id from this dogObject and use as property for initiatingDogId
        -and a recievingDogId {dogId}
    -creates a POST to the requests array (need to fetch requests array)
    -**CREATE ALGORITHM FOR SUCCESS POPUP MESSAGE**


LocalDogParks.js ------------

***NEEDS ALGORITHM****

PendingPupdates.js ----------
-create a PendingPupdates function
-create useState to store dogArray into state
-create useState to store userArray into state
-create useState for storing requests Array into state
-useEffect to observe initial state should invoke getAllDogs() and getAllUsers() and getAllRequests() and set them into their state variables

import pup_user
-create a .find to find the dogObject who's userId === pup_user.id (foundRecievingDog)
-create a .find to find the dogObject who's id === requests.initiatingDogId (foundInitiatingDog)
-create a .find for the userObject who's id === foundInitiatingDog.userId (foundInitiatingUser)
-map through the requests array
    -IF foundRecievingDog.id === request.recievingDogId
        -display html for foundInitiatingDog.name wants a play date with foundRecievingDog.name
        -include two buttons: Accept and Decline
        -create turnary key for IF click: true
            -then display foundInitiatingUser.email
            ELSE ...display ""
-Build out Accept button
    -create a useState to store whether button has been clicked or not
    -create default setting to click: false
    -create an onClick function for the Accept button, when clicked, change click: true 
        -IF true, then turnary key in html should display the contact info for initiatingDog Owner

 */