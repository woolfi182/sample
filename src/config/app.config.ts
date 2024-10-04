export const appConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3002,
  isLocal: process.env.IS_LOCAL === 'true',

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '30 days',
    algorithm: 'HS256',
    // RS256 is widely used in production for JWTs, especially in web applications, OAuth, and distributed systems because of its strong security (asymmetric encryption).
    // ES256 is preferred when you want the same level of security as RSA but with better performance and smaller keys, which can be important for mobile or performance-sensitive systems.
  },

  postgres: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  },

  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sqsConsumerBotQueueUrl: process.env.SQS_CUSTOMER_BOT_QUEUE_URL,
  },
});
