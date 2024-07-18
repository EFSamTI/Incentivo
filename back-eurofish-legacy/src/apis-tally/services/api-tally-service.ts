import { ApisTally } from "../models/api-tally";


const listApiTally = async () => {
    const apiTally = await ApisTally.find();
    if (apiTally.length === 0) {
        return {
            status: 404,
            message: "No se encontraron apis tally en la base de datos",
        };
    }
    return { status: 200, data: apiTally };
}




export { listApiTally };