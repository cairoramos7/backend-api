'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const RequestMaintenance = use('App/Models/RequestMaintenance')

/**
 * Resourceful controller for interacting with requestmaintenances
 */
class RequestMaintenanceController {
    /**
     * Show a list of all requestmaintenances.
     * GET requestmaintenances
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        const requestMaintenance = await RequestMaintenance.all()

        return requestMaintenance
    }

    /**
     * Create/save a new requestmaintenance.
     * POST requestmaintenances
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, auth }) {
        const payload = request.only([
            'middleOrWeekend',
            'timeOfDay',
            'callbackPreference'
        ])

        const user = auth.user
        payload.userId = user.id

        const requestMaintenance = await RequestMaintenance.create(payload)

        if (request.callbackPreference === 2) {
            await Mail.send('emails.request', user.toJSON(), (message) => {
                message
                    .to(user.email)
                    .from('<cairo.ramosoliveira4@gmail.com>')
                    .subject('ROTH - HEALTING & COOLING')
            })
        }

        return requestMaintenance
    }

    /**
     * Display a single requestmaintenance.
     * GET requestmaintenances/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        const requestmaintenance = await RequestMaintenance.find(params.id)

        return requestMaintenance
    }

    /**
     * Update requestmaintenance details.
     * PUT or PATCH requestmaintenances/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        const payload = request.only([
            'middleOrWeekend',
            'timeOfDay',
            'callbackPreference'
        ])

        const requestMaintenance = await RequestMaintenance.find(params.id)
        requestMaintenance.merge(payload)
        await requestMaintenance.save()

        return requestMaintenance
    }

    /**
     * Delete a requestmaintenance with id.
     * DELETE requestmaintenances/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
        const requestMaintenance = await RequestMaintenance.find(params.id)
        requestMaintenance.delete()

        return requestMaintenance
    }
}

module.exports = RequestMaintenanceController
