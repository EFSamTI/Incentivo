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

-- vista movimientos en la ultima sema
CREATE VIEW vista_movimientos_ultima_semana AS
 SELECT to_char(dia.dia_semana, 'YYYY-MM-DD'::text) AS fecha,
    COALESCE(count(m.movimientoid), (0)::bigint) AS total_movimientos
   FROM (( SELECT generate_series(date_trunc('day'::text, (CURRENT_DATE - '6 days'::interval)), (CURRENT_DATE)::timestamp without time zone, '1 day'::interval) AS dia_semana) dia
     LEFT JOIN ( SELECT isentive_tmovimientos.movimientoid,
            date_trunc('day'::text, isentive_tmovimientos.created_at) AS fecha
           FROM isentive_tmovimientos
          WHERE (isentive_tmovimientos.created_at >= (CURRENT_DATE - '6 days'::interval))) m ON ((dia.dia_semana = m.fecha)))
  GROUP BY (to_char(dia.dia_semana, 'YYYY-MM-DD'::text))
  ORDER BY (min(dia.dia_semana));
  
-- Vista totales 
CREATE VIEW vista_estadisticas_isentivos AS
WITH 
total_asignaciones AS (
    SELECT
        tipo.descripcion AS tipo_asignacion,
        COUNT(*) AS total
    FROM
        public.isentive_tasignacion_tipo_asignacion tta
        INNER JOIN public.isentive_tasignaciones asignacion ON tta.asignacionid = asignacion.asignacionid
        INNER JOIN public.isentive_ttipo_asignacion tipo ON tta.tipoid = tipo.tipoid
    WHERE
        asignacion.created_at >= current_date - interval '1 month'
    GROUP BY
        tipo.descripcion
),
total_movimientos AS (
    SELECT
        COUNT(*) AS total
    FROM
        public.isentive_tmovimientos
    WHERE
        created_at >= current_date - interval '1 day' 
),

total_paradas_ultima_semana AS (
    SELECT
        COUNT(*) AS total
    FROM
        public.isentive_tparada
    WHERE
        hora_inicio >= current_date - interval '7 days'
),

total_paradas_en_general AS (
    SELECT
        COUNT(*) AS total
    FROM
        public.isentive_tparada
),

total_tiempo_inactividad AS (
    SELECT
        SUM(EXTRACT(epoch FROM (hora_fin - hora_inicio)) / 3600.0) AS total_horas
    FROM
        public.isentive_tparada
    WHERE
        hora_inicio >= current_date - interval '1 month' 
),

total_tiempo_inactividad_en_general AS (
    SELECT
        SUM(EXTRACT(epoch FROM (hora_fin - hora_inicio)) / 3600.0) AS total_horas
    FROM
        public.isentive_tparada
)

SELECT
    (SELECT total FROM total_asignaciones WHERE tipo_asignacion = 'NORMAL') AS total_asignaciones_normal,
    (SELECT total FROM total_asignaciones WHERE tipo_asignacion = 'COMODIN') AS total_asignaciones_comodin,
    total_movimientos.total AS total_movimientos_ultimo_dia,
    total_movimientos.total AS total_movimientos_en_general,
    total_paradas_ultima_semana.total AS total_paradas_ultima_semana,
    total_paradas_en_general.total AS total_paradas_en_general,
    total_tiempo_inactividad.total_horas AS total_tiempo_inactividad_mes,
    total_tiempo_inactividad_en_general.total_horas AS total_tiempo_inactividad_en_general
FROM
    total_movimientos,
    total_paradas_ultima_semana,
    total_paradas_en_general,
    total_tiempo_inactividad,
    total_tiempo_inactividad_en_general;
