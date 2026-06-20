import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000'),

  nodeEnv: process.env.NODE_ENV,

  appName: process.env.APP_NAME,
}))