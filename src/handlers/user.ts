import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'
import verifyToken, {RequestCustom} from '../middleware/auth'

const store = new UserStore()

const create = async (_req: Request, res: Response) => {
    try {
        const user: User = {
            username: _req.body.username,
            firstname: _req.body.firstname,
            lastname: _req.body.lastname,
            password: _req.body.password
        }

        const newUser = await store.create(user)

        var token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET!)

        res.json({'token': token})
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
  }
  
const show = async (req: Request, res: Response) => {
    const customReq = req as RequestCustom
    const user = await store.show(req.params.id)
    res.json(user)
  }

const authenticate = async (_req: Request, res: Response) => {
    try {
        const user: User = {
            username: _req.body.username,
            password: _req.body.password
        }

        const authUser = await store.authenticate(user.username, user.password)
        var token = jwt.sign({user: authUser}, process.env.TOKEN_SECRET!)
        res.json({'token': token})
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const userRoutes = (app:express.Application) => {
    app.post('/users', create)
    app.get('/users', verifyToken, index )
    app.get('/users/:id', verifyToken, show )
    app.post('/authenticate', authenticate)
}

export default userRoutes