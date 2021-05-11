import { Router } from 'express';
import { SpecificationRepository } from '../modules/cars/repositories/implementations/SpecificationRepository';
import { createSpecificationController } from '../modules/cars/useCases/createSpecification';

const  specificationsRoutes = Router();

const specificationRepository = new SpecificationRepository()

specificationsRoutes.post('/', (req, res) => {
    return createSpecificationController.handle(req,res);
});

export { specificationsRoutes }