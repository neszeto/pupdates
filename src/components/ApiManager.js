export const getAllDogs = () => {
    return fetch(`http://localhost:8088/dogs`)
    .then (response => response.json())
}