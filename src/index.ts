import app from "./app";
import { studentRouter } from "./routes/StudentRouter";

app.use("/estudante", studentRouter);