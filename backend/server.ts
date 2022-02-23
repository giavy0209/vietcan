import http from 'http'
import express from 'express'
import { Server } from "socket.io";

import cors from 'cors'
import './config'
import './helpers/connectDB'
import {API as APIRoutes} from './routers'
import {SSR as SSRRoutes} from './routers'

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())

const API = express.Router()
app.use('/api', API)

const SSR = express.Router()
app.use('/', SSR)

APIRoutes.forEach(_apiRoutes => {
    _apiRoutes(API)
})

SSRRoutes.forEach(_ssrRoutes => {
    _ssrRoutes(SSR)
})


const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

server.listen(global.Config.PORT)