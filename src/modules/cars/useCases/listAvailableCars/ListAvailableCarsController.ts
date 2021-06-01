import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCarsUseCase } from './ListAvailableCarsUseCase'

class ListAvailableCarsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, brand, category_id } = req.query

        const listCarsUseCase = container.resolve(ListCarsUseCase)

        const cars = await listCarsUseCase.execute({
            category_id: category_id as string,
            name: name as string,
            brand: brand as string 
        })

        return res.json(cars)
    }
}

export { ListAvailableCarsController }