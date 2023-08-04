
let form = document.getElementById('form1')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(document.getElementById('address').value)
    weatherFunction()
    form.reset()

})
const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const forecastF = document.getElementById('forecast')
const latitudeF = document.getElementById('latitude')
const lontitudeF = document.getElementById('longtitude')


// // async --> function return promise
let weatherFunction = async () => {
    try {
        const address = document.getElementById("address").value;
        const res = await fetch('http://localhost:3000/ch-weather?address=' + address);
        const data = await res.json()
        console.log(data)
        if (data.error) {
            errorF.innerText = data.error
            latitudeF.innerText = ""
            lontitudeF.innerText = ""
        }
        else {
            setTimeout(() => {
                locationF.innerText = data.location
            }, 500)

            setTimeout(() => {
                latitudeF.innerText = data.latitude
            }, 1000)

            setTimeout(() => {
                lontitudeF.innerText = data.longitude
            }, 1500)
            setTimeout(() => {
                forecastF.innerText = data.forecastF
            }, 2000)


            errorF.innerText = ""
        }
    }
    catch (e) {
        console.log(e)
    }
}