'use node';

import 'dotenv/config';
import { action } from './_generated/server';
import { v } from 'convex/values';
import { api } from './_generated/api';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { stripHtml } from "string-strip-html";


const genAI = new GoogleGenerativeAI(`${ process.env.GEMINI_API_KEY }`);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


function TextFormatting(text: string) {
  text.replace(/\_(.+?)_\|/g, '')
   text.replace(/\*\*(.+?)\*\*/g, '')
  return text
}

export const StripHTML = action({
  args: { content: v.string() },
  handler: async (ctx, args) => {
    return stripHtml(args.content).result
  }
})


export const FormatGenerativeAIHTMLContentAsText = action({
  args: { 
    prompt: v.string()
  },
  handler: async (ctx, args) => {
    const result = await model.generateContent(args.prompt);
    const response = result.response;

    return response.text();
  }
});

export const GenerateContent = action({
  args: { 
    prompt: v.string()
  },
  handler: async (ctx, args) => {
    const result = await model.generateContent(args.prompt);
    const response = result.response;

    return response.text();
  }
});


export const GenerateContentWithContext = action({
  args: { 
    prompt: v.string(),
    context: v.array(v.string())
  },
  handler: async (ctx, args) => {
    const query = `${ args.prompt } given this ${ args.context } as context, format answer as html`;
    const result = await model.generateContent(query);
    const response = result.response;

    console.log(response.text());

    return response.text();
  }
});

export const SummarizeContent = action({
  args: { content: v.string() },
  handler: async (ctx, args) => {
    const result = await model.generateContent(`summarize this ${ args.content } content, format answer as html`);
    const response = result.response;

    return response.text();
  }

});

export const GenerateIntro = action({
  args: { content: v.string() },
  handler: async (ctx, args) => {
    console.log(args.content);
    const result = await model.generateContent(`generate short intro based on ${ args.content } format answer as html`);
    const response = result.response;

    return response.text();
  }

});


export const GenerativeAIChat = action({
  args: { chat: v.string() },
  handler: async (ctx, args) => {
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const result = await chat.sendMessage(args.chat);
    const response =  result.response;
    
    return response.text();
  }
});


export const  GenerateEmbeddings = action({
  args: { content: v.string() },
  handler: async (ctx, args) => {
    const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004"});

    const result = await embeddingModel.embedContent(args.content);
    const embedding = result.embedding;  
    return embedding.values;
  }
});



export const FilesQueryEmbeddings = action({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const embeddings: any = await (ctx.runAction(api.konverseAIActions.GenerateEmbeddings, { content: args.query }));

    const response = await ctx.vectorSearch('fileEmbeddings', 'by_embeddings', {
      vector: embeddings,
    });
    return response;
  }
});

export const BlogQueryEmbeddings = action({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const embeddings: any = await (ctx.runAction(api.konverseAIActions.GenerateEmbeddings, { content: args.query }));

    const response = await ctx.vectorSearch('posts', 'by_embeddings', {
      vector: embeddings,
    });
    return response;
  }
});