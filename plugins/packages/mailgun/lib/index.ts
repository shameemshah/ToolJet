import { QueryError, QueryResult, QueryService } from '@tooljet-plugins/common';
import { SourceOptions, QueryOptions, EmailOptions } from './types';
import * as formData from 'form-data';
import Mailgun from 'mailgun.js';
const mailgun = new Mailgun(formData as any);

export default class MailgunLib implements QueryService {
  async run(sourceOptions: SourceOptions, queryOptions: QueryOptions, dataSourceId: string): Promise<QueryResult> {
    if (!(queryOptions && sourceOptions.api_key)) {
      throw new QueryError('Query could not be completed as API key is not set', 'Missing API key', {});
    }

    // const sdk = new MailgunSdk(FormData);
    // const mailgunOptions = { username: 'api', key: sourceOptions.api_key, url: null };
    const mailgunOptions: any = mailgun.client({ username: 'api', key: sourceOptions.api_key });

    if (sourceOptions.eu_hosted) {
      mailgunOptions.url = 'https://api.eu.mailgun.net';
    }
    // const mailGunClient = sdk.client(mailgunOptions);

    let result = {};
    // const emailOptions: EmailOptions = {
    //   to: queryOptions.send_mail_to,
    //   from: queryOptions.send_mail_from,
    //   subject: queryOptions.subject,
    //   text: queryOptions.text,
    // };
    const emailOptions: EmailOptions =
      // .create(sourceOptions.domain, {
      {
        // from: queryOptions.send_mail_from,
        // to: queryOptions.send_mail_to,
        // subject: queryOptions.subject,
        // message: queryOptions.text,
        from: 'Excited User <adish@tooljet.com>',
        to: ['stepinfwd@gmail.com'],
        subject: 'Hello',
        text: 'Testing some Mailgun awesomness!',
        // html: '<h1>Testing some Mailgun awesomness!</h1>',
      };
    // })
    // .then((msg) => console.log(msg)) // logs response data
    // .catch((err) => console.error(err)); // logs any error

    if (queryOptions.html && queryOptions.html.length > 0) {
      emailOptions.html = queryOptions.html;
    }

    try {
      console.log('oprions', sourceOptions.domain, emailOptions);
      result = await mailgunOptions.messages.create(sourceOptions.domain, emailOptions);
      // mg.messages.create(domain, data)
    } catch (error) {
      console.error(error);
      throw new QueryError('Query could not be completed', error.message, {});
    }
    return {
      status: 'ok',
      data: result,
    };
  }
}
