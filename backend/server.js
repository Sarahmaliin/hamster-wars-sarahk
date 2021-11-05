const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5550; //om heroku ger port anv den, om undefined anv vår egna port om kör på egen dator
const hamsterRouter = require('./routes/hamsters.js')

app.use(cors())

app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )
app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url}`, req.body);
	next()
})

app.use(express.static(__dirname + '/public'))
//routes/endpoints

app.use('/hamsters', hamsterRouter)

// Denna som ger error i heroku?
app.get('*', (req, res) => {
	const adress = path.join(__dirname, 'build', 'index-html')
	res.sendFile(adress)
})

app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
})