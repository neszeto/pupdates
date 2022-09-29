/*ApiManager.js -------
-this module will house all the fetch calls from the api
-create a function called getAllDogs()
    -this function will fetch the dogs array with 3 expansions (energyLevel, size, ageGroup)
-create a function called getAllUsers()
    -this function will fetch all users from api
-create a function called getAllRequests()
    -this function will fetch all requests from api
*/

let API = "https://dolphin-app-eblpn.ondigitalocean.app"

export const getAllDogsAndTheirUsers = () => {
    return fetch (`${API}/dogs?_expand=ageGroup&_expand=size&_expand=energyLevel&_expand=user`)
    .then (response => response.json())
}

export const getAllDogs = () => {
    return fetch(`${API}/dogs?_expand=ageGroup&_expand=size&_expand=energyLevel`)
    .then (response => response.json())
}

export const getAllUsers = () => {
    return fetch(`${API}/users`)
    .then (response => response.json())
}

export const getAllRequests = () => {
    return fetch(`${API}/requests`)
    .then (response => response.json())
}

export const getAllSizes = () => {
    return fetch(`${API}/sizes`)
    .then(response => response.json())
}

export const getAllAgeGroups = () => {
    return fetch(`${API}/ageGroups`)
    .then(response => response.json())
}

export const getAllEnergyLevels = () => {
    return fetch(`${API}/energyLevels`)
    .then(response => response.json())
}

export const getAllParks = () => {
    return fetch(`${API}/dogParks`)
    .then(response=>response.json())
}