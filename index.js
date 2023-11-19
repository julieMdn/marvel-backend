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
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    const title = req.query.title || "";

    if (!apiKey) {
      return res.status(400).json({ error: "API key is required." });
    }

    const url = `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}&limit=${limit}&skip=${skip}&title=${title}`;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la requête vers l'API de comics:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la requête vers l'API de comics." });
  }
});

//Get all informations of specific comic
app.get("/comic/:comicId", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const comicId = req.params.comicId;

    if (!apiKey) {
      return res.status(400).json({ error: "API key is required." });
    }

    const url = `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${apiKey}`;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error("Erreur lors de la requête vers l'API du comic:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la requête vers l'API du comic." });
  }
});

// Get a list of characters
app.get("/characters", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    const name = req.query.name || "";

    if (!apiKey) {
      return res.status(400).json({ error: "API key is required." });
    }

    const url = `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apiKey}&limit=${limit}&skip=${skip}&name=${name}`;

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

// Get a list of comics containing a specific character
app.get("/comics/:characterId", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const characterId = req.params.characterId;

    if (!apiKey) {
      return res.status(400).json({ error: "API key is required." });
    }

    const url = `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apiKey}`;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error(
      "Erreur lors de la requête vers l'API des comics par personnage:",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la requête vers l'API des comics par personnage.",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
