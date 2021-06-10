import { container } from 'tsyringe'
import { IDateProvider} from './DateProvider/IDateProvider'
import { DayjsDateProvider } from './DateProvider/implemantaions/DayjsDateProvider'

container.registerSingleton<IDateProvider>(
    'DayjsDateProvider',
    DayjsDateProvider
)