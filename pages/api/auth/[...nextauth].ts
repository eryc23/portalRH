import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
// import Facebook from "next-auth/providers/facebook";

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
                    image: profile.avatar_url
                }
            }
        }),
        // Facebook({
        //     clientId: process.env.FACEBOOK_CLIENT_ID,
        //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        //     profile(profile){
        //         return {
        //             id: profile.id?.toString(),
        //             name: profile.name || profile.login,
        //             username: profile.login,
        //             email: profile.email,
        //             image: profile.avatar_url
        //         }
        //     }
        // }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session: ({session, user}) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
                username: user.username
            }
        })
    }
}

export default NextAuth(authOption);