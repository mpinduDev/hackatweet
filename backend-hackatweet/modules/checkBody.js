function checkBody(body, fields) {
  for (const field of fields) {
    if (typeof body[field] !== 'string' || body[field].trim() === '') {
      return false;
    }
  }
  return true;
}

module.exports = { checkBody };
