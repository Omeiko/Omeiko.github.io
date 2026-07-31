async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: options.body instanceof FormData ? undefined : { "Content-Type": "application/json" },
    ...options
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || `Request failed (${response.status})`);
  }
  return payload;
}

export const api = {
  bootstrap: () => request("/api/bootstrap"),
  saveProfile: (profile) => request("/api/profile", { method: "PUT", body: JSON.stringify(profile) }),
  getPost: (postPath) => request(`/api/post?path=${encodeURIComponent(postPath)}`),
  savePost: (post) => request("/api/post", { method: "PUT", body: JSON.stringify(post) }),
  deletePost: (postPath) => request(`/api/post?path=${encodeURIComponent(postPath)}`, { method: "DELETE" }),
  uploadAsset: (file) => {
    const form = new FormData();
    form.append("asset", file);
    return request("/api/assets", { method: "POST", body: form });
  },
  refreshScholar: () => request("/api/scholar/refresh", { method: "POST" }),
  gitStatus: () => request("/api/git-status"),
  publish: (message) => request("/api/publish", { method: "POST", body: JSON.stringify({ message }) })
};
