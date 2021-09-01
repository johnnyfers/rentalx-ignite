import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {

    constructor(
        @inject('RentalsRepository')
        private rentalRepository: IRentalsRepository,

        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,

        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) { }

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalRepository.findById(id)
        const car = await this.carsRepository.findById(rental.car_id)

        const minimumDaily = 1
        let total = 0

        if (!rental) {
            throw new AppError('Rental dos not exists')
        }

        const dateNow = this.dateProvider.dateNow()

        let daily = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow())
        let delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date)

        if (daily <= 0) {
            daily = minimumDaily
        }

        if (daily > 0) {
            const calculate_fine = delay * car.fine_amount
            total = calculate_fine
        }

        total += daily * car.daily_rate

        rental.end_date = this.dateProvider.dateNow()
        rental.total = total

        await this.rentalRepository.create(rental)
        await this.carsRepository.updateAvailable(car.id, true)

        return rental
    }
}

export { DevolutionRentalUseCase }