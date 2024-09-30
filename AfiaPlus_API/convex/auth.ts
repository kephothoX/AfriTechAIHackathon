
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Resend from "@auth/core/providers/resend";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { httpAction, action, query } from "./_generated/server";
import { DataModel } from "./_generated/dataModel";
import GitLab from "@auth/core/providers/gitlab";
import { api } from "./_generated/api";




export const { auth, signIn, signOut, store } = convexAuth<DataModel>({
  providers: [
    GitHub,
    GitLab, 
    Google,
    Password,
    Resend,
    //Password({ id: "password-with-reset", reset: ResendOTPPasswordReset }),
    /*Password({
      id: "password-code",
      reset: ResendOTPPasswordReset,
      verify: ResendOTP,
    }),*/
    // This one only makes sense with routing, ignore for now:
    Password({ id: "password-link", verify: Resend }),
  ],
  callbacks: {


    async afterUserCreatedOrUpdated(ctx: any, args: any, tokens: any) {
      console.log('-----> ', args);
 
      //await ctx.db.insert("someTable", { userId, data: "some data" });
    },
    // `args.type` is one of "oauth" | "email" | "phone" | "credentials" | "verification"
    // `args.provider` is the currently used provider config


    async createOrUpdateUser(ctx, args) {
      console.log(args);
      // Implement your own account linking logic:
      const existingUser = await findUserByEmail(ctx, args.profile.email);
      if (existingUser.length <= 0) {

        return await ctx.db.insert("users", {
          email: args.profile.email,
          image: args.profile.image,
          name:  args.profile.name
      });
        
      } else {
        console.log(existingUser);
        return existingUser._id;
      }        
    },
  },
});



const  findUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return  await ctx.db
    .query('users')
    .withIndex('email')
  .filter((q) => q.eq(q.field('email'), args.email ))
  .collect()
  }
});



