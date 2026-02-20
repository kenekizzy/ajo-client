import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import { z } from "zod"

// Validation schema for credentials login
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Credentials provider for email/password authentication
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate credentials format
          const validatedFields = loginSchema.safeParse(credentials)

          if (!validatedFields.success) {
            return null
          }

          const { email, password } = validatedFields.data

          // TODO: Replace with actual user authentication logic
          // This is a placeholder - in a real app, you would:
          // 1. Hash the password and compare with stored hash
          // 2. Query your database for the user
          // 3. Verify the password

          // Mock user for development
          if (email === "test@example.com" && password === "password123") {
            return {
              id: "1",
              name: "Test User",
              email: "test@example.com",
              image: null,
            }
          }

          return null
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      },
    }),

    // Google OAuth provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Facebook OAuth provider
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

  ],

  pages: {
    signIn: "/login",
    newUser: "/welcome", // Optional: redirect new OAuth users here
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token and provider info to the token right after signin
      if (account && user) {
        token.provider = account.provider
        token.accessToken = account.access_token
      }
      return token
    },

    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.provider = token.provider as string
      }
      return session
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl + "/dashboard"
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
})