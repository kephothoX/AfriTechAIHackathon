import { query, internalQuery } from './_generated/server';
import { v } from 'convex/values';



export const List = query({
  handler: async (ctx, args: any) => {
    return await ctx.db.query('files')
      .collect();
  },
});



export const GetFiles = query({
  handler: async (ctx, args: any) => {
    return await ctx.db.query('files')
      .filter((q) => q.eq(q.field('createdBy'), args.createdBy))
      .collect();
  },
});

export const GetFile = query({
  handler: async (ctx, args: any) => {
    return await ctx.db
      .query('files')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .collect()
  },
});

export const GetFileByFileID = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('files')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .collect()
  },
});



export const GetUserByName = query({
  handler: async (ctx, args: any) => {
    return await ctx.db
      .query('files')
      .withIndex('filename')
      .filter((q) => q.eq(q.field('filename'), args.filename))
      .collect()
  },
});


export const GetUserByType = query({
  handler: async (ctx, args: any) => {
    return await ctx.db
      .query('files')
      .withIndex('type')
      .filter((q) => q.eq(q.field('filename'), args.filename))
      .collect()
  },
});


export const GetFileEmbeddings = query({
  args: {
    id: v.string()
  },
  handler: async (ctx, args: any) => {
    return await ctx.db
      .query('fileEmbeddings')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .collect()
  },
});

export const GetFileEmbeddingsByFileID = query({
  args: {
    fileID: v.string()
  },
  handler: async (ctx, args: any) => {
    return await ctx.db
      .query('fileEmbeddings')
      .withIndex('fileID')
      .filter((q) => q.eq(q.field('fileID'), args.fileID))
      .collect()
  },
});

export const GetPosts = query({
  handler: async (ctx, args: any) => {
    return await ctx.db.query('posts')
      .collect();
  },
});

export const GetPost = query({
  args: { id: v.string() },
  handler: async (ctx, args: any) => {
    return await ctx.db
      .query('posts')
      .filter((q) => q.eq(q.field('_id'), args.id))
      .collect()
  },
});

export const GetPostsByUser = query({
  args: { createdBy: v.string() },
  handler: async (ctx, args: any) => {
    console.log(args);
    return await ctx.db
      .query('posts')
      .withIndex('createdBy')
      .filter((q) => q.eq(q.field('createdBy'), args.createdBy))
      .collect()
  },
});


export const GetSimilarPosts = query({
  args: { embeddings: v.array(v.float64()) },
  handler: async (ctx, args) => {
    return await ctx.db.query('posts')
      .filter((q) => q.eq(q.field('embeddings'), args.embeddings))
      .collect()
  }
});


export const GetSimilarDocuments = query({
  args: {
    fileID: v.string(),
    embeddings: v.array(v.float64())
  },
  handler: async (ctx, args) => {
    return await ctx.db.query('fileEmbeddings')
      .filter((q) => q.eq(q.field('fileID'), args.fileID))
      .filter((q) => q.eq(q.field('embeddings'), args.embeddings))
      .collect()
  }
});