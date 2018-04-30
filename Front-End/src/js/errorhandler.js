function getErrorMessage(errorCode) {
  switch(errorCode) {
    case 'GLIST01':
      return 'Please provide an ID in the URL.';
      break;
  case 'GLIST02':
      return 'Please provide an ID in the URL.';
      break;
    case 'GLIST04':
        return 'Value is not in [asc/desc].';
        break;
    case 'server_down':
      return 'sorry server is down';
      break;
  }

  return 'Unknown error.';
}

function displayError(message){
    alertify.alert('Error', message).set('modal', false);
}

function displayErrorByCode(errorCode) {
    displayError(getErrorMessage(errorCode));
}

// function handleError(serverResult, successMethod) {
//     if (serverResult.code) {
//         displayErrorByCode(serverResult.code);
//     } else {
//         successMethod(serverResult);
//     }
// }