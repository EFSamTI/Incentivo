-- Inserta un usuario administrador en la tabla "users"
INSERT INTO "public"."users" ("username", "name", "password", "state", "registeredByUserId", "createdAt", "updatedAt", "foto") VALUES
('admin', 'Administrador', '$2a$08$EgTg/XCYIeyBZ9EJSg2HvO0dtj5KmfoKiYW7PuSfQoede.SEDzl0O', 't', NULL, CURRENT_TIMESTAMP, NULL, NULL);

-- Inserta las opciones disponibles hasta el momento en la tabla "options"
INSERT INTO "public"."options" ("optionName", "description", "path", "createdAt", "createdByUserId", "updatedAt") VALUES 
('Mantenimiento roles', 'Periete el acceso a la gestion de roles', '/admin-roles', CURRENT_TIMESTAMP, 1, NULL), 
('Mantenimiento usuarios', 'Permite al usuario crear otros usuarios', '/admin-users', CURRENT_TIMESTAMP, 1, NULL), 
('Asignación ', 'Asigna de acuerdo a la informacion obtenida de ARIEL.', '/asignacion', CURRENT_TIMESTAMP, 1, NULL), 
('Parada', 'Se ingresarán las paradas del usuario ', '/parada', CURRENT_TIMESTAMP, 1, NULL), 
('Quiebres', 'En esta opción se obtendrá la información de TALI', '/quiebre', CURRENT_TIMESTAMP, 1, NULL), 
('Rotación personal', 'Esta opcion podra cambiar de area o cargo a el personal asignado', '/movimiento', CURRENT_TIMESTAMP, 1, NULL), 
('Configuración de peticiones', 'Mantenimiento de peticiones', '/config-request', CURRENT_TIMESTAMP, 1, NULL);

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
(2, 7);

-- Asocia usuarios con roles en la tabla "user_roles"
INSERT INTO "public"."user_roles" ("userId", "roleId") VALUES 
(1, 2), 
(1, 1);
