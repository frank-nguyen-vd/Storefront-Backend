import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';

dotenv.config()

const {BCRYPT_PASSWORD, SALT_ROUNDS} = process.env

export type User = {
    id?: number;
    username: string;
    firstname?: string;
    lastname?: string;
    password: string;
    password_digest?:string;
}

export class UserStore{

    async create(u: User): Promise<{"id":number, "username": string, "firstname":string, 'lastname':string}> {
        try {
      const sql = 'INSERT INTO users (username, firstname, lastname, password_digest) VALUES($1, $2, $3, $4) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()

        const hash = bcrypt.hashSync(
            u.password + BCRYPT_PASSWORD!,
            parseInt(SALT_ROUNDS!)
        )
  
      const result = await conn
          .query(sql, [u.username, u.firstname, u.lastname, hash])
  
      const newUser = result.rows[0]
      
      conn.release()
  
      return {'id': newUser.id, "username": newUser.username, "firstname":newUser.firstname, 'lastname':newUser.lastname }
        } catch (err) {
            throw new Error(`Could not add new user ${u.username}. Error: ${err}`)
        }
    }

    async index(): Promise<{"id":number, "username": string, "firstname":string, 'lastname':string}[]> {
        try {
          // @ts-ignore
          const conn = await Client.connect()
          const sql = 'SELECT * FROM users'
      
          const result = await conn.query(sql)
      
          conn.release()
      
          let arr:{"id":number, "username": string, "firstname":string, 'lastname':string}[] = []
          result.rows.forEach((element: User) => {
            arr.push({'id': element.id ?? 0, 'username': element.username, 'firstname':element.firstname ?? '', 'lastname':element.lastname ?? ''})
          })

          return arr
        } catch (err) {
          throw new Error(`Could not get users. Error: ${err}`)
        }
      }
    
      async show(id: string): Promise<{"id":number, "username": string, "firstname":string, 'lastname':string}> {
        try {
        const sql = 'SELECT * FROM users WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return {'id': result.rows[0].id, "username": result.rows[0].username, "firstname":result.rows[0].firstname, 'lastname':result.rows[0].lastname }
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
      }
    

    async authenticate(username: string, password: string): Promise<User|null> {
        try {
      const sql = 'SELECT * FROM users WHERE username = ($1)'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [username])

      conn.release()

      if( result.rows.length){
        const user = result.rows[0]
        // console.log(user)

        if(bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password_digest)){
            return user
        }
      }
      
      return null
        } catch (err) {
            throw new Error(`Could not authenticate user ${username}. Error: ${err}`)
        }
    }

}