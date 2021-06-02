import { container } from "tsyringe"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"
import { Request, Response } from 'express'

class CreateCarSpecificationController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const { specifications_id } = req.body

        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase)
    
        const car = await createCarSpecificationUseCase.execute({ car_id: id, specifications_id})
   
        return res.send(car)
    }
}

export { CreateCarSpecificationController }