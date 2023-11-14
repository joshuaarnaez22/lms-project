const url =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
export const courseApi = `${url}/api/courses`;
