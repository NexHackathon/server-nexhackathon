interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'gnferreira2000@gmail.com',
      name: 'Gustavo do HackaNex',
    },
  },
} as IMailConfig;
