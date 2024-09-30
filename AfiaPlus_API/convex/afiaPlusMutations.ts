import { mutation, internalMutation } from "./_generated/server";
import { v } from 'convex/values';



export const NewFile = mutation({
  handler: async(ctx, args: any) => {
    return await ctx.db.insert('files',  args);
  }
});


export const AddEmbeddings = mutation({
  args: {
    fileID: v.string(),
    content: v.array(v.string()),
    embeddings: v.array(v.float64())
  },
  handler: async(ctx, args) => {
    return await ctx.db.insert('fileEmbeddings', args)
  }
});



export const UpdateFileMetaData = mutation({
  args: { 
    id: v.id('files'), 
    filename: v.string(),
    fileURL: v.string(),
    fileStorageID: v.string(),
    aboutFile: v.string(),
    createdBy: v.string(),
    fileType: v.string()
  },

  handler: async (ctx, args) => {
    const id  = args.id;    
    return await ctx.db.patch(id, { 
      createdBy:  args.createdBy, 
      _id: args.id, 
      aboutFile: args.aboutFile,
      fileStorageID: args.fileStorageID,
      fileURL: args.fileURL,
      filename: args.filename,
      fileType: args.fileType 
    });
    
  },
});

export const DeleteFile = mutation({
  args: { id: v.id("files") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const DeleteFileEmbeddings = mutation({
  args: { id: v.id("fileEmbeddings") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});



export const DeleteFileById = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.delete(args.storageId);
  },
});



export const NewPost = mutation({
  handler: async(ctx, args: any) => {
    return await ctx.db.insert('posts',  args);
  }
});


export const UpdatePost = mutation({
  args: { 
    id: v.id('posts'), 
    title: v.string(),
    postThumbnailURL: v.string(),
    postThumbnailID: v.string(),
    content: v.string(),
    createdBy: v.string(),
    intro: v.string(),
    summary: v.string(),
    embeddings: v.array(v.float64())
  },

  handler: async (ctx, args) => {
    console.log(args);
    return await ctx.db.patch(args.id, { 
      createdBy:  args.createdBy, 
      _id: args.id, 
      title: args.title,
      content: args.content,
      postThumbnailID: args.postThumbnailID,
      postThumbnailURL: args.postThumbnailURL,
      intro: args.intro,
      summary: args.intro,
      embeddings: args.embeddings
    });
    
  },
});


