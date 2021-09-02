import { hash } from 'bcrypt'
import { response } from 'express'
import request from 'supertest'
import { Connection } from 'typeorm'
import {v4 as uuidV4} from 'uuid'

import { app } from '../../../../shared/infra/http/app'

import createConnection from '../../../../shared/infra/typeorm/index'

let connection: Connection


describe('list Categories', ()=> {
     
    beforeAll(async () => {
        connection = await createConnection()
        await connection.runMigrations()

        const id = uuidV4()
        const password = await hash('admin', 8)

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license, username)
            values('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'now()', '111dddd', 'rentalxUser' )`
        )
    })

    afterAll(async ()=>{
        await connection.dropDatabase()
        await connection.close()
    })

    it('should be able list all categories', async () => {
        const response  = await request(app).get('/categories')

        expect(response.status).toBe(200)

    })
})