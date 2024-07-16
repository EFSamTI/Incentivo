import { Asignacion } from "../../asinament/models/asignacion";



const listTotalesIsentivos = async () => {
    let query = `SELECT * FROM vista_estadisticas_isentivos`;
    const totales = await Asignacion.query(query);
    if (totales.length === 0) {
        return {
            status: 404,
            message: "No se encontraron totales en la base de datos",
        };
    }
    return { status: 200, data: totales };
}

const listMovimientos = async () => {
    let query = `SELECT * FROM vista_movimientos_ultima_semana`;
    const movimientos = await Asignacion.query(query);
    if (movimientos.length === 0) {
        return {
            status: 404,
            message: "No se encontraron movimientos en la base de datos",
        };
    }
    return { status: 200, data: movimientos };
}


export { listTotalesIsentivos, listMovimientos };
