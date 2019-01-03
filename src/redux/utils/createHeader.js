export default function createHeader() {
  let head = {};
  head['Content-Type'] = 'application/json;';
  // head['x-auth-token'] = window.sessionStorage.getItem("token");

  return head;
}