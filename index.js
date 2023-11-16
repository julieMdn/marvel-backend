const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());

// Get a list of comics
app.get("/comics", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      return res.status(400).json({ error: "API key is required." });
    }

    const url = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}`;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la requête vers l'API de comics:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la requête vers l'API de comics." });
  }
});

// Get a list of characters
app.get("/characters", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      return res.status(400).json({ error: "API key is required." });
    }

    const url = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}`;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error(
      "Erreur lors de la requête vers l'API de personnages:",
      error
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la requête vers l'API de personnages." });
  }
});

app.listen(3000, () => {
  console.log("Server has started");
});
