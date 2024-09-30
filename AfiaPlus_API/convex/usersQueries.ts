import { query, internalQuery } from './_generated/server';
import { v } from 'convex/values';


export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query('users').collect();   
  },
});

export const getUser = query({ 
  handler: async (ctx, args: any) => {
    return await ctx.db
      .query('users')
  .filter((q) => q.eq(q.field('email'), args.email))
  .collect()
  },
});


export const getUserByEmail = query({
  handler: async (ctx, args: any) => {
    return await ctx.db
    .query('users')
    .withIndex('email')
  .filter((q) => q.eq(q.field('email'), args.email))
  .collect()
  },
});



export const getUserVerifier = query({
  args: { verifier: v.string()},
  handler: async (ctx, args: any) => {
    return await ctx.db
    .query('authVerificationCodes')
    .withIndex('verifier')
  .filter((q) => q.eq(q.field('verifier'), args.verifier))
  .collect()
  },
});


