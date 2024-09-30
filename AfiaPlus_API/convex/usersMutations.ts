import { mutation, internalMutation } from "./_generated/server";
import { v } from 'convex/values';
import { getAuthUserId } from "@convex-dev/auth/server";
 
export const ifUserAuthenticated = mutation({
  args: { id:  v.id('users') },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return "Client is not authenticated!"
    }
    const user = await ctx.db.get(userId);
    // ...
  },
});



export const addNewUser = mutation({
  handler: async(ctx, args: any) => {
    return await ctx.db.insert('users',  args);
  }
});



export const updateUser = mutation({
  args: { 
    id: v.id('users'),
    email: v.string(), 
    name: v.string(), 
    phone: v.string(),
    image: v.string(),
    isAnonymous: v.boolean() 
  },

  handler: async (ctx, args: any) => {
    const id: any  = args.id;
    
    await ctx.db.patch(id, {
      name: args.name,  
      email: args.email, 
      phone: args.phone,
      image: args.image,
      isAnonymous: args.isAnonymous 
    });

    return id;
    
  },
});





