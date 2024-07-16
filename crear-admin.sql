-- Inserta un usuario administrador en la tabla "users"
INSERT INTO "public"."users" ("username", "name", "password", "state", "registeredByUserId", "createdAt", "updatedAt", "foto") VALUES
('admin', 'Administrador', '$2a$08$EgTg/XCYIeyBZ9EJSg2HvO0dtj5KmfoKiYW7PuSfQoede.SEDzl0O', 't', NULL, CURRENT_TIMESTAMP, NULL, NULL);

-- Inserta las opciones disponibles hasta el momento en la tabla "options"
INSERT INTO "public"."options" ("optionName", "description", "path", "createdAt", "createdByUserId", "updatedAt", "icon") VALUES 
('Mantenimiento roles', 'Permite el acceso a la gestión de roles', '/admin-roles', CURRENT_TIMESTAMP, 1, NULL, 'key'), 
('Mantenimiento usuarios', 'Permite al usuario crear otros usuarios', '/admin-users', CURRENT_TIMESTAMP, 1, NULL, 'user'), 
('Asignación', 'Asigna de acuerdo a la información obtenida de ARIEL.', '/asignacion', CURRENT_TIMESTAMP, 1, NULL, 'plus'), 
('Parada', 'Se ingresarán las paradas del usuario', '/parada', CURRENT_TIMESTAMP, 1, NULL, 'pause'), 
('Quiebres', 'En esta opción se obtendrá la información de TALI', '/quiebre', CURRENT_TIMESTAMP, 1, NULL, 'chart-line'), 
('Rotación personal', 'Esta opción podrá cambiar de área o cargo al personal asignado', '/movimiento', CURRENT_TIMESTAMP, 1, NULL, 'refresh'), 
('Configuración de peticiones', 'Mantenimiento de peticiones', '/config-request', CURRENT_TIMESTAMP, 1, NULL, 'cog'),
('Notificación Orden de Fabricación', 'Gestión de notificaciones para órdenes de fabricación', '/notificacion/orden-fabricacion', CURRENT_TIMESTAMP, 1, NULL, 'bell');

-- Inserta roles en la tabla "roles"
INSERT INTO "public"."roles" ("roleName", "description", "registeredByUserId", "createdAt", "updatedAt") VALUES 
('Usuario', 'Rol usuario tiene acceso a otra funciones ', 1, CURRENT_TIMESTAMP, NULL), 
('Administrador', 'Rol de administrador con acceso total', 1, CURRENT_TIMESTAMP, NULL);

-- Asocia roles con opciones en la tabla "role_options"
INSERT INTO "public"."role_options" ("roleId", "optionId") VALUES 
(1, 1), 
(1, 2), 
(2, 3), 
(2, 4), 
(2, 5), 
(2, 6), 
(2, 7),
(2, 8);


-- Asocia usuarios con roles en la tabla "user_roles"
INSERT INTO "public"."user_roles" ("userId", "roleId") VALUES 
(1, 2), 
(1, 1);
