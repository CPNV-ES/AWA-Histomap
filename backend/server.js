/*!
 * Nom du fichier : server.js
 * Auteur : VicMtn
 * Date : 16.12.2024
 * Description : Ce script est le point d'entrée de l'api backend
 * Licence : MIT
 * Version : 1.0.0
 */

import express from 'express'
import cors from 'cors'

import routes from './src/routes.js'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function LogTransaction(req, res) {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url} ${res}`)
}

routes.forEach((route) => {
  app[route.method](route.route, async (req, res) => {
    LogTransaction(req, res.statusCode)
    await route.component(req, res)
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
