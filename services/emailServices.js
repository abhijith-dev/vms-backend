const mailService = require('@sendgrid/mail')
const { readFileSync } = require('fs');
const { compile } = require('handlebars');
const mjml = require('mjml');
const {TWILIO_EMAIL_API_KEY,TEMPLATE_DIR,EMAIL_SUBJECT} = require('../config/variables')

mailService.setApiKey(TWILIO_EMAIL_API_KEY)

const sendMAIL = async(to,values)=>{
    const hbsFile = readFileSync(TEMPLATE_DIR, { encoding: 'utf8' });
    const compiledTemplate = compile(hbsFile);
    const mjmlMarkup = compiledTemplate(values);
    const mjmlData = mjml(mjmlMarkup);
    if (mjmlData.errors.length > 0) {
          throw Error('!template')
    }
    const response = {
      to: to,
      from: 'mayura.backend.service@gmail.com',
      subject: EMAIL_SUBJECT,
      html:mjmlData.html,
    }
    await mailService
      .send(response)
      .then(() => {
        return 
      })
      .catch(() => {
        throw Error('!mail')
      })
  }

  module.exports ={
      sendMail :sendMAIL
  }

