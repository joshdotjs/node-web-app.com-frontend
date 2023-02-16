import { getLS } from "./local-storage";

// ==============================================

const fetchGET = async ({ url,  jwt='', }) => {
  
  console.log('fetchGET');
  console.log('url: ', url);

  console.log('jwt: ', jwt);

  const res = await fetch(url, {
    headers: { 
      "Content-Type": 'application/json',
      Authorization: jwt
    },
  });
  const data = await res.json();
  return data;
};

// ==============================================

const fetchGET2 = async ({ url,  token='', }) => {
  
  // console.log('fetchGET2');
  // console.log('url: ', url);
  // console.log('token: ', token);

  try {

    const res = await fetch(url, {
      headers: { 
        "Content-Type": 'application/json',
        Authorization: token
      },
    });

    // -Get status off of response
    // -My API sends status code 401 for auth failure
    // -If status 401, then we want to notify the user via <Notification />.
    const status = res.status;
    
    // -Get message from data:
    const data = await res.json();
    
    // -My API's success status is 201 for auth protected endpoints.
    if (!res.ok) { // Not in 200 range
      return [null, data.message];
    }
    
    // status in 200 range (My API set's status to 201, but shows up as 200)
    return [data, null];

  } catch (e) {
    // NOTE: Not positive this catch is working with async code above.
    //  -fetchGET3 below definetely works with catching as expectd.
    //  -For now I will only handle the error case where the token auth failed.
    //  -So assume this is not hit for now and if auth token failed
    //   then the if statement in the try{} block already handled 
    //   the error with a return statement.
    console.error(e);
    return [null, e];
  }
};

// ==============================================

const fetchGET3 = ({url, token}) => {

  //  -Same as fetchGET2, but using .then() methods.
  //  -fetchGET2 is not catching the error...

  fetch(url, {
    headers: { 
      "Content-Type": 'application/json',
      Authorization: token
    },
  })
  .then((response) => {
    if (!response.ok) {
      console.log('response: ', response);
      throw new Error('Network response was not OK');
    }
    return response.json();
  })
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
  });

};

// ==============================================

const fetchPOST = async ({ url, body={}, jwt='', method='POST' }) => {
  
  console.log('url: ', url);

  console.log('jwt: ', jwt);

  const res = await fetch(
    url, {
      method,
      headers: { 
        "Content-Type": 'application/json',
        Authorization: jwt
      },
      body: JSON.stringify(body)
  });
  const data = await res.json();
  return data;
};

// ==============================================

const fetchPOST2 = async ({url, body={}, method='POST', response_type='json', token}) => {

  console.log('url: ', url);
  console.log('method: ', method);
  console.log('body: ', body);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", token); // NEW
  
  const options = {
    method,
    headers: myHeaders,
    body: JSON.stringify(body),
    // redirect: 'follow'
  };
  
  try {

    const resp = await fetch(url, options);

    if (!resp.ok) {
      throw new Error('Response status not in 200 range');
    }

    let data;
    if (response_type === 'text') {
      data = await resp.text();
    } 
    else if (response_type === 'json') {
      data = await resp.json();
    }
    else { 
      throw new Error('invalid response type');
    }

    // console.log(data);
    return [data, null];
  } catch(e) {
    console.error('error: ', e);
    return [null, e];
  }
};

// ==============================================

const authFetch = async ({ url, body={}, method='GET'}) => {
  
  console.log('authFetch');

  // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/orders`;
  // const url = `${API_URL_LARAVEL}/api/products`;
  const url_full = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  // const url_full = `${API_URL_LARAVEL}${url}`;

  const token = getLS('token'); // null if not found
  console.log('token: ', token);

  if (method === 'GET') {
    return await fetchGET2({ url: url_full, token });
  } else {
    return await fetchPOST2({ url: url_full, token, body, method });
  }

};

// ==============================================

export { fetchGET, fetchPOST, fetchGET2, fetchPOST2, authFetch };