import { injectable } from "tsyringe";
import nodemailer, { Transporter } from 'nodemailer'
import { IMailProvider } from "../IMailProvider";
import fs from 'fs';
import handlebars from 'handlebars';
import aws from 'aws-sdk'

@injectable()
class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
                region: process.env.AWS_REGION
            })
        })
    }

    async sendMail(to: string, subject: string, vars: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString('utf-8')

        const templateParse = handlebars.compile(templateFileContent)

        const templateHTML = templateParse(vars)

        await this.client.sendMail({
            to,
            from: 'RentalX <johnny@rentalxjohnny.pt>',
            subject,
            html: templateHTML
        })
    }

}

export { SESMailProvider }