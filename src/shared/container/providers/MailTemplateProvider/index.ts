import { container } from 'tsyringe';

import { HandlebarsMailTemplateProvider } from './implementations/HandlebarsMailTemplateProvider';
import { IMailTemplateProvider } from './models/IMailTemplateProvider';

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);
