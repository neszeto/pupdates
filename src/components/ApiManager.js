/*ApiManager.js -------
-this module will house all the fetch calls from the api
-create a function called getAllDogs()
    -this function will fetch the dogs array with 3 expansions (energyLevel, size, ageGroup)
-create a function called getAllUsers()
    -this function will fetch all users from api
-create a function called getAllRequests()
    -this function will fetch all requests from api
*/




export const getAllDogs = () => {
    return fetch(`http://localhost:8088/dogs?_expand=ageGroup&_expand=size&_expand=energyLevel`)
    .then (response => response.json())
}

export const getAllUsers = () => {
    return fetch(`http://localhost:8088/users`)
    .then (response => response.json())
}

export const getAllRequests = () => {
    return fetch(`http://localhost:8088/requests`)
    .then (response => response.json())
}

export const getAllSizes = () => {
    return fetch(`http://localhost:8088/sizes`)
    .then(response => response.json())
}

export const getAllAgeGroups = () => {
    return fetch(`http://localhost:8088/ageGroups`)
    .then(response => response.json())
}

export const getAllEnergyLevels = () => {
    return fetch(`http://localhost:8088/energyLevels`)
    .then(response => response.json())
}