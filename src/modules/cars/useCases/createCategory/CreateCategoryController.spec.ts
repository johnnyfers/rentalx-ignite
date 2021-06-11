import request from 'supertest'

import { app } from '../../../../shared/infra/http/app'

describe('create category controller', async () => {

    it('should be able to create a new category', async () => {
        const response = await request(app)
            .post('/categories')
            .send({
                "name": "category supertest",
                "description": "super test"
            })
            
        expect(response.status).toBe(201)
    })
})