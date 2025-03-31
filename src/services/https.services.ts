import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendMail(options: { to: string; from: string; subject: string; body: string }) {
    const mailOptions = {
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.body,
    };

    await this.transporter.sendMail(mailOptions);
  }
}