const express = require("express");
const app = express();
const fs = require("fs");

// Serve static JSON file with game configurations.
app.get("/config", (req, res) => {
  fs.readFile("game-config.json", { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.put("/config", (req, res) => {
  const { pollingFrequency, scoreRange, allowedClients } = req.body;
  const newConfig = { pollingFrequency, scoreRange, allowedClients };

  // Write new configuration to config.json
  fs.writeFile("game-config.json", JSON.stringify(newConfig, null, 2), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.send("Configuration updated successfully");
  });
});

// Start server.
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
