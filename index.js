const express = require("express");

const app = express();

app.use(express.json());

let student = [{name: "Bhavin", course:"Backend", grid:3342, id : 1}];

app.get("/", (req, res)=>{

    res.status(200).send("Welcome to Express");

})
//get method
app.get("/student",(req,res)=>{
    res.status(200).send(student);
})

//post method
app.post("/student", (req, res)=>{
    console.log(req.body)
    let newStudent={
        name: req.body.name,
        course : req.body.course,
        grid : req.body.grid,
        id : student.length + 1,
    }
    student.push(newStudent);
    // student.push(req.body);
    res.status(200).send(newStudent);
})

//patch method
app.patch("/student/:id", (req, res)=>{
    console.log(req.params.id);

    let {id} = req.params;
    // let update = student.filter(students => students.id == id);
    // console.log(update)

    let index = student.findIndex(students => students.id == id);
    console.log(index);

    if (index == -1){
        res.status(404).send("Student not found")
    }
    else{
        student[index].name = req.body.name;
        student[index].course = req.body.course;
        student[index].grid = req.body.grid;

        console.log(student[index])
    }
    res.send(student[index])
})

//Delete method

app.delete("/student/:id", (req, res)=>{
    let {id} = req.params;
    let update = student.filter(students => students.id == id);
    res.status(200).send(...update);
})

//Query Parameters

app.get("/find", (req, res)=>{
    console.log(req.query);
    let {course} = req.query;
    let update = student.filter(students => students.course == course);
    res.status(200).send(update);
})

const port= 8090;
app.listen(port, ()=>{
    console.log(`Server is listening on port http://localhost:${port}`);
})