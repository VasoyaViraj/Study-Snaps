import express from 'express'

const app = express()
const port = 8080

app.use(express.json())

let teaData = []
let nextID = 1

app.post('/', (req, res) => {
    const {name, price} = req.body
    const newTea = {
        id : nextID++,
        name,
        price
    }
    teaData.push(newTea)
    res.status(200).send(newTea)
})

app.get('/', (req,res)=>{
    res.status(200).send(teaData)
})

app.get('/:id', (req,res)=>{
    let tea = teaData.find((t) => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Chai not found')
    }
    res.status(200).send(tea)
})

app.put('/:id', (req,res) => {
    let tea = teaData.find((t) => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Chai not found')
    }
    
    const {name, price} = req.body
    
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

app.listen(port, () => {
    console.log(`Server is listening at port : ${port}`)
})