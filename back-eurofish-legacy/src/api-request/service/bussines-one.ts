import { upFetch } from "../middleware/requests";
import { ConfigRequest } from "../model/config-request";
import { get } from 'http';



const findConfigRequestBussinesOneDetalleOF = async () => {
    const data  = await ConfigRequest.findOne({
      where: { state: true, tipoRequest: { nombre_tipo: "BUSSINES-ONE-DETALLE-OF" } } 
      ,relations: ["tipoRequest"],
    });
    if (!data) return null;
    return data;
};

const findConfigRequestBussinesOnecConsumos = async () => {
    const data  = await ConfigRequest.findOne({
        where: { state: true, tipoRequest: { nombre_tipo: "BUSSINES-ONE-INVENTORY-EXITS" } } 
        ,relations: ["tipoRequest"],
    });
    if (!data) return null;
    return data;
}


const fetchData = async (findConfigRequest: () => Promise<any>) => {
    const confRequest = await findConfigRequest();
    console.log(confRequest);
    if (!confRequest) return { status: 404, message: "No se encontraron los parametros" };

    const response = await upFetch(confRequest);
    if (response.status !== 200) return { status: response.status, message: response.message };

    return { status: 200, data: response };
};

const getDetalleOrdenFabricacion = async () => {
    return fetchData(findConfigRequestBussinesOneDetalleOF);
};

const getInventoryExits = async () => {
    return fetchData(findConfigRequestBussinesOnecConsumos);
};
export { getDetalleOrdenFabricacion, getInventoryExits };