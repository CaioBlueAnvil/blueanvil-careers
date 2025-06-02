// lib/jobs.js

export async function fetchJobs() {
  const sheetId = process.env.SHEET_ID;
  const apiKey = process.env.SHEET_API_KEY;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;
  const res = await fetch(url);
  const json = await res.json();

  if (!json.values) {
    throw new Error(
      "No data returned from Sheets API. " +
      "Check that your SHEET_ID, SHEET_API_KEY, and tab name (Sheet1) are correct, and that the sheet is shared publicly."
    );
  }

  const [headers, ...rows] = json.values;

  return rows.map((row) => {
    const job = Object.fromEntries(
      headers.map((h, i) => [h, row[i] || ""])
    );
job.slug = job["Job Name"]
  .toLowerCase()
  // 1) replace any sequence of non‐a–z,0–9 characters with a single “-”
  .replace(/[^a-z0-9]+/g, "-")
  // 2) trim leading/trailing hyphens
  .replace(/^-+|-+$/g, "");
    return job;
  });
}

