const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
    // app.get('',(req, res)=>{ //request, response
    //     res.send('hello express')
    // })

// define path for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'James'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'James'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some help text',
        title: 'Help',
        name: "James"
    })
})

// console.log(path.join(__dirname,'../public'))


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "must provide an address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                error: "must provide an address"
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    // Cannot set headers after they are sent to the client means 2 sends
    if (!req.query.search) {
        return res.send({
            error: "must provide search term"
        })
    }
    // req.query
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => { //*: match anything that is not specified
    res.render('404Page', {
        title: "404",
        name: "James",
        error: "no article found"
    })
})

app.get('*', (req, res) => {
    res.render('404Page', {
        title: '404',
        name: 'James',
        errorMessage: "invalid address"
    })
})


app.listen(3000, () => {
        console.log('server is up on port 3000')
    }) //development prot

console.log(__dirname)