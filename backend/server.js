const express = require("express");
const cors = require("cors");
const path = require("path");
const districtRoute = require("./routes/district");

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/district", districtRoute);

// health check
app.get("/", (req, res) => res.send("✅ MGNREGA Backend is running!"));

// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
