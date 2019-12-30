// Import packages
const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");

// Aplicatia
const app = express();

// Middleware
// app.use(morgan("tiny"));
app.use(bodyParser.json());
// app.use(cors());

// Create
app.post("/dogs", (req, res) => {
  const dogsList = readJSONFile();
  // Completati cu codul vostru aici
});

// Read One
app.get("/dogs/:id", (req, res) => {
  const dogsList = readJSONFile();
  // Completati cu codul vostru aici
});

// Read All
app.get("/dogs", (req, res) => {
  const dogsList = readJSONFile();
  // Completati cu codul vostru aici
});

// Update
app.put("/dogs/:id", (req, res) => {
  const dogsList = readJSONFile();
  // Completati cu codul vostru aici
});

// Delete
app.delete("/dogs/:id", (req, res) => {
  const dogsList = readJSONFile();
  // Completati cu codul vostru aici
});

// Functia de citire din fisierul db.json
function readJSONFile() {
  return JSON.parse(fs.readFileSync("db.json"))["dogs"];
}

// Functia de scriere in fisierul db.json
function writeJSONFile(content) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ dogs: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// Pornim server-ul
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);
