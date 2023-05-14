# frontEnd-RestfulAPI
this project uses web frontend and Restful API with node.js dockerlized using docker compose
 
 #about api 
 baseUrl = http://localhost:5000

post
(to add person) 
add to base url "/persons" 
object in json form
"id": 2,
"name": "midgdfgdg",
"age": 21,
"gender": "male",
"email": "micheal@gmail.com"

get
(to get person)
add to base url "/persons/:id"
id = id you want
no request is sent

(to get all persons)
add to base url "/persons"
no request is sent

put
(to update id of spasific person)
add to base url "/persons/:id" where id = id you want to update
no request is sent 

Delete
(delete person)
put in base url "/persons/:id" where id = id you want to delete
no request is sent

----------------------------------------------------------
#front end is a website for adding users and delete users and dispaly them
