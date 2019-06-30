function email(email) {
  return email.search(/.{2,}@[a-zA-Z]+\.[a-zA-Z]{2,}/g) < 0;
}

function psw(password) {
  return password.search(/^[a-zA-Z0-9]{4,}$/g) < 0;
}

function pswRepeat(password, repeatPassword) {
  return password !== repeatPassword;
}

function isEmpty(...str) {
  let result = false;

  for (string of str) {
    if (typeof string !== "string") {
      // if coming data is not string
      result = true;
      break;
    }

    if (string.trim().length === 0) {
      // if string is empty
      result = true;
      break;
    }
  }

  return result;
}

module.exports = {
  email,
  psw,
  pswRepeat,
  isEmpty
};
