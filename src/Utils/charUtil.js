const upperCaseFirst = (text) => {
  return text.substring(0, 1).toUpperCase() + text.substring(1, text.length);
}

export default {
  upperCaseFirst,
}
