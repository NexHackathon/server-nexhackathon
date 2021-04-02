import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import createConnection from '..';

async function create() {
  const connection = await createConnection();

  const id = uuidV4();

  const password = await hash('admin', 8);

  await connection.query(`
    INSERT INTO USERS
      (id, name, school, date_of_birth, email,
      password, "isAdmin", created_at, updated_at)
      values
        ('${id}', 'admin', 'hackaNex', '20/07/2000', 'admin@hackanex.com.br',
        '${password}', true, 'now()', 'now()')
  `);
}

create().then(() => console.log('User admin created!'));
