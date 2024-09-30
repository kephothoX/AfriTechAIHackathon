import { httpAction } from './_generated/server';
import { api, internal } from './_generated/api';


export const getVerifier = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());

  const response = await ctx.runQuery(api.usersQueries.getUserVerifier, { verifier: params['verifier'] });

  return new Response(JSON.stringify(response), {
    headers: new Headers({
       'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',   
        Vary: 'origin',
      }),

    status: 200,
  });
});


export const newUser = httpAction(async (ctx, request) => {
  const values = JSON.parse(await request.text());
  let response;

  if ((await ctx.runQuery(api.usersQueries.getUserByEmail, values)).length <= 0) {
    const user = {
      email: values.email,
      given_name: values.given_name,
      family_name: values.family_name,
      active: true,
      created_at: new Date().toISOString()
    }
    response = await ctx.runMutation(api.usersMutations.addNewUser, user);

  } else {

    const user = await ctx.runQuery(api.usersQueries.getUserByEmail, values)

    const userData: any = {
      id: user[0]._id,
      email: values.email,
      given_name: values.given_name,
      family_name: values.family_name,
      active: true,
      updated_at: new Date().toISOString()
    }
    response = await ctx.runMutation(api.usersMutations.updateUser, userData);

  }


  return new Response(JSON.stringify(response), {
    headers: new Headers({
        'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',   
        Vary: 'origin',
      }),

    status: 200,
  });
});


export const getUserByEmail = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());

  const response = await ctx.runQuery(api.usersQueries.getUser, { email: params['email'] });

  return new Response(JSON.stringify(response), {
    headers: new Headers({
       'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',   
        Vary: 'origin',
      }),

    status: 200,
  });
});

export const getUser = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());

  const response = await ctx.runQuery(api.usersQueries.getUser, { id: params['id'] });

  return new Response(JSON.stringify(response), {
    headers: new Headers({
       'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',   
        Vary: 'origin',
      }),

    status: 200,
  });
});


export const getUserSession = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());

  const response = await ctx.runQuery(api.usersQueries.getUser, { email: params['email'] });

  return new Response(JSON.stringify(response), {
    headers: new Headers({
       'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',   
        Vary: 'origin',
      }),

    status: 200,
  });
});


export const ifUserAuthenticated = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());

  const response = await ctx.runMutation(api.usersMutations.ifUserAuthenticated, { id: params['id'] });

  return new Response(JSON.stringify(response), {
    headers: new Headers({
       'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',   
        Vary: 'origin',
      }),

    status: 200,
  });
});




export const updateUser = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());
  

  const user = {
    id: params['id'],
    email: params['email'],
    phone: params['phone'],
    name: params['name'],
    image: params['image'],
    isAnonymous: true,
  }

  const response = await ctx.runMutation(api.usersMutations.updateUser, user);

  return new Response(JSON.stringify(response), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});


