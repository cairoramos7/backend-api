'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const TalkAdvisor = use('App/Models/TalkAdvisor')
const Mail = use('Mail')

/**
 * Resourceful controller for interacting with talkadvisors
 */
class TalkAdvisorController {
    /**
     * Show a list of all talkadvisors.
     * GET talkadvisors
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ }) {
        const talkadvisor = await TalkAdvisor.all()

        return talkadvisor
    }

    /**
     * Create/save a new talkadvisor.
     * POST talkadvisors
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, auth }) {
        const payload = request.only([
            'message',
            'callbackPreference'
        ])

        const user = auth.user
        payload.userId = user.id

        const talkAdvisor = await TalkAdvisor.create(payload)

        if (request.callbackPreference === 2) {
            await Mail.send('emails.request', user.toJSON(), (message) => {
                message
                    .to(user.email)
                    .from('<cairo.ramosoliveira4@gmail.com>')
                    .subject('ROTH - HEALTING & COOLING')
            })
        }

        return talkAdvisor
    }

    /**
     * Display a single talkadvisor.
     * GET talkadvisors/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params }) {
        const talkAdvisor = await TalkAdvisor.find(params.id)

        return talkAdvisor
    }

    /**
     * Update talkadvisor details.
     * PUT or PATCH talkadvisors/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request }) {
        const payload = request.only([
            'message',
            'callbackPreference'
        ])

        const talkAdvisor = await TalkAdvisor.find(params.id)

        talkAdvisor.merge(payload)
        await talkAdvisor.save()

        return talkAdvisor
    }

    /**
     * Delete a talkadvisor with id.
     * DELETE talkadvisors/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params }) {
        const talkAdvisor = await TalkAdvisor.find(params.id)

        talkAdvisor.delete()

        return talkAdvisor
    }
}

module.exports = TalkAdvisorController
