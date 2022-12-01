const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require("cors")
const app = express();
const port = 9000;
const { uuid } = require("uuidv4");
const fs = require("fs");
const { check, validationResult } = require("express-validator");

// setup middleware
app.use(bodyParser.json());
app.use(cors());

// data is located outside of api folder
// to prevent automated server restart issued by nodemon
let filepath = "../data/db.json";

//
var _dishes = [];

function loadFromFile() {
    try {
        _dishes = JSON.parse(fs.readFileSync(filepath));
    } catch (err) {
        console.log(`file not found at ${filepath}`);
    }
}

function saveToFile() {
    const jsonContent = JSON.stringify(_dishes);
    fs.writeFileSync(filepath, jsonContent, "utf8", function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(`data saved to ${filepath}`);
    });
}

// get dishes
router.get('/dishes', (req, res) => {
    loadFromFile();

    res.json({
        status: "OK",
        data: _dishes
    });
});

// clear dishes
router.get('/dishes/clear', (req, res) => {
    _dishes = [];

    saveToFile();
    
    res.json({
        status: "OK"
    });
});

// get dish by id
router.get('/dishes/:_id', (req, res) => {
    const dish = _dishes.find(x => x._id === req.params._id);

    res.json({
        status: "OK",
        data: dish ? dish : null
    });
});

// insert/update dish
router.put('/dishes', [
    check('active').isBoolean(), // non-strict validation will also accept "true"/"false" and 0/1
    check('waitTime').isNumeric()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    if (req.body == null) {
        res.json({
            status: "Failed",
            message: "No content provided"
        });
    }
    else {
        let dish = req.body,
            status = "OK";
        
        if (!dish._id) {
            //
            dish._id = uuid();
            dish._Created = new Date();
            dish._Changed = null;

            //
            _dishes.push(dish);
        }
        else {
            //
            const dishIndex = _dishes.findIndex(x => x._id === dish._id);

            //
            if (dishIndex >= 0) {
                //
                dish._Changed = new Date();

                //
                _dishes[dishIndex] = dish;
            }
            else {
                //
                status = `dish not found for _id ${dish._id}`;
            }
        }

        saveToFile();

        res.json({
            status: status,
            data: dish
        });
    }
});

// delete dish
router.delete('/dishes/:_id', (req, res) => {
    let dishIndex = _dishes.findIndex(x => x._id === req.params._id);

    if (dishIndex !== -1) {
        _dishes.splice(dishIndex, 1);

        saveToFile();
    }

    res.json({
        status: "OK",
        message: dishIndex !== -1 ? "Dish deleted" : "Dish not found"
    });
});


//
app.use(router);

//
app.listen(port, () => {
    console.log(`api is ready on http://localhost:${port}`)
});