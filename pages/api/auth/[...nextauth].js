import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, email }),
        });

        return response;
      },
    }),
  ],

  secret: process.env.SECRET,

  // pages: {
  //   signIn: "/auth/signin",
  // },

  // callbacks: {
  //   async session({ session, token, user }) {
  //     session.user.username = session.user.name
  //       .split(" ")
  //       .join("")
  //       .toLocaleLowerCase();
  //     session.user.uid = token.sub;
  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);
