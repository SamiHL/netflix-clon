
import Credentials from "next-auth/providers/credentials";
import { getUserbyEmail } from "./data/user";
import bcryptjs from "bcryptjs";
import { signInSchema } from "@/lib/zod";
import { NextAuthConfig } from "next-auth";

export default{
    providers: [
        Credentials({
            async authorize(credentials) {
                const validateFields=signInSchema.safeParse(credentials);

                if(!validateFields.success){
                    return null;
                }
                if(validateFields.success){
                    const {email,password}=validateFields.data;
                    const user= await getUserbyEmail(email);

                    if(!user || !user.password){
                        return null;}
                    const passwordMatch=await bcryptjs.compare(password, user.password);
                    if(passwordMatch){
                        return user;
                    }
                }
                return null
            }
        })
    ]

} satisfies NextAuthConfig;