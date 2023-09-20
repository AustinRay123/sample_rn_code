import * as AsyncStore from '../asyncstorage';
import axios from 'axios';
import {EventRegister} from 'react-native-event-listeners';

let isForceLogout = true;
export const client = async (
  authToken,
  endpoint,
  methodType,
  body,
  customConfig,
  isValidate,
) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };

  // if (authToken) {
  //     headers['auth-token'] = authToken;
  // }
  if (authToken) {
    headers['Authorization'] = 'Bearer ' + authToken;
  }

  console.log('authToken:------', authToken);

  const config = {
    method: methodType,
    headers: {
      ...headers,
      ...customConfig,
    },
  };

  if (body) {
    config.body = body;
  }

  return new Promise(async (resolve, reject) => {
    const response = await axios({
      method: config.method,
      url: endpoint,
      data: config?.body,
      Accept: 'application/json',
      // headers: { "Content-Type": "application/json; charset=UTF-8" },
      headers: config.headers,
      // params: {
      //   page: params,
      // },
    })
      .then(async result => {
        // return result;
        if (result.data.code == 401) {
          if (isForceLogout) {
            EventRegister.emit('logout', result?.data);
            isForceLogout = false;
          }
          // todo will manage logout once logout api integrated
          return;
        }
        resolve(result);
      })
      .catch(err => {
        reject(err);
         return err;
      });
  });
};

client.get = async function (endpoint, customConfig = {}, isValidate = true) {
  let token = await AsyncStore.getData(AsyncStore.Keys.ACCESS_TOKEN);
  return client(token, endpoint, 'GET', null, customConfig, isValidate);
};

client.post = async function (
  endpoint,
  body,
  customConfig = {},
  isValidate = true,
) {
  let token = await AsyncStore.getData(AsyncStore.Keys.ACCESS_TOKEN);
  return client(token, endpoint, 'POST', body, customConfig, isValidate);
};

client.put = async function (
  endpoint,
  body,
  customConfig = {},
  isValidate = true,
) {
  let token = await AsyncStore.getData(AsyncStore.Keys.ACCESS_TOKEN);
  return client(token, endpoint, 'PUT', body, customConfig, isValidate);
};

client.delete = async function (
  endpoint,
  body,
  customConfig = {},
  isValidate = true,
) {
  let token = await AsyncStore.getData(AsyncStore.Keys.ACCESS_TOKEN);
  return client(token, endpoint, 'DELETE', body, customConfig, isValidate);
};
