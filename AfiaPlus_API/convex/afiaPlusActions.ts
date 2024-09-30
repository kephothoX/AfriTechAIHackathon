"use node";


import { action } from './_generated/server';
import { v } from 'convex/values';
import { api  } from './_generated/api';

import * as fs from 'fs';



export const NewFileMetaData = action({
    args: {
       filename: v.string(),
       fileURL: v.string(),
       fileStorageID: v.string(),
       fileType: v.string(),
       createdBy: v.string(),
       aboutFile: v.string()
    },
    handler: async(ctx, args) => {
        console.log(args);

        const response: any = await ctx.runMutation(api.konverseMutations.NewFile, args);
        return response;
    }
});



export const UpdateFileMetaData = action({
    args: {
        id: v.any(),
       filename: v.string(),
       fileURL: v.string(),
       fileStorageID: v.string(),
       fileType: v.string(),
       createdBy: v.string(),
       aboutFile: v.string()
    },
    handler: async(ctx, args) => {
        console.log(args);

        const response: any = await ctx.runMutation(api.konverseMutations.UpdateFileMetaData, args);

        return response;
    }
});



export const ReadPDFFile = action({
    args: {},
    handler: async (ctx, args) => {
        /*console.log(args);

        const response: any = new PdfReader().parseFileItems("https://abundant-perch-395.convex.cloud/api/storage/f75c1d7b-30f3-4417-adf7-d8a4fa0c57d1", (err, item) => {
            if (err) console.error("error:", err);
            else if (!item) console.warn("end of file");
            else if (item.text) console.log(item.text);
        });

        return response;*/
        const storageId = "f75c1d7b-30f3-4417-adf7-d8a4fa0c57d1";

        const blob = await ctx.storage.get(storageId);

        console.log(blob);


        fs.readFile(`${ blob }`, (err, pdfBuffer) => {
            // pdfBuffer contains the file content
            new PdfReader().parseBuffer(pdfBuffer, (err, item) => {
                if (err) console.error("error:", err);
                else if (!item) console.warn("end of buffer");
                else if (item.text) console.log(item.text);
            });
        });
    }
});


export const List = action({
    handler: async(ctx, args) => {
        const response: any =  await ctx.runQuery(api.konverseQueries.List)

        return response;
    }
});




