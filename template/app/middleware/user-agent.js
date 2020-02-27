export default function(context) {
  // Add the userAgent property in the context (available in `asyncData` and `fetch`)
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent;
}
