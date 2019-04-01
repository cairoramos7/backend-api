'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RequestMaintenanceSchema extends Schema {
    up() {
        this.create('request_maintenance', (table) => {
            table.increments()

            table.integer('middleOrWeekend').default(0)
            table.integer('timeOfDay').default(0)
            table.integer('callbackPreference').default(0)
            table.integer('userId').unsigned()
            table.foreign('userId')
                .references('id')
                .inTable('users')
                .onDelete('cascade')
                .onUpdate('cascade')

            table.timestamps()
        })
    }

    down() {
        this.drop('request_maintenance')
    }
}

module.exports = RequestMaintenanceSchema
