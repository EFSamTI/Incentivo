import { Not, Equal } from "typeorm";
import {
  IRegisterRequest,
} from "../interfaces/request";
import { ConfigRequest } from "../model/config-request";
import { findOrCreateAmbiente } from "./ambiente";
import { findOrCreateTipo } from "./tipo";





const createConfigRequest = async (
  config: IRegisterRequest,
  creatorid: number
) => {
  const ambiente = await findOrCreateAmbiente(config.ambiente);
  const tipoRequest = await findOrCreateTipo(config.tipo, config.url);
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

  const tipoRequest = await findOrCreateTipo(config.tipo, config.url);
  if (!tipoRequest) return { status: 404, message: "Tipo no encontrado" };

  const configRequest = await ConfigRequest.findOne({
    where: { id: config.id },
  });
  if (!configRequest) return { status: 404, message: "Configuracion no encontrada" };
  
  if (config.id){
    const activeConfigOfSameType = await ConfigRequest.findOne({
      where: { tipoRequest: tipoRequest, state: true, id: Not(Equal(config.id)) },
    });
    if (activeConfigOfSameType) {
      configRequest.state = false;
    }
  }
 

  tipoRequest.url = config.url;
  tipoRequest.updateAt = new Date();
  await tipoRequest.save();

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

const activarConfigRequest = async (id: number) => {
  const configRequestToActivate = await ConfigRequest.findOne({ where: { id: id } });
  if (!configRequestToActivate) return { status: 404, message: "Configuración no encontrada" };
  await ConfigRequest.update({ tipoid: configRequestToActivate.tipoid, id: Not(Equal(id)) }, { state: false, updateAt: new Date() });
  configRequestToActivate.state = true;
  configRequestToActivate.updateAt = new Date();
  await configRequestToActivate.save();
  return { status: 200, message: "Configuración activada con éxito" };
}


const listConfigRequest = async () => {
  const configRequest = await ConfigRequest.find({
    relations: ["ambiente", "tipoRequest"],
  });
  if (!configRequest) return { status: 404, message: "Configuracion no encontrada" };
  return { status: 200, data: configRequest };
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

export { createConfigRequest, updateConfigRequest, desactivarConfigRequest, listConfigRequest, activarConfigRequest, eliminarConfigRequests};
