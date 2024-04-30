"use server";

import { currentUser } from '@clerk/nextjs/server'
import { StreamClient } from '@stream-io/node-sdk'

const apikey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const secretkey = process.env.STREAM_SECRET_KEY

export const tokenProvider = async () => {
    const user = await currentUser()

    if(!user) throw new Error("User not found")
    if(!apikey) throw new Error("API key not found")
    if(!secretkey) throw new Error("Secret key not found")
    
    const client = new StreamClient(apikey, secretkey)

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60

    const issue = Math.floor(Date.now() / 1000) - 60

    const token = await client.createToken(user.id, exp, issue)

    return token
}

