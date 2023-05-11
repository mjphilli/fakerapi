// 1. import all dependecnies
const express = require("express")
const app = express()
const { faker } = require('@faker-js/faker');


// construct the class
const createUser = () => {
    const newUser = {
        password: faker.internet.password(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
        _id: faker.string.uuid()
    }
    return newUser;
}

const createCompany = () => {
    const newCompany = {
        _id:  faker.string.uuid(),
        name: faker.company.name(),
        address: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country()
        }
    }
    return newCompany;
}

//2. configure express
//make sure these lines are above any app.get 
app.use( express.json() ); //recognize JSON object
app.use( express.urlencoded({ extended: true }) );


//3. define routes and logic
app.get("/api/user/company", (req, res)=>{
    const newFakeUser = createUser()
    const newFakeCompany = createCompany()
    const userCompArr = [newFakeUser, newFakeCompany]
    res.json(userCompArr)
})

app.get("/api/users/new", (req, res)=>{
    const newFakeUser = createUser()
    res.json(newFakeUser)
})

app.get("/api/companies/new", (req, res)=>{
    const newFakeCompany = createCompany()
    res.json(newFakeCompany)
})

//4. listen on the port
app.listen(8000, ()=>console.log('Listening on port: 8000'))