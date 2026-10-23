
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(
  process.env.BETTER_AUTH_MONGODB_URI
);

const db = client.db("bazardor");

export const auth = betterAuth({
  // Authentication URL
  baseURL: process.env.BETTER_AUTH_URL,

  // Database connection
  database: mongodbAdapter(db, {
    client,
  }),

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
  },

  // Google and GitHub account linking
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      allowDifferentEmails: false,
      disableImplicitLinking: false,
    },
  },

  // Social login providers
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});
