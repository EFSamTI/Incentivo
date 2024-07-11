import { Not, Equal } from "typeorm";
import { AppDataSource } from "../../config/postgres";
import {
  IBodyRequest,
  IRegisterRequest,
  IRequestAriel,
} from "../interfaces/request";
import { ConfigRequest } from "../model/config-request";
import { ConfigTipo } from "../model/tipo";
import { findOrCreateAmbiente } from "./ambiente";
import { findOrCreateTipo } from "./tipo";

const requestAriel = async (body: IBodyRequest) => {
  const peticion: IRequestAriel | null = await obtenerParametros(body);
  if (!peticion) return null;
  return peticion;
};



const obtenerParametros = async (
  body: IBodyRequest
): Promise<IRequestAriel | null> => {
  const data = await ConfigRequest.findOne({
    where: { state: true, tipoRequest: { nombre_tipo: "Ariel" } },
  
  });
  if (!data) return null;
  const requestAriel: IRequestAriel = {
    source: data.source,
    destination: data.destination,
    operation: data.operation,
    verb: data.verb,
    path: data.path,
    body: body,
  };

  return requestAriel;
};


const createConfigRequest = async (
  config: IRegisterRequest,
  creatorid: number
) => {
  const ambiente = await findOrCreateAmbiente(config.ambiente);
  const tipoRequest = await findOrCreateTipo(config.tipo);
  ConfigRequest.create({
    source: config.source,
    destination: config.destination,
    operation: config.operation,
    verb: config.verb,
    path: config.path,
    state: false,
    ambiente: ambiente,
    tipoRequest: tipoRequest,
    registeredByUserId: creatorid,
  }).save();
  return { status: 200, message: "Configuracion creada con exito"};
};

const updateConfigRequest = async (
  config: IRegisterRequest
) => {
  const ambiente = await findOrCreateAmbiente(config.ambiente);
  
  if (!ambiente) return { status: 404, message: "Ambiente no encontrado" };

  const tipoRequest = await findOrCreateTipo(config.tipo);
  if (!tipoRequest) return { status: 404, message: "Tipo no encontrado" };
  const configRequest = await ConfigRequest.findOne({
    where: { id: config.id },
  });
  if (!configRequest) return { status: 404, message: "Configuracion no encontrada" };
  configRequest.source = config.source;
  configRequest.destination = config.destination;
  configRequest.operation = config.operation;
  configRequest.verb = config.verb;
  configRequest.path = config.path;
  configRequest.ambiente = ambiente;
  configRequest.tipoRequest = tipoRequest;
  configRequest.updateAt = new Date();
  await configRequest.save();
  return { status: 200, message: "Configuracion actualizada con exito" };
}


const desactivarConfigRequest = async (id: number) => {
  const configRequest = await ConfigRequest.findOne({
    where: { id: id },
  });
  if (!configRequest) return { status: 404, message: "Configuracion no encontrada" };
  configRequest.state = false;
  configRequest.updateAt = new Date();
  await configRequest.save();
  return { status: 200, message: "Configuracion eliminada con exito" };
}

const listConfigRequest = async () => {
  const configRequest = await ConfigRequest.find({
    relations: ["ambiente", "tipoRequest"],
  });
  if (!configRequest) return { status: 404, message: "Configuracion no encontrada" };
  return { status: 200, data: configRequest };
}

const activarConfigRequest = async (id: number) => {
  const configRequestToActivate = await ConfigRequest.findOne({ where: { id: id } });
  if (!configRequestToActivate) return { status: 404, message: "Configuración no encontrada" };
  await ConfigRequest.update({ tipoid: configRequestToActivate.tipoid, id: Not(Equal(id)) }, { state: false, updateAt: new Date() });
  configRequestToActivate.state = true;
  configRequestToActivate.updateAt = new Date();
  await configRequestToActivate.save();
  return { status: 200, message: "Configuración activada con éxito" };
}

const eliminarConfigRequests = async ( id: number[]) => {
  for (const i of id) {
    const configRequest = await ConfigRequest.findOne({ where: { id: i } });
    if (configRequest){
      await configRequest.remove();
    }
  }
  return { status: 200, message: "Configuraciones eliminadas con éxito" };
}

export { requestAriel, createConfigRequest, updateConfigRequest, desactivarConfigRequest, listConfigRequest, activarConfigRequest, eliminarConfigRequests};
