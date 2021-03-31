import { container } from 'tsyringe';

import { DiskStorageProvider } from './implementations/DiskStorageProvider';
import IStorageProvider from './models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'Storageprovider',
  DiskStorageProvider,
);
