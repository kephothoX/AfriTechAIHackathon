import { httpAction } from './_generated/server';
import { api } from './_generated/api';



export const UploadFile = httpAction(async (ctx, request) => {
  const bl = await request.blob();
  const blob = new Blob([bl], { type: bl.type});

  const storageId = await ctx.storage.store(blob);
  const storageURL = await ctx.storage.getUrl(storageId);

  return new Response(JSON.stringify({ fileStorageID: storageId, fileURL: storageURL }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
})

export const NewFileMetaData = httpAction(async (ctx, request) => {
  let response;
  const params = JSON.parse(await request.text());
  const file = {
    createdBy: params['createdBy'],
    id: params['id'],
    fileURL: params['fileURL'],
    fileStorageID: params['fileStorageID'],
    filename: params['filename'],
    aboutFile: params['aboutFile'],
    fileType: params['fileType']
  };

  response = await ctx.runAction(api.konverseActions.NewFileMetaData, file);

  return new Response(JSON.stringify({ id: response }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
});


export const UpdateFileMetaData = httpAction(async (ctx, request) => {
  let response;
  const params = JSON.parse(await request.text());
  const file = {
    createdBy: params['createdBy'],
    id: params['id'],
    fileURL: params['fileURL'],
    fileStorageID: params['fileStorageID'],
    filename: params['filename'],
    aboutFile: params['aboutFile'],
    fileType: params['fileType']
  };

  response = await ctx.runAction(api.konverseActions.UpdateFileMetaData, file);

  return new Response(JSON.stringify({ id: response }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
});


export const GetFiles = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());
  const response = await ctx.runQuery(api.konverseQueries.GetFiles, { createdBy: params['createdBy']});
    

  return new Response(JSON.stringify(response), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
});

export const GetFile = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());
  const response = await ctx.runQuery(api.konverseQueries.GetFile, { id: params['id']});
    

  return new Response(JSON.stringify(response), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
});

export const GetFileByFileID = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());
  const response = await ctx.runQuery(api.konverseQueries.GetFileByFileID, { id: params['id']});
    

  return new Response(JSON.stringify(response), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
});

/*
export const UpdateFileMetaData = httpAction(async (ctx, request) => {
  let response;
  const params = JSON.parse(await request.text());

  console.log(params);

  const file = {
    created_by: 'kephothosolutions@gmail.com',
    id: params['id'],
    FileID: params['fileID'],
    fileURL: params['filesURL]
    filename: params['filename'],
    aboutFile: params['aboutFile'],
    fileType: params['fileType']
  };

  response = await ctx.runAction(api.konverseActions.UpdateFileMetaData, file);

  return new Response(JSON.stringify({ id: response }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
});
*/

/*export const AddFileUpload = httpAction(async(ctx, request) => {
  let response;
  if (await request.blob()) {
      const storageId = await ctx.storage.store(await request.blob() as Blob);
      const storageURL = `${ await ctx.storage.getUrl(storageId) }`;

      const savedFile = await ctx.runQuery(api.konverseQueries.getFile, )

      const file = {
        created_by:  'kephothosolutions@gmail.com',
        filename: data.get('filename'),
        file: storageURL,
        context: data.get('context'),
        type: data.get('type')
      }

      console.log(file)

      response = await ctx.runAction(api.konverseActions.NewFileUpload, file)

      

    } else {

      response = "No file uploaded"
    }




      response = await ctx.runAction(api.konverseActions.NewFileUpload, file);

  return new Response(JSON.stringify({id: response }), {
    headers: new Headers({
        'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Digest',
        'Access-Control-Max-Age': '86400',
        Vary: 'origin',
      }),
    status: 200,
  });
});
  
*/
  


  /*await request.formData()
  .then(async(data: any) => {
    console.log(data);
    if (data.get('file')) {
      const storageId = await ctx.storage.store(data.get('file') as Blob);
      const storageURL = `${ await ctx.storage.getUrl(storageId) }`;

      const file = {
        created_by:  'kephothosolutions@gmail.com',
        filename: data.get('filename'),
        file: storageURL,
        context: data.get('context'),
        type: data.get('type')
      }

      console.log(file)

      response = await ctx.runAction(api.konverseActions.NewFileUpload, file)

      

    } else {

      response = "No file uploaded"
    }
  })
  .catch((err) => {
    console.log(err.message);
    response = `${ err }`;
  });
  */



  export const GetFileEmbeddings = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());

  const response = await ctx.runQuery(api.konverseQueries.GetFileEmbeddings, { id: params['id'] });

  

  return new Response(JSON.stringify(response), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
});



