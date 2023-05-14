let nameInput = document.querySelector("#nameInput");
let idInput = document.querySelector("#idInput");
let ageInput = document.querySelector("#ageInput");
let genderInput = document.getElementsByName("inlineRadioOptions");
let emailInput = document.querySelector("#emailInput");
let ChangeDataBtn = document.querySelector("#ChangeDataBtn");

//buttons selector
let addUserBtn = document.querySelector("#addUserBtn");
let updateBtn = document.querySelector("#updateBtn");
let deleteBtn = document.querySelector("#deleteBtn");
//table selector
let tableData = document.querySelector("#tableData");
//UserArray
let UserArray = [];
let url="http://localhost:5000/persons"
//---------------------functions-----------------

//Event lisener
addUserBtn.addEventListener("click", addUser);

//display data in API
async function getData() {
 let result = await fetch("http://localhost:5000/persons" ,{method:"GET"});
 let finalResult =await result.json();
 console.log("finalResult"+JSON.stringify(finalResult.userArray));
 UserArray=await finalResult.userArray
 displayUsers(UserArray)
//  localStorage.setItem("usersArray",JSON.stringify(finalResult))
}
getData()
// add User to array and send it to api
function addUser() {
let genderValue= getRadioValue()
if(idInput.value!="" && nameInput.value!="" && ageInput.value!="" &&emailInput.value!=""){ //validate data not null
    let User = {
    id: idInput.value,
    name: nameInput.value,
    age: ageInput.value,
    gender: genderValue,
    email: emailInput.value,
  };
  console.log('user'+JSON.stringify(User));
  console.log("genderInput" +JSON.stringify(genderInput));
  // UserArray.push(User);
  PostUser(User)
  displayUsers(UserArray);
}else{
  window.alert("enter Data")
}
}

async function PostUser(User) {
try{
let result = await fetch("http://localhost:5000/persons",{method:"POST" ,headers: {
  'Content-Type': 'application/json',
  // Add any additional headers as needed
}, body:JSON.stringify(User)});
let finalResult = await result.json()
UserArray=await finalResult.userArray
console.log("userarray after reasigned in Post"+JSON.stringify(UserArray)); 
console.log("result of post"+JSON.stringify(finalResult.userArray)); 
idInput.classList.remove("is-invalid")
displayUsers(UserArray) //NOTE this function make change
}catch(error){
idInput.classList.add("is-invalid")
}
}

function getRadioValue() {
    console.log("gender 1"+genderInput[0].value);
    console.log("gender 2"+genderInput[1].value);
    for (let i = 0; i < genderInput.length; i++) {
      if (genderInput[i].checked) {
          return genderInput[i].value;
      }
        
    }
}


function displayUsers(array) {
  console.log("Array of users in display function" + JSON.stringify(array));
  let box=``  ;
  for (let i = 0; i < array.length; i++) {
    if(array[i] != null){
        box += `
<tr>
<td>${i+1}</td>
<td>${array[i].name}</td>
<td>${array[i].id}</td>
<td>${array[i].age}</td>
<td>${array[i].gender}</td>
<td>${array[i].email}</td>
<td><button class="btn bg-warning" id="updateBtn" onclick="Update(${array[i].id})"><i class="fa-solid fa-pen-to-square pe-1"></i>Update</button></td>
<td><button class="btn bg-danger" id="deleteBtn"  onclick="Delete(${array[i].id})"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button></td>
</tr>
`}
}
tableData.innerHTML = box;
}

async function Update(index) { //click on update  btn in table
  console.log("updateBtn clicked");
    //make change btn appear
addUserBtn.classList.replace("d-block","d-none");
ChangeDataBtn.classList.replace("d-none","d-block")

let userToUpdate=await GetPersonById(index) //return User object that have  this id
console.log("userToUpdate",userToUpdate);
nameInput.value=userToUpdate.name
idInput.value=userToUpdate.id
ageInput.value=userToUpdate.age
// genderInput.value=userToUpdate.gender
console.log("user gender"+userToUpdate.gender);
if (userToUpdate.gender=="male") {
  genderInput[0].checked=true
}else{
  genderInput[1].checked=true
}
emailInput.value=userToUpdate.email
//change button clicked 
ChangeDataBtn.addEventListener("click",function() {
ChangeData(index)

})

}
async function GetPersonById(ID) {

let result = await fetch(`http://localhost:5000/persons/${ID}`,{method:"GET"})
finalResult = await result.json()
console.log("GetPersonById"+JSON.stringify(finalResult));
return finalResult
}
async function ChangeData(ID) {
try{
  let updatedUser = {
    id: idInput.value,
    name:nameInput.value,
    age: ageInput.value,
    gender: getRadioValue(),
    email: emailInput.value,
  };
  console.log("updatedUser"+JSON.stringify(updatedUser));
let result = await fetch(`http://localhost:5000/persons/${ID}`,{method:"PUT" ,headers: {
  'Content-Type': 'application/json',}, body:JSON.stringify(updatedUser)})
let finalResult = await result.json();
console.log("PUT user by id response"+finalResult);


}catch(error){
  console.log(error);
  getData()
  //add btn appear 
ChangeDataBtn.classList.replace("d-block","d-none");
addUserBtn.classList.replace("d-none","d-block")
}
}
async function Delete(ID) {
try{
  let result = await fetch(`http://localhost:5000/persons/${ID}`,{method:"DELETE"})
  let finalResult = await result.json();
  console.log("PUT user by id response"+finalResult); 
}catch(error){
console.log(error);
}
getData();
}