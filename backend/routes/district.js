const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// location of local JSON data
const sampleFile = path.join(__dirname, "../db/sample_snapshots.json");

// helper to read JSON
function loadSample() {
  try {
    const data = fs.readFileSync(sampleFile, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("❌ Error reading sample_snapshots.json:", err);
    return {};
  }
}

// GET /api/district/:district
router.get("/:district", (req, res) => {
  const district = req.params.district.toLowerCase();
  const data = loadSample();

  if (data[district]) {
    return res.json(data[district]);
  } else {
    return res.status(404).json({ error: "District data not found" });
  }
});

module.exports = router;
