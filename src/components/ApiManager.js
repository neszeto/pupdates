

let API = "http://localhost:8088"

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