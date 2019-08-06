console.log('client side js loading!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(search.value)
    messageOne.textContent = 'loading'
    fetch('/weather?address=' + search.value).then(response => {
        response.json().then((data) => {
            if (data.error) {
                console.log("error")
                messageTwo.textContent = 'error'
            } else {
                console.log(data.location)
                console.log(data.forecast)
                messageOne.textContent = "the weather forecast for " + data.location + " is: " + data.forecast
            }
        })
    })
})