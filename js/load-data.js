const URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SENT_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const errorText = {
  [Method.GET]: 'Не удалось загрузить данные с сервера!',
  [Method.POST]: 'Не удалось загрузить данные на сервер!'
};

const loadData = async (route, method = Method.GET, body = null) => {

  const response = await fetch(`${URL}${route}`, {method, body});
  return response.ok ? await response.json() : Promise.reject(errorText[method], response.status);
};

const getData = async () => await loadData(Route.GET_DATA, Method.GET);
const sendData = async (body) => await loadData(Route.SENT_DATA, Method.POST, body);

export { getData, sendData };

