const fs = require("fs/promises");// file system read file & write in it
const express = require("express");
// const cors = require("cors");
const _ = require("lodash"); //generate random selection
const { v4: uuid } = require("uuid"); // generate ID
const { find } = require("lodash");
const { nextTick } = require("process");
const cors=require('cors'); //this is add to solve cros problem
let userArray =[];

const app = express();
app.use(express.json())
app.use(cors())





  //add code ================================================
app.post("/persons", async (req, res) => {
    // const content = req.body.content;
    // const userId = uuid();
    try{
    console.log("userid ="+req.body);
    let userId = req.body["id"];
    let userName = req.body["name"];
    let userAge = req.body["age"];
    let userGender = req.body["gender"];
    let userEmail = req.body["email"];
    let person ={
        id: userId,
        name: userName, 
        age: userAge,
        gender: userGender ,
        email:userEmail
    }
    // let person= req.body;

    index = userArray.findIndex((obj => obj.id == person.id));
    if(index != -1 || !index){
        throw 'there is user with the same id'
    }
    userArray.push(person);
    
    
	// if (!person) {
	// 	return res.sendStatus(400);
	// }

	// await fs.mkdir("data/person", { recursive: true });
	// await fs.writeFile(`data/person/persons`, userArray);

	res.status(201).json({
		userArray
	});
}
catch(error){
    res.send(error.toString('ascii') );
}
});

app.get('/persons',(req,res)=>{

    
        res.json({
            userArray
        })
   
        
    })


//working on  code under this comment


app.get("/persons/:id", async (req, res) => {
	try{
        index = userArray.findIndex((obj => obj.id == req.params.id));

        if(index == -1 ){
            throw 'user not found'
        }
    res.send(userArray[index])
    }catch(error){
        res.send('not found')
        
    }

	// try {
	// 	content = await fs.readFile(`data/comments/${id}.txt`, "utf-8");
	// } catch (err) {
	// 	return res.sendStatus(404);
	// }

	
});

app.put('/persons/:id', async (req, res) => {
    try {
        const userId = req.body["id"];
        const userName = req.body["name"];
        const userEmail = req.body["email"];
        const userGender = req.body["gender"];
        const userAge = req.body["age"];
        
        index=userArray.findIndex((obj=>obj.id==req.params.id));
        index2=userArray.findIndex((obj=>obj.id==userId));
        if(index==-1) throw 'id not found'
        if(index2 !=-1 && index!=index2) throw 'new id already exists'
        if(userId) userArray[index].id=userId;
        if(userName) userArray[index].name=userName;
        if(userEmail) userArray[index].email=userEmail;
        if(userGender) userArray[index].gender=userGender;
        if(userAge) userArray[index].age=userAge;
        
        
        res.send('Update complete')
    }
    catch (error) {
        res.send(error.toString('ascii'));
    }
});


app.delete('/persons/:id', async (req, res) => {    //http://localhost:5000/products/1
    try {
        index=userArray.findIndex((obj=>obj.id==req.params.id))
        if(index==-1)throw 'no person with this id'
        let filteredPersons = userArray.filter( function(val) { //callback function
            if(val.id != req.params.id) { //filtering criteria
                return val;
            }
        })
        userArray=filteredPersons
        // write()
        res.send('Deleted Successfuly');
    }
    catch (error) {
        res.send(error.toString('ascii'));
}
});


app.listen(5000 ,()=> console.log("welcome to mangment system"))