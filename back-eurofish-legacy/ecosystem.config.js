
// Variables de entorno para entorno de desarrollo
module.exports = {
    apps : [{
        name: 'backend-legacy-incentivos',
        script: './build/index.js',
        watch: true,
        env: {
            PORT: 6506,
            URL: '192.168.100.65',
            HOST: 'localhost',
            PORT_DB: 5432,
            USER : 'postgres',
            PASSWORD_BD: '1234',
            DATABASE: 'postgres',
        },
    }],
};
