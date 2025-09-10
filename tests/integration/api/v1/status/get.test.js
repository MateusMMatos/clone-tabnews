describe("GET /api/v1/status", () => {
  let response, body;

  beforeAll(async () => {
    response = await fetch("http://localhost:3000/api/v1/status");
    body = await response.json();
  });

  test("should return status 200", () => {
    expect(response.status).toBe(200);
  });

  test("should return update_at as valid ISO date", async () => {
    expect(body.update_at).toBeDefined();
    const parsedUpdateAt = new Date(body.update_at).toISOString();
    expect(body.update_at).toEqual(parsedUpdateAt);
  });

  test("should return the Max Connections", async () => {
    expect(body.max_connections).toBeDefined();
    expect(Number.isInteger(body.max_connections)).toBe(true);
    expect(body.max_connections).toBeGreaterThanOrEqual(100);
  });

  test("should return the server version", async () => {
    expect(body.server_version).toBeDefined();
    expect(body.server_version).toBe("16.0");
  });

  test("should return the Open Connections", async () => {
    expect(body.open_connections).toBeDefined();
    expect(Number.isInteger(body.open_connections)).toBe(true);
    expect(body.open_connections).toBe(1);
  });
});
