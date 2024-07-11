-- Creación de la vista para la primera consulta
CREATE VIEW vista_asignaciones_detalle AS
SELECT a.asignacionid,
       a.created_at,
       a.update_at,
       ta.descripcion AS tipo_asignacion,
       l.nombrelinea,
       t.nombre_turno,
       e.nombre AS nombre_empleado,
       e.ci AS cedula,
       c.cargoname,
       ar.nombre_area
FROM (((((((isentive_tasignaciones a
JOIN isentive_tlineas l ON (a.lineaid = l.lineaid))
JOIN isentive_tturnos t ON (a.turnoid = t.turnoid))
JOIN isentive_templeados e ON (a.empleadoid = e.empleadoid))
JOIN isentive_tcargos c ON (a.cargoid = c.cargoid))
JOIN isentive_tareas ar ON (a.areaid = ar.areaid))
JOIN isentive_tasignacion_tipo_asignacion ata ON (a.asignacionid = ata.asignacionid))
JOIN isentive_ttipo_asignacion ta ON (ata.tipoid = ta.tipoid))
WHERE (ta.descripcion::text = ANY (ARRAY['NORMAL'::character varying, 'CAMBIO'::character varying, 'COMODIN'::character varying]::text[])) AND (a.estado = true);

-- Creación de la vista para la segunda consulta
CREATE VIEW vista_movimientos_detalle AS
SELECT m.movimientoid,
       m.created_at,
       l.nombrelinea,
       t.nombre_turno,
       e.nombre AS empleado_nombre,
       e.ci,
       co.cargoname AS cargo_original,
       area_o.nombre_area AS area_original,
       cc.cargoname AS cargo_cambio,
       area_c.nombre_area AS area_cambio
FROM (((((((((isentive_tmovimientos m
JOIN isentive_tasignaciones ao ON (m.asignacion_original = ao.asignacionid))
JOIN isentive_tasignaciones ac ON (m.asignacion_cambio = ac.asignacionid))
JOIN isentive_templeados e ON (ao.empleadoid = e.empleadoid))
JOIN isentive_tlineas l ON (ao.lineaid = l.lineaid))
JOIN isentive_tturnos t ON (ao.turnoid = t.turnoid))
JOIN isentive_tcargos co ON (ao.cargoid = co.cargoid))
JOIN isentive_tareas area_o ON (ao.areaid = area_o.areaid))
JOIN isentive_tcargos cc ON (ac.cargoid = cc.cargoid))
JOIN isentive_tareas area_c ON (ac.areaid = area_c.areaid))
WHERE (1 = 1);

-- Creación de la vista para la tercera consulta
CREATE VIEW vista_movimientos_empleados_detalle AS
SELECT DISTINCT ON (e.empleadoid) m.movimientoid,
       e.empleadoid,
       e.nombre AS empleado_nombre,
       e.ci,
       t.nombre_turno,
       l.nombrelinea,
       ao.asignacionid AS id_original,
       co.cargoname AS cargo_original,
       ao2.nombre_area AS area_original,
       ac.asignacionid AS id_cambio,
       cc.cargoname AS cargo_cambio,
       ac2.nombre_area AS area_cambio,
       m.created_at
FROM (((((((((isentive_tmovimientos m
JOIN isentive_tasignaciones ao ON (m.asignacion_original = ao.asignacionid))
JOIN isentive_tasignaciones ac ON (m.asignacion_cambio = ac.asignacionid))
JOIN isentive_templeados e ON (ao.empleadoid = e.empleadoid))
JOIN isentive_tlineas l ON (ao.lineaid = l.lineaid))
JOIN isentive_tturnos t ON (ao.turnoid = t.turnoid))
JOIN isentive_tcargos co ON (ao.cargoid = co.cargoid))
JOIN isentive_tareas ao2 ON (ao.areaid = ao2.areaid))
JOIN isentive_tcargos cc ON (ac.cargoid = cc.cargoid))
JOIN isentive_tareas ac2 ON (ac.areaid = ac2.areaid))
WHERE (1 = 1);