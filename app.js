// jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set("view engine", "ejs");

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.static("public"));

app.get("/", function (req, res) {

    let day = date.getDate();

    res.render("lists", {
        listTitle: day,
        newListItems: items,
    });
});

app.post("/", function (req, res) {
    if (req.body.list === "Work") {
        workItems.push(req.body.newItem);
        res.redirect("/work");
    } else {
        items.push(req.body.newItem);
        res.redirect("/");
    }
});

app.get("/work", function (req, res) {
    res.render("lists", {
        listTitle: "Work list",
        newListItems: workItems
    });
});

app.post("/work", function (req, res) {
    workItems.push(req.body.newItem);
    res.redirect("/work");
});

app.listen(3000, () => console.log("App listening on port 3000!"));