function success(data) {
  return {
    code: 200,
    success: true,
    data,
  }
}

function fail() {
  return {
    code: 400,
    success: false,
    data: '',
  }
}

module.exports = {
  success,
  fail,
}