export const DeleteFile = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const fileEmbeddings = await ctx.runQuery(api.konverseQueries.GetFileEmbeddingsByFileID, { fileID: params['id']});
    console.log(fileEmbeddings)

    if (fileEmbeddings.length > 0) {
      await ctx.runMutation(api.konverseMutations.DeleteFileEmbeddings, { id: fileEmbeddings[0]._id });
    }

    
    await ctx.runMutation(api.konverseMutations.DeleteFile, { id: params['id']});
    await ctx.runMutation(api.konverseMutations.DeleteFileById, { storageId: params['fileStorageID'] });



    return new Response(JSON.stringify({ response: 'File Deleted Successfully' }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });    
})


export const NewPost = httpAction(async (ctx, request) => {
  let response;
  const params = JSON.parse(await request.text());
  const post = {
    createdBy: params['createdBy'],
    title: params['title'],
    postThumbnailURL: params['postThumbnailURL'],
    postThumbnailID: params['postThumbnailID'],
    content: params['content'],
    intro: await ctx.runAction(api.konverseAIActions.GenerateIntro, { content: params['content']}),
    summary: await ctx.runAction(api.konverseAIActions.SummarizeContent, { content: params['content']}),
    embeddings: await(ctx.runAction(api.konverseAIActions.GenerateEmbeddings, { content: params['content']}))
  };

  response = await ctx.runMutation(api.konverseMutations.NewPost, post);

  return new Response(JSON.stringify({ id: response }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
});

export const UpdatePost = httpAction(async (ctx, request) => {
  let response;
  const params = JSON.parse(await request.text());
  const post = {
    id: params['id'],
    createdBy: params['createdBy'],
    title: params['title'],
    postThumbnailURL: params['postThumbnailURL'],
    postThumbnailID: params['postThumbnailID'],
    content: params['content'],
    intro: await ctx.runAction(api.konverseAIActions.GenerateIntro, { content: params['content']}),
    summary: await ctx.runAction(api.konverseAIActions.SummarizeContent, { content: params['content']}),
    embeddings: await(ctx.runAction(api.konverseAIActions.GenerateEmbeddings, { content: params['content']}))
  };

  response = await ctx.runMutation(api.konverseMutations.UpdatePost, post);

  return new Response(JSON.stringify({ id: response }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
});

/*
export const UpdateFileMetaData = httpAction(async (ctx, request) => {
  let response;
  const params = JSON.parse(await request.text());
  const file = {
    createdBy: params['createdBy'],
    id: params['id'],
    fileURL: params['fileURL'],
    fileID: params['fileID'],
    filename: params['filename'],
    aboutFile: params['aboutFile'],
    fileType: params['fileType']
  };

  response = await ctx.runAction(api.konverseActions.UpdateFileMetaData, file);

  return new Response(JSON.stringify({ id: response }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
});

*/

export const GetPosts = httpAction(async (ctx, request) => {
 
  const response = await ctx.runQuery(api.konverseQueries.GetPosts);

  return new Response(JSON.stringify(response), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
});

export const GetPostsByUser = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());
 
  const response = await ctx.runQuery(api.konverseQueries.GetPostsByUser, { createdBy: params['createdBy']});

  return new Response(JSON.stringify(response), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
});

export const GetSimilarPosts = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());
 
  const embeddings = await ctx.runAction(api.konverseAIActions.GenerateEmbeddings, { content: params['query']});
  const response = await ctx.runQuery(api.konverseQueries.GetSimilarPosts, { embeddings: embeddings });

  return new Response(JSON.stringify(response), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
});


export const GetPost = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());
  const response = await ctx.runQuery(api.konverseQueries.GetPost, { id: params['id']});

  return new Response(JSON.stringify(response), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
});


export const FilesQueryEmbeddings = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());
  const response =  await ctx.runAction(api.konverseAIActions.FilesQueryEmbeddings, params);

  return new Response(JSON.stringify(response), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
});

export const BlogQueryEmbeddings = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());
  const response =  await ctx.runAction(api.konverseAIActions.BlogQueryEmbeddings, params);

  return new Response(JSON.stringify(response), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Digest',
      'Access-Control-Max-Age': '86400',
      Vary: 'origin',
    }),
    status: 200,
  });
});
