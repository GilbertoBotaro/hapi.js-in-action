var Handlers = require('./handlers');
var Joi = require('joi');

module.exports = [{
    method: 'GET',
    path: '/',
    handler: Handlers.form
}, {
    method: 'POST',
    path: '/',
    handler: Handlers.form,
    config: {
        validate: {
            payload: {
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                age: Joi.number().required(),
                tshirt: Joi.string().required()
                    .valid(['S','M','L','XL'])
            },
            options: {
                abortEarly: false
            },
            failAction: function (request, reply, source, error) {

                var errors = {};
                var details = error.data.details;

                for(var i = 0; i < details.length; i++) {
                    if (!errors.hasOwnProperty(details[i].path)) {
                        errors[details[i].path] = details[i].message;
                    }
                }

                reply.view('form', {
                    errors: errors,
                    values: request.payload
                }).code(400);
            }
        }
    }
}, {
    method: 'GET',
    path: '/success',
    handler: Handlers.success
}];