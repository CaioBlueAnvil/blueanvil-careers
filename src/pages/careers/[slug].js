// src/pages/careers/[slug].js

import { fetchJobs } from "../../../lib/jobs";

export default function JobDetail({ job }) {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>{job["Job Name"]}</h1>
      <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
        Location: {job["Location"]}
      </p>
      <section
        className="description"
        dangerouslySetInnerHTML={{ __html: job["Description"] }}
        style={{ marginBottom: "2rem", lineHeight: "1.6" }}
      />
      <a
        href={job["Form URL"]}
        style={{
          display: "inline-block",
          backgroundColor: "#0070f3",
          color: "#ffffff",
          padding: "0.75rem 1.25rem",
          borderRadius: "4px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Apply Online
      </a>
    </div>
  );
}

export async function getStaticPaths() {
  const jobs = await fetchJobs();
  const paths = jobs.map((j) => ({
    params: { slug: j.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const jobs = await fetchJobs();
  const job = jobs.find((j) => j.slug === params.slug);

  if (!job) {
    return { notFound: true };
  }

  return { props: { job } };
}

