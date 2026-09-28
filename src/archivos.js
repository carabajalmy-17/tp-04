const fs = require('node:fs/promises');

async function leerJSON(rutaArchivo) {
    const contenido = await fs.readFile(rutaArchivo, 'utf8');
    const datos = JSON.parse(contenido);
    return datos;
}

module.exports = {
    leerJSON
};