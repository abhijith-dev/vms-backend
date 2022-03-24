const env = process.env

module.exports= {
  PORT : env.PORT,
  DB_URI : `${env.DB_URL}${env.DB_NAME}`,
  TOKEN_SECRET : env.TOKEN_SECRET
}