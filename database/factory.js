'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker) => {
    return {
        // username: faker.username()
        username: 'cairoramos7',
        email: 'cairo.ramosoliveira4@gmail.com',
        password: await Hash.make('123456'),
        name: 'Cairo Ramos',
        numberPhone: faker.phone(),
        vipLine: faker.cpf(),
        address: faker.address(),
        city: faker.city(),
        zip: faker.zip()
    }
})
