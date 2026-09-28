const express = require('express');
const path = require('node:path');
const expressLayouts = require('express-ejs-layouts');
const { leerJSON } = require('./archivos');

const PORT = 3000;

async function main() {
    try {
        const rutaArchivo = path.join(__dirname, '..', 'datos', 'mascotas.json');

        const mascotas = await leerJSON(rutaArchivo);

        const app = express();

        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, '..', 'views'));

        app.use(expressLayouts);
        app.set('layout', 'layouts/main');

        app.use(express.static(path.join(__dirname, '..', 'public')));
        app.use(express.urlencoded({ extended: false }));

        app.get('/', (req, res) => {
            res.status(200).render('inicio', {
                titulo: 'Inicio'
            });
        });

        app.get('/mascotas', (req, res) => {
            res.status(200).render('mascotas/lista', {
                titulo: 'Mascotas',
                mascotas: mascotas
            });
        });
        app.get('/mascotas/nueva', (req, res) => {
            res.status(200).render('mascotas/nueva', {
                titulo: 'Nueva mascota',
                error: null,
                datos: {}
            });
        });

        app.post('/mascotas', (req, res) => {
            const { nombre, especie, edad, estado, descripcion } = req.body;

            const edadNumero = Number(edad);

            if (
                !nombre ||
                !especie ||
                edad === '' ||
                !estado ||
                !descripcion ||
                !Number.isFinite(edadNumero) ||
                edadNumero < 0
            ) {
                return res.status(400).render('mascotas/nueva', {
                    titulo: 'Nueva mascota',
                    error: 'Todos los campos son obligatorios y la edad debe ser válida.',
                    datos: req.body
                });
            }

            const nuevoId = mascotas.length > 0
                ? mascotas[mascotas.length - 1].id + 1
                : 1;

            const nuevaMascota = {
                id: nuevoId,
                nombre,
                especie,
                edad: edadNumero,
                descripcion,
                estado,
                imagen: '/img/mascota.svg'
            };

            mascotas.push(nuevaMascota);

            res.redirect('/mascotas');
        });

        app.get('/mascotas/:id', (req, res) => {
            const id = Number(req.params.id);

            const mascota = mascotas.find(mascota => mascota.id === id);

            if (!mascota) {
                return res.status(404).render('no-encontrado', {
                    titulo: 'Mascota no encontrada'
                });
            }

            res.status(200).render('mascotas/detalle', {
                titulo: mascota.nombre,
                mascota: mascota
            });
        });
        app.listen(PORT, () => {
            console.log(`Servidor disponible en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Error al iniciar la aplicación:', error.message);
    }
}

main();