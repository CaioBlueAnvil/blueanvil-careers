// src/pages/careers/index.js

import Link from "next/link";
import { fetchJobs } from "../../../lib/jobs";

export default function Careers({ jobs }) {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Careers at Blue Anvil</h1>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {jobs.map((job) => (
          <li key={job.slug} style={{ marginBottom: "1rem" }}>
            <Link href={`/careers/${job.slug}`}
               style={{ fontSize: "1.1rem", color: "#0070f3", textDecoration: "none" }}>
                {job["Job Name"]} &mdash; {job["Location"]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const jobs = await fetchJobs();
  return { props: { jobs }, revalidate: 60 };
}

