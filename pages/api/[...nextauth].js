import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.Twitter({
      clientId: "",
      clientSecret: ""
    })
  ]
}