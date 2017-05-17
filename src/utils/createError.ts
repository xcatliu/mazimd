export default function (status, message) {
  const error = new Error(message);

  return error;
};
