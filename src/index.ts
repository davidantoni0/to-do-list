import express from "express";
import { Application } from "express";
import { userRoutes } from "./routes/UserRoutes";
import { AppDataSource } from "./data-source";


const api: Application = express();

api.use(express.json());
api.use("/api/users", userRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado!");
    api.listen(process.env.PORT, () => {
      console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
    });
  }).catch((error) => console.log("Erro ao conectar no banco: ", error));