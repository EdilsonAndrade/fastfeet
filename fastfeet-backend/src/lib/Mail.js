import nodemailerhbs from 'nodemailer-express-handlebars';
import exphbs from 'express-handlebars';
import { resolve } from 'path';
import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const {
      auth, host, port, secure,
    } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      auth: auth.user ? auth : null,
      secure,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          partialsDir: resolve(viewPath, 'partials'),
          layoutsDir: resolve(viewPath, 'layouts'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',

      }),
    );
  }

  sendMail(message) {
    this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
