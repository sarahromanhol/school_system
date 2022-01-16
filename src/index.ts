import app from "./app";

app.use("/estudante", studentRouter);
app.use("/turma", classRouter);
app.use("/docente", teacherRouter);