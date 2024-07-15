import app from './app';
import { AppDataSource } from './config/postgres';

async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Base de datos conectada");
        const server = app.listen(6505, () => {
            const address = server.address();
            const port = typeof address === 'string' ? address : address?.port;
            console.log(`Server activo en el puerto ${port}`);
        });
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
    }

}

main();