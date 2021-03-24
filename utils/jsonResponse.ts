export const JSONResponse = (res, status, message?) => {
  let response
  switch (status) {
    case 200:
      response = message || { message: 'Success' }
      break;
    case 422:
      response = message || { message: 'Unproccessable entity' }
      break;
    case 400:
      response = message || { message: 'Bad request' }
      break;
    case 403:
      response = message || { message: 'Forbidden' }
      break;
    case 500:
      response = message || { message: 'Internal Server Error' }
      break;

    default:
      break;
  }
  res.status(status).json(response);
}