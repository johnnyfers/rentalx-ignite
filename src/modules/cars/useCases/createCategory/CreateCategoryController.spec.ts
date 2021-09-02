import { hash } from 'bcrypt'
import request from 'supertest'
import { Connection } from 'typeorm'
import {v4 as uuidV4} from 'uuid'

import { app } from '../../../../shared/infra/http/app'

import createConnection from '../../../../shared/infra/typeorm/index'

let connection: Connection

describe('create category controller', () => {
    
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

    it('should be able to create a new category', async () => {
        const resToken = await request(app).post('/sessions')
        .send({
            email: 'admin@rentalx.com',
            password: 'admin'
        })

        const response = await request(app)
            .post('/categories')
            .send({
                "name": "category supertest",
                "description": "super test"
            })
            .set({
                Authorization: `Bearer ${resToken.body.token}`
            })

        expect(response.status).toBe(201)
    })

    it('should be able to create a new category with an existing name', async () => {
        const resToken2 = await request(app).post('/sessions')
        .send({
            email: 'admin@rentalx.com',
            password: 'admin'
        })

        const response2 = await request(app)
            .post('/categories')
            .send({
                "name": "category supertest",
                "description": "super test"
            })
            .set({
                Authorization: `Bearer ${resToken2.body.token}`
            })
            
        expect(response2.ok).toBe(false)
    })
})