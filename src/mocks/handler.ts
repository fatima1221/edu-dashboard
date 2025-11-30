import { http, HttpResponse } from "msw";

let universities = [
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
  {
    id: "u3",
    name: "Cambridge University",
    city: "Cambridge",
    district: "Cambridgeshire",
    establishedYear: 1209,
    studentCount: 19000,
    corpora: [
      { id: 1, name: "Corpus 1" },
      { id: 2, name: "Corpus 2" },
      { id: 3, name: "Corpus 3" },
      { id: 4, name: "Corpus 4" },
    ],
  },
  {
    id: "u4",
    name: "California University",
    city: "California",
    district: "Massachusetts",
    establishedYear: 1636,
    studentCount: 21000,
    corpora: [
      { id: 1, name: "California Yard" },
      { id: 2, name: "California College" },
      { id: 3, name: "California Campus" },
    ],
  },
];

let schools = [
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
  {
    id: "s3",
    name: "Riverdale School",
    city: "Manchester",
    district: "Central Manchester",
    type: "primary",
    establishedYear: 1975,
    studentCount: 600,
  },
  {
    id: "s4",
    name: "Hilltop School",
    city: "Leeds",
    district: "West Leeds",
    type: "secondary",
    establishedYear: 1988,
    studentCount: 520,
  },
];

let highSchools = [
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
  {
    id: "hs3",
    name: "Brooklyn High School",
    city: "New York",
    district: "Brooklyn",
    specialization: "arts",
    hasDormitory: false,
    establishedYear: 1950,
    studentCount: 750,
  },
  {
    id: "hs4",
    name: "Roosevelt High School",
    city: "Chicago",
    district: "Lincoln Park",
    specialization: "science",
    hasDormitory: true,
    establishedYear: 1965,
    studentCount: 1100,
  },
];

export const handlers = [
  // LOGIN
  http.post("/api/login", async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };
    if (email === "admin@example.com" && password === "admin123") {
      return HttpResponse.json({ token: "mock-token-123", email });
    }
    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }),

  // --- UNIVERSITIES ---
  http.get("/api/universities", ({ request }) => {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());

    let result = [...universities];

    // TEXT SEARCH
    if (params.name) {
      const value = params.name.toLowerCase();
      result = result.filter((u) => u.name.toLowerCase().includes(value));
    }
    // FROM YEAR
    if (params.yearFrom) {
      result = result.filter(
        (u) => u.establishedYear >= Number(params.yearFrom)
      );
    }
    // TO YEAR
    if (params.yearTo) {
      result = result.filter((u) => u.establishedYear <= Number(params.yearTo));
    }

    return HttpResponse.json(result);
  }),

  http.delete("/api/universities/:id", ({ params }) => {
    universities = universities.filter((u) => u.id !== params.id);
    return HttpResponse.json({ success: true });
  }),

  // --- SCHOOLS ---
  http.get("/api/schools", ({ request }) => {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());

    let result = [...schools];

    // TEXT SEARCH
    if (params.search) {
      const value = params.search.toLowerCase();
      result = result.filter((s) => s.name.toLowerCase().includes(value));
    }
    // CITY
    if (params.city) {
      result = result.filter((s) =>
        s.city.toLowerCase().includes(params.city.toLowerCase())
      );
    }

    // DISTRICT
    if (params.district) {
      result = result.filter((s) =>
        s.district.toLowerCase().includes(params.district.toLowerCase())
      );
    }
    // TYPE
    if (params.type) {
      result = result.filter((s) => s.type === params.type);
    }

    // MIN STUDENTS
    if (params.minStudents) {
      result = result.filter(
        (s) => s.studentCount >= Number(params.minStudents)
      );
    }

    // MAX STUDENTS
    if (params.maxStudents) {
      result = result.filter(
        (s) => s.studentCount <= Number(params.maxStudents)
      );
    }

    return HttpResponse.json(result);
  }),

  http.delete("/api/schools/:id", ({ params }) => {
    schools = schools.filter((s) => s.id !== params.id);
    return HttpResponse.json({ success: true });
  }),

  // --- HIGH SCHOOLS ---
  http.get("/api/high-schools", ({ request }) => {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());

    let result = [...highSchools];

    // TEXT SEARCH
    if (params.search) {
      const value = params.search.toLowerCase();
      result = result.filter((hs) => hs.name.toLowerCase().includes(value));
    }

    // CITY
    if (params.city) {
      result = result.filter((hs) =>
        hs.city.toLowerCase().includes(params.city.toLowerCase())
      );
    }

    // DISTRICT
    if (params.district) {
      result = result.filter((hs) =>
        hs.district.toLowerCase().includes(params.district.toLowerCase())
      );
    }

    // SPECIALIZATION
    if (params.specialization) {
      result = result.filter(
        (hs) => hs.specialization === params.specialization
      );
    }

    // DORMITORY
    if (params.hasDormitory) {
      const val = params.hasDormitory === "true";
      result = result.filter((hs) => hs.hasDormitory === val);
    }

    return HttpResponse.json(result);
  }),
  http.delete("/api/high-schools/:id", ({ params }) => {
    highSchools = highSchools.filter((h) => h.id !== params.id);
    return HttpResponse.json({ success: true });
  }),
];
