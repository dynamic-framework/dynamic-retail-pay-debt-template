export default function getAccountIdQueryString() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('account_id');
}
