import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { Validator, v } from "convex/values";



export default defineSchema({

  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),

  authSessions: defineTable({
    userId: v.optional(v.id("users")),
    expirationTime: v.optional(v.number()),
  }).index("userId", ["userId"]),

  authAccounts: defineTable({
    userId: v.optional(v.id("users")),
    provider: v.optional(v.string()),
    providerAccountId: v.optional(v.string()),
    secret: v.optional(v.string()),
    emailVerified: v.optional(v.string()),
    phoneVerified: v.optional(v.string()),
  })
  .index("userIdAndProvider", ["userId", "provider"])
  .index("providerAndAccountId", ["provider", "providerAccountId"]),

  authRefreshTokens: defineTable({
    sessionId: v.optional(v.id("authSessions")),
    expirationTime: v.optional(v.number()),
  }).index("sessionId", ["sessionId"]),


  authVerificationCodes: defineTable({
    accountId: v.optional(v.id("authAccounts")),
    provider: v.optional(v.string()),
    code: v.optional(v.string()),
    expirationTime: v.optional(v.number()),
    verifier: v.optional(v.string()),
    emailVerified: v.optional(v.string()),
    phoneVerified: v.optional(v.string()),
  })
  .index("accountId", ["accountId"])
  .index("code", ["code"])
  .index("verifier", ["verifier"]),

  authVerifiers: defineTable({
    sessionId: v.optional(v.id("authSessions")),
    signature: v.optional(v.string()),
  }).index("signature", ["signature"]),

  authRateLimits: defineTable({
    identifier: v.optional(v.string()),
    lastAttemptTime: v.optional(v.number()),
    attemptsLeft: v.optional(v.number()),
  }).index("identifier", ["identifier"]),



  files: defineTable({
    fileURL: v.string(),
    fileStorageID: v.string(),
    filename: v.string(),
    fileType: v.string(),
    createdBy: v.string(),
    aboutFile: v.string()
    })
    .index("fileURL", ["fileURL"])
    .index("context", ["aboutFile"])
    .index("filename", ["filename"])
    .index("type", ["fileType"])
    .index("createdBy", ["createdBy"]),


  fileEmbeddings: defineTable({
    fileID: v.string(),
    content: v.array(v.string()),
    embeddings: v.array(v.float64())
  })
  .index("fileID", ["fileID"])
  .vectorIndex("by_embeddings", {
  vectorField: "embeddings",
  dimensions: 768,
  filterFields: ["content"]
  }),


  posts: defineTable({
    title: v.string(),
    intro: v.string(),
    content: v.string(),
    summary: v.string(),
    postThumbnailURL: v.string(),
    postThumbnailID: v.string(),
    embeddings: v.array(v.float64()),
    createdBy: v.string()
  })
  .index("title", ["title"])
  .index("createdBy", ["createdBy"])
  .vectorIndex("by_embeddings", {
    vectorField: "embeddings",
    dimensions: 768
  })

});