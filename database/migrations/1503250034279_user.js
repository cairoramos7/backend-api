'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
    up() {
        this.create('users', (table) => {
            table.increments()
            table.string('username', 80).notNullable().unique()
            table.string('email', 254).notNullable().unique()
            table.string('password', 60).notNullable()

            table.string('name', 250)
            table.string('numberPhone', 50)
            table.string('vipLine', 100)
            table.string('address')
            table.string('city')
            table.string('zip')

            table.timestamps()
        })
    }

    down() {
        this.drop('users')
    }
}

module.exports = UserSchema
