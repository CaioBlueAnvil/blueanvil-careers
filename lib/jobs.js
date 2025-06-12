// lib/jobs.js

export async function fetchJobs() {
  const sheetId = process.env.SHEET_ID;
  if (!sheetId) {
    throw new Error("Missing SHEET_ID in environment");
  }

  const range = "Sheet1"; // or your actual tab name
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${process.env.GOOGLE_API_KEY}`;

  // Optional: debug logs
  // console.log("🔎 Fetching BlueAnvil URL:", url);

  const response = await fetch(url);
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Sheets API error (${response.status}): ${errText}`);
  }
  const json = await response.json();

  // Ensure we got values
  const [headers, ...rows] = json.values || [];
  if (!headers) {
    return [];
  }

  // Build job objects with no undefined values
  const jobs = rows.map((row) => {
    // For each header, pick row[i] if defined, else empty string
    const job = Object.fromEntries(
      headers.map((header, i) => [header, row[i] !== undefined ? row[i] : ""])
    );

    // Generate slug
    job.slug = job["Job Name"]
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return job;
  });

  return jobs;
}

