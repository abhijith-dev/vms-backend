const env = process.env

module.exports= {
  PORT : env.PORT,
  DB_URI : `${env.DB_URL}${env.DB_NAME}`,
  TOKEN_SECRET : env.TOKEN_SECRET,
  TEMPLATE_DIR :env.TEMPLATE_DIR,
  TWILIO_EMAIL_API_KEY :env.TWILIO_EMAIL_API_KEY,
  EMAIL_SUBJECT : env.EMAIL_SUBJECT
}