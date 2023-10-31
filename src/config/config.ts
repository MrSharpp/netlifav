import z from 'zod'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path: path.join(__dirname, '..', '..', '.env')})

console.log(process.env)

const envVars = z.object({
    NODE_ENV: z.enum(['Development', 'Production']),
    PORT: z.string()
})