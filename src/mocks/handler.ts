import { http, HttpResponse } from "msw";

export const handlers = [
  // Auth
  http.post("/api/login", async ({ request }) => {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };
    if (body.email === "admin@example.com" && body.password === "admin123") {
      return HttpResponse.json({
        token: "mock-token-123",
        email: "admin@example.com",
      });
    }
    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }),

  // Universities
  http.get("/api/universities", () =>
    HttpResponse.json([
      { id: 1, name: "Oxford University", city: "Oxford" },
      { id: 2, name: "Harvard University", city: "Cambridge" },
    ])
  ),

  // Schools
  http.get("/api/schools", () =>
    HttpResponse.json([
      { id: 1, name: "Sunrise School", students: 500 },
      { id: 2, name: "Greenwood School", students: 430 },
    ])
  ),

  // High Schools
  http.get("/api/high-schools", () =>
    HttpResponse.json([
      { id: 1, name: "Lincoln High School", grade: "A" },
      { id: 2, name: "Jefferson High School", grade: "B" },
    ])
  ),
];
