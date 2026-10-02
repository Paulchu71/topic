const PDF_PATH = "/quantum-gyroscope-project.pdf";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/" && url.pathname !== PDF_PATH) {
      return new Response("Not found", { status: 404 });
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" }
      });
    }

    // Serve the same PDF at both URLs, preserving Range and cache headers.
    url.pathname = PDF_PATH;
    const response = await env.ASSETS.fetch(new Request(url, request));

    if (response.status === 200 || response.status === 206) {
      const headers = new Headers(response.headers);
      headers.set("Content-Type", "application/pdf");
      headers.set(
        "Content-Disposition",
        'inline; filename="quantum-gyroscope-project.pdf"'
      );
      return new Response(request.method === "HEAD" ? null : response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    return response;
  }
};
