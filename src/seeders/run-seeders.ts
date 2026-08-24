import dataSource from '../../data-source';

import { rolesSeeder } from './roles.seeder';

import { usersSeeder } from './admin.seeder';

async function run() {
  try {
    await dataSource.initialize();

    console.log('DB conectada');

    await rolesSeeder(dataSource);

    console.log('Roles creados');

    await usersSeeder(dataSource);

    console.log('Admin creado');

    await dataSource.destroy();

    console.log('Seeders finalizados');
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

run();
