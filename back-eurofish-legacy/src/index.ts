import { parse } from 'path';
import app from './app';
import { AppDataSource } from './config/postgres';
import dotenv from "dotenv";
dotenv.config();
async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Base de datos conectada");
        const HOST = process.env.URL || 'localhost';
        const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 6505;
        const server = app.listen(PORT, HOST, () => {
            const address = server.address();
            const port = typeof address === 'string' ? address : address?.port;
            console.log(`Server activo en el puerto ${port} y en la dirección ${HOST}`);
        });
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
}

main();