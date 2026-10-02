export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return Response.redirect(
        `${url.origin}/quantum-gyroscope-project.pdf`,
        302
      );
    }

    if (url.pathname === "/quantum-gyroscope-project.pdf") {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  }
};
