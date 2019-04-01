'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RequestMaintenance extends Model {
    static get table () {
        return 'request_maintenance'
    }

    user () {
        return this.hasOne('App/Models/User')
    }

    getMiddleOrWeekend(middleOrWeekend) {
        switch (middleOrWeekend) {
            case 0:
                return 'weekday'
                break
            case 1:
                return 'weekend'
                break

            default:
                return null
                break
        }
    }

    getTimeOfDay(timeOfDay) {
        switch (timeOfDay) {
            case 0:
                return 'morning'
                break
            case 1:
                return 'afternoon'
                break
            case 2:
                return 'night'
                break

            default:
                return null
                break
        }
    }

    getCallbackPreference(callbackPreference) {
        switch (callbackPreference) {
            case 0:
                return 'phone'
                break;

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

module.exports = RequestMaintenance
