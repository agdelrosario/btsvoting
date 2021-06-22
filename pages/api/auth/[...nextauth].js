import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],
  callbacks: {
    /**
     * @param  {object} user     User object
     * @param  {object} account  Provider account
     * @param  {object} profile  Provider profile 
     * @return {boolean|string}  Return `true` to allow sign in
     *                           Return `false` to deny access
     *                           Return `string` to redirect to (eg.: "/unauthorized")
     */
    async signIn(user, account, profile) {
      // console.log("user", user)
      // console.log("account", account)
      
      // console.log("account", account)
      // console.log("profile", profile)
      return true
      // const isAllowedToSignIn = true
      // if (isAllowedToSignIn) {
      //   return true
      // } else {
      //   // Return false to display a default error message
      //   return false
      //   // Or you can return a URL to redirect to:
      //   // return '/unauthorized'
      // }
    },
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    // session: async (session, user, sessionToken) => {
    //     //  "session" is current session object
    //     //  below we set "user" param of "session" to value received from "jwt" callback
    //     session.account = user.user;
    //     return Promise.resolve(session)
    // },
    redirect: async (url, _) => {
      console.log("url", url)
      if (url === '/api/auth/signin') {
        return Promise.resolve('/portal')
      }
      return Promise.resolve('/api/auth/signin')
    },
  },
  database: `${process.env.DATABASE_URL}/users`,
};

export default (req, res) => NextAuth(req, res, options);