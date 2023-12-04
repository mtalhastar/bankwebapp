import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "enter email" },
                password: { label: "Password", type: "password", placeholder: "enter password" }
            },
            async authorize(credentials, req) {
                const response = await fetch('http://localhost:4000/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials),
                });
            
                const user = await response.json();
            
                if (response.ok && user) {
                    return Promise.resolve({
                        id: user.id, // Replace with the actual property name for user ID
                        name: user.name, // Replace with the actual property name for user name
                        email: credentials.email, // Use the provided email from credentials
                    });
                }
            
                return Promise.resolve(null);
            }
            
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}