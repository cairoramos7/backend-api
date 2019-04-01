'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TalkAdvisorSchema extends Schema {
    up() {
        this.create('talk_advisor', (table) => {
            table.increments()

            table.string('message')
            table.integer('callbackPreference')
                .default(0)
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
        this.drop('talk_advisor')
    }
}

module.exports = TalkAdvisorSchema
