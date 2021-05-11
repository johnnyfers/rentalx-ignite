import { Specification } from "../models/Specification";
import { ICreateSpecificationDTO, ICreateSpecificationRepository } from "./ISpecificationRepository";

class SpecificationRepository implements ICreateSpecificationRepository{

    private specifications: Specification[];

    constructor(){
        this.specifications = []
    };

    create({name, description}: ICreateSpecificationDTO): void{
        const specification = new Specification()

        Object.assign(specification, 
            {
                name, 
                description,
                created_at: new Date(),
            }
        );

        this.specifications.push(specification)
    };
};

export { SpecificationRepository };