require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());

const SECRET_KEY = process.env.SECRET_KEY || "default_secret";

app.get("/generate-token", (req, res) => {
    const token = jwt.sign({ username: "user123" }, SECRET_KEY, { expiresIn: "5m" });
    const qr_url = `https://your-backend-url.com/auth?token=${token}`;
    res.json({ qr_url });
});

app.get("/auth", (req, res) => {
    const token = req.query.token;
    try {
        const user = jwt.verify(token, SECRET_KEY);
        res.send(`Welcome ${user.username}`);
    } catch (err) {
        res.status(401).send("Invalid QR Code");
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));