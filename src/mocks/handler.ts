import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };
    if (email === "admin@example.com" && password === "admin123") {
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

  // UNIVERSITIES
  http.get("/api/universities", () =>
    HttpResponse.json([
      {
        id: "u1",
        name: "Oxford University",
        city: "Oxford",
        district: "Oxfordshire",
        establishedYear: 1096,
        studentCount: 24000,
        corpora: [
          { id: 1, name: "Corpus Christi" },
          { id: 2, name: "Magdalen College" },
        ],
      },
      {
        id: "u2",
        name: "Harvard University",
        city: "Cambridge",
        district: "Massachusetts",
        establishedYear: 1636,
        studentCount: 21000,
        corpora: [{ id: 1, name: "Harvard Yard" }],
      },
    ])
  ),

  // SCHOOLS
  http.get("/api/schools", () =>
    HttpResponse.json([
      {
        id: "s1",
        name: "Sunrise School",
        city: "London",
        district: "Westminster",
        type: "primary",
        establishedYear: 1980,
        studentCount: 500,
      },
      {
        id: "s2",
        name: "Greenwood School",
        city: "Bristol",
        district: "North Bristol",
        type: "secondary",
        establishedYear: 1992,
        studentCount: 430,
      },
    ])
  ),

  // HIGH SCHOOLS
  http.get("/api/high-schools", () =>
    HttpResponse.json([
      {
        id: "hs1",
        name: "Lincoln High School",
        city: "New York",
        district: "Manhattan",
        specialization: "science",
        hasDormitory: true,
        establishedYear: 1975,
        studentCount: 1200,
      },
      {
        id: "hs2",
        name: "Jefferson High School",
        city: "New York",
        district: "Brooklyn",
        specialization: "math",
        hasDormitory: false,
        establishedYear: 1985,
        studentCount: 950,
      },
    ])
  ),
];
