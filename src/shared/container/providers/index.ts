import { container } from 'tsyringe'
import { IDateProvider} from './DateProvider/IDateProvider'
import { DayjsDateProvider } from './DateProvider/implemantaions/DayjsDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { EtherealMailProvider } from './MailProvider/implemantations/EtherealMailProvider'

container.registerSingleton<IDateProvider>(
    'DayjsDateProvider',
    DayjsDateProvider
)

container.registerInstance<IMailProvider>(
    'EtherealMailProvider',
    new EtherealMailProvider()
)