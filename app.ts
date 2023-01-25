import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import registerRoute from "./routes/register";
import loginRoute from "./routes/login";
import usersRoute from "./routes/users";
import budgetsRoute from "./routes/budgets";
import entriesRoute from "./routes/entries";
import verifyJWT from "./middleware/verifyJWT";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
const dbURI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/users", verifyJWT, usersRoute);
app.use("/budgets", verifyJWT, budgetsRoute);
app.use("/entries", verifyJWT, entriesRoute);

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Express + Typescript Server is running!");
});

mongoose.connect(dbURI)
    .then((res) => {
        app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
    })
    .catch(error => console.log(error));