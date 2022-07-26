import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google';

import prisma from '../../../lib/prisma';

export const authOption = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            profile(profile){
                return {
                    id: profile.id?.toString(),
                    name: profile.name || profile.login,
                    username: profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    hired: '01/01/2022',
                    role: 'Estagiário'
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile(profile){
                return {
                    id: profile.sub?.toString(),
                    name: profile.name,
                    username: profile.email,
                    email: profile.email,
                    image: profile.picture,
                    hired: '01/01/2022',
                    role: 'Estagiário'
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session: ({session, user}) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
                username: user.username,
                hired: user.hired,
            }
        })
    }
}

export default NextAuth(authOption);