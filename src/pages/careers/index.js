// src/pages/careers/index.js

import Link from "next/link";
import Layout from "../../components/Layout";
import { fetchJobs } from "../../../lib/jobs";
import careersStyles from "../../styles/CareersPage.module.css";
import layoutStyles from "../../components/Layout.module.css";

export default function Careers({ jobs }) {
  return (
    <Layout>
      {/* ===== 1) HERO (full‐screen cracked BG with overlay text) ===== */}
      <section className={careersStyles.hero}>
        <div className={careersStyles.heroContent}>
          <h1 className={careersStyles.heroTitle}>Blue Anvil</h1>
          <h1 className={careersStyles.heroTitle}>Careers</h1>
        </div>
      </section>

      {/* ===== 2) TAGLINE STRIP (full‐width) ===== */}
      <section className={careersStyles.taglineStrip}>
        <p className={careersStyles.taglineText}>
          Join the path to become an Elite Tradesperson
        </p>
      </section>

      {/* ===== 3) JOBS SECTION (full‐width gray) ===== */}
      <section className={careersStyles.jobsWrapper}>
        <div className={layoutStyles.container}>
          <Link href="/careers" className={careersStyles.jobsButton}>
            Our Jobs
          </Link>

          <div className={careersStyles.jobsGrid}>
            {jobs.map((job) => (
<Link
                href={`/careers/${job.slug}`}
                key={job.slug}
                className={careersStyles.jobCard}
              >
                {/* 3‐column layout: name, type, location */}
                <p className={careersStyles.jobName}>{job["Job Name"]}</p>
                <p className={careersStyles.jobType}>
                  {job["Employment Type"] || "Full Time"}
                </p>
                <p className={careersStyles.jobLocation}>
                  {job["Location"]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const jobs = await fetchJobs();
  return { props: { jobs }, revalidate: 60 };
}

