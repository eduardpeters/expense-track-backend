import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import registerRoute from "./routes/register";
import loginRoute from "./routes/login";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
const dbURI = process.env.MONGO_URI;

app.use(express.json());

app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Express + Typescript Server is running!");
});

mongoose.connect(dbURI)
    .then((res) => {
        app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
    })
    .catch(error => console.log(error));