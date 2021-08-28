import jwt from 'jsonwebtoken'
import express from 'express'

export interface RequestCustom extends express.Request
{
    decodeJwt: {user:{id: string, username: string}}
}

const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const customReq = req as RequestCustom
        const authorization = customReq.headers.authorization;
        const token = authorization?.split(' ')[1] || ''
        const decodeJwt = jwt.verify(token, process.env.TOKEN_SECRET!)
        customReq.decodeJwt = decodeJwt as {user:{id: string, username: string}}
        next()
    }
    catch(err){
        res.status(401).json('Invalid Token')
        return
    }
    
}

export default verifyToken