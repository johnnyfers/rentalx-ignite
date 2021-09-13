import { container } from "tsyringe";
import { IDateProvider } from "./IDateProvider";
import { DayjsDateProvider } from "./implemantaions/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
    'DayjsDateProvider',
    DayjsDateProvider
)
