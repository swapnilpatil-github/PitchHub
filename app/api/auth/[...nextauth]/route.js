import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      // If account is available (e.g., during login), add access token and user details
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.id ||  account.providerAccountId || token.sub; // GitHub user ID
      }
      return token;
    },
    async session({ session, token }) {
      // Attach token details to the session object
      session.user.id = token.id; // Include the user ID
      session.accessToken = token.accessToken; // Include the access token
      return session;
    },
  },
});

export { handler as GET, handler as POST };
