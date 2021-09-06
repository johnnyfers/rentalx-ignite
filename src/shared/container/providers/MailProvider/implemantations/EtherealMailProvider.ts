import { injectable } from "tsyringe";
import nodemailer, { Transporter } from 'nodemailer'
import { IMailProvider } from "../IMailProvider";
import fs from 'fs';
import handlebars from 'handlebars';

@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                }
            })
            this.client = transporter
        })
            .catch((error) => console.error(error))
    }

    async sendMail(to: string, subject: string, vars: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString('utf-8')

        const templateParse = handlebars.compile(templateFileContent)

        const templateHTML = templateParse(vars)

        const message = await this.client.sendMail({
            to,
            from: 'RentalX <noreplay@rentalx.com.br>',
            subject,
            html: templateHTML
        })

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }

}

export { EtherealMailProvider }