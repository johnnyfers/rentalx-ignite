import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implemantaions/DayjsDateProvider';
import { MailProviderInMemory } from '../../../../shared/container/providers/MailProvider/inMemory/MailProviderInMemory';
import { AppError } from '../../../../shared/errors/AppError';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
    
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
          usersRepositoryInMemory,
          usersTokensRepositoryInMemory,
          dateProvider,
          mailProvider
        );
    })

    it('Should be able to send a forgot password mail to user', async () => {
        const sendMail = spyOn(mailProvider, 'sendMail')

        await usersRepositoryInMemory.create({
            driver_license: '664168',
            email: 'avzonbop@ospo.pr',
            name: 'heyy',
            username: 'Blanche Curry',
            password: '1234',
        })

        await sendForgotPasswordMailUseCase.execute('avzonbop@ospo.pr')

        expect(sendMail).toHaveBeenCalled()
    })

    it("should not be able to send an email if user does not exists", async () => {
        await expect(
          sendForgotPasswordMailUseCase.execute("ka@uj.gr")
        ).rejects.toEqual(new AppError("User does not exists"));
      });
    
      it("should be able to create an users token", async () => {
        const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");
    
        usersRepositoryInMemory.create({
          driver_license: "787330",
          email: "abome@regrog.ee",
          username: 'leonzinho',
          name: "Leon Perkins",
          password: "1234",
        });
    
        await sendForgotPasswordMailUseCase.execute("abome@regrog.ee");
    
        expect(generateTokenMail).toBeCalled();
      });
})