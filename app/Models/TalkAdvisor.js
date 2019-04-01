'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TalkAdvisor extends Model {
    static get table () {
        return 'talk_advisor'
    }

    user () {
        return this.hasOne('App/Models/User')
    }

    getCallbackPreference(callbackPreference) {
        switch (callbackPreference) {
            case 0:
                return 'phone'
                break

            case 1:
                return 'text'
                break

            case 2:
                return 'email'
                break

            default:
                return null
                break
        }

    }
}

module.exports = TalkAdvisor
