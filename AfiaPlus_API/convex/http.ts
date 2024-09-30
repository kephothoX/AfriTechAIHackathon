import { httpRouter } from 'convex/server';
import { httpAction } from './_generated/server';
import { 
  auth,
  signIn,
} from './auth';


import {
  getUserByEmail,
  getUser,
  updateUser,
  ifUserAuthenticated,
  getVerifier,
} from './users';


import {
  NewFileMetaData,
  UpdateFileMetaData,
  UploadFile,
  GetFiles,
  GetFile,
  DeleteFile,
  GetFileEmbeddings,
  NewPost,
  FilesQueryEmbeddings,
  BlogQueryEmbeddings,
  GetFileByFileID,
  GetPost,
  GetPosts,
  GetPostsByUser,
  UpdatePost
} from './konverse';


import {
  GenerativeAIFilesContentWithContext,
  GenerativeAIBlogContentWithContext,
  GenerativeAIContent,
  GenerativeAISummary,
  StripHTML
} from './konverseAI';

const http = httpRouter();

http.route({
  path: '/api/users/verifier',
  method: 'POST',
  handler: getVerifier
});

http.route({
  path: '/api/users/email',
  method: 'POST',
  handler: getUserByEmail
});

http.route({
  path: '/api/user',
  method: 'POST',
  handler: getUser
});

http.route({
  path: '/api/users/update',
  method: 'POST',
  handler: updateUser
});

http.route({
  path: '/api/users/auth',
  method: 'POST',
  handler: ifUserAuthenticated
});


http.route({
  path: '/api/files/vector/search',
  method: 'POST',
  handler: FilesQueryEmbeddings
});

http.route({
  path: '/api/blog/vector/search',
  method: 'POST',
  handler: BlogQueryEmbeddings
});


http.route({
  path: '/api/blog/new',
  method: 'POST',
  handler: NewPost
});

http.route({
  path: '/api/blog/update',
  method: 'POST',
  handler: UpdatePost
});

http.route({
  path: '/api/files/embeddings',
  method: 'POST',
  handler: GetFileEmbeddings
});

http.route({
  path: '/api/files/upload',
  method: 'POST',
  handler: UploadFile
});

http.route({
  path: '/api/files/metadata/new',
  method: 'POST',
  handler: NewFileMetaData
});

http.route({
  path: '/api/files/metadata/update',
  method: 'POST',
  handler: UpdateFileMetaData
});

http.route({
  path: '/api/files',
  method: 'POST',
  handler: GetFiles
});

http.route({
  path: '/api/file',
  method: 'POST',
  handler: GetFile
});


http.route({
  path: '/api/file/id',
  method: 'POST',
  handler: GetFileByFileID
})


http.route({
  path: '/api/file/delete',
  method: 'POST',
  handler: DeleteFile
});



http.route({
  path: '/api/files/ai/chat',
  method: 'POST',
  handler: GenerativeAIFilesContentWithContext
});

http.route({
  path: '/api/blog/ai/chat',
  method: 'POST',
  handler: GenerativeAIBlogContentWithContext
});

http.route({
  path: '/api/content',
  method: 'POST',
  handler: StripHTML
});

http.route({
  path: '/api/ai/content',
  method: 'POST',
  handler: GenerativeAIContent
});

http.route({
  path: '/api/ai/summarize',
  method: 'POST',
  handler: GenerativeAISummary
});



http.route({
  path: '/api/blog',
  method: 'GET',
  handler: GetPosts
});

http.route({
  path: '/api/blog/user',
  method: 'POST',
  handler: GetPostsByUser
});


http.route({
  path: '/api/blog',
  method: 'POST',
  handler: GetPost
});


auth.addHttpRoutes(http);

http.route({
  path: '/api/auth/signin',
  method: 'POST',
  handler:  httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    return new Response(JSON.stringify( await signIn(ctx, params )), {
        headers: {
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',   
            Vary: 'origin',
        },
        status: 200,
    });
  })
});


http.route({
  path: "/api/image",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const params  = JSON.parse(await request.text())
    console.log(params);
    
    const storageId = params['id']! as Id<"_storage">;
    const blob = await ctx.storage.get(storageId);
    if (blob === null) {
      return new Response("Image not found", {
        status: 404,
      });
    }
    return new Response(blob);
  }),
});

/*
http.route({
  path: '/api/auth/signin/google',
  method: 'GET',
  handler:  httpAction(async (ctx, request) => {
    const params = await request.text();

    console.log(params);

    const response = 'Google'//await signIn(ctx, params );

    return new Response(JSON.stringify(response), {
        headers: {
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',   
            Vary: 'origin',
        },
        status: 200,
    });
  })
});
*/
/*
http.route({
	path: "/.well-known/openid-configuration",
	method: "GET",
	handler: httpAction(async () => {
		return new Response(
			JSON.stringify({
				issuer: process.env.CONVEX_SITE_URL,
				jwks_uri: process.env.CONVEX_SITE_URL + "/.well-known/jwks.json",
				authorization_endpoint:
					process.env.CONVEX_SITE_URL + "/oauth/authorize",
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control":
						"public, max-age=15, stale-while-revalidate=15, stale-if-error=86400",
				},
			},
		);
	}),
});

http.route({
	path: "/.well-known/jwks.json",
	method: "GET",
	handler: httpAction(async () => {
	  if (process.env.JWKS === undefined) {
      throw new Error("Missing JWKS Convex environment variable");
    }
		return new Response(process.env.JWKS, {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control":
					"public, max-age=15, stale-while-revalidate=15, stale-if-error=86400",
			},
		});
	}),
});
*/




// Convex expects the router to be the default export of `convex/http.js`.
export default http;

