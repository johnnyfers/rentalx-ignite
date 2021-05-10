import { Router } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (req, res) => {
    const { name, description } = req.body;

    const existing = categoriesRepository.findByName(name)
    if(existing) return res.status(400).send('category already exists')

    categoriesRepository.create({name, description});
    
    return res.status(201).json()
});

categoriesRoutes.get('/', (req, res) => {
    const all = categoriesRepository.list();

    return res.status(200).json(all)
})

export { categoriesRoutes }