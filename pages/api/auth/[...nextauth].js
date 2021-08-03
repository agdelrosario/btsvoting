import { PanoramaSharp } from "@material-ui/icons";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../util/mongodb";

const options = {
  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  events: {
    async updateUser(message) {

      // console.log("updateUser message", message)

    },
    async createUser(message) {
      const { db } = await connectToDatabase();

      // console.log("createUser message", message)

      const admin = await db
        .collection("admins")
        .find({email: message.email})
        .limit(20)
        .toArray();

      const data = await db
        .collection("profiles")
        .updateOne(
          {
            email: message.email,
          },
          {
            $set: {
              user_id: message.id,
              email: message.email,
              role: admin && admin.length > 0 ? "admin" : "member"
            }
            // provider: message.providerAccount.provider,
            // username: message.providerAccount.provider == 'twitter' ? message.providerAccount.params.screen_name : message.user.name,
          },
          {
            upsert: true,
          }
        )

    },
    async linkAccount(message) {

      // console.log("linkAccount message", message)
      const { db } = await connectToDatabase();

      // const admin = await db
      //   .collection("admins")
      //   .find({email: message.user.email})
      //   .limit(20)
      //   .toArray();

      const data = await db
        .collection("profiles")
        .updateOne(
          {
            email: message.user.email,
          },
          {
            $set: {
              email: message.user.email,
              provider: message.providerAccount.provider,
              username: message.providerAccount.provider == 'twitter' ? message.providerAccount.params.screen_name : message.user.name,
              user_id: message.providerAccount.id,
            }
            // email: message.user.email,
            // role: admin && admin.length > 0 ? "admin" : "member"
          },
          {
            upsert: true,
          }
        )
    //   // res.json(data.result);
    },
  },
  callbacks: {
    /**
     * @param  {object} user     User object
     * @param  {object} account  Provider account
     * @param  {object} profile  Provider profile 
     * @return {boolean|string}  Return `true` to allow sign in
     *                           Return `false` to deny access
     *                           Return `string` to redirect to (eg.: "/unauthorized")
     */
    async signIn(user, account, profile, isNewUser) {
      // console.log("signIn profile", profile)
      // console.log("signIn account", account)
      const { db } = await connectToDatabase();

      const admin = await db
        .collection("admins")
        .find({email: user.email})
        .limit(20)
        .toArray();

      if (admin && admin.length > 0) {
        return true
      }

      let params = null

      if (account.provider == 'facebook') {
        params = {username: profile.name}
      } else if (account.provider == 'twitter') {
        params = {username: profile.screen_name}
      }


      if (params) {
        const whitelistResult = await db
          .collection("whitelist")
          .find(params)
          .limit(20)
          .toArray();

        if (whitelistResult && whitelistResult.length > 0) {
          return true
        }
      }

      const data = await db
        .collection("profiles")
        .updateOne(
          {
            email: profile.email,
          },
          {
            $set: {
              email: profile.email,
              user_id: account.id,
              email: profile.email,
              role: admin && admin.length > 0 ? "admin" : "member",
              provider: account.provider,
              username: params.username,
            }
          },
          {
            upsert: true,
          }
        )
      
      return '/unauthorized'
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
      // console.log("url", url)
      if (url === '/api/auth/signin') {
        return Promise.resolve('/portal')
      }
      return Promise.resolve('/api/auth/signin')
    },
  },
  database: `${process.env.DATABASE_URL}/users`,
};

export default (req, res) => NextAuth(req, res, options);