import express from "express";
import axios from "axios";
import {client} from "./redisClient.js"

const app = express();

app.get("/" , async(req , res) =>{

    const cacheValue = await client.get("todos");
   //cheack and return 
    // if(cacheValue) return res.json(cacheValue)
        if(cacheValue) return res.json(JSON.parse(cacheValue));

//  const {todos} = await axios.get("https://jsonplaceholder.typicode.com/todos");
//  console.log(todos)

  const data = await fetch("https://jsonplaceholder.typicode.com/todos")
 
  const todos = await data.json();
  //set cache

  await client.set("todos" , JSON.stringify(todos)) //in redis bata in string so convert in it
  await client.expire("todos" , 30) //set expire on todod 

 
     res.json(todos)


    



})


app.listen(3000);