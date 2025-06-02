// src/pages/careers/[slug].js

import Link from "next/link";
import Layout from "../../components/Layout";
import { fetchJobs } from "../../../lib/jobs";
import styles from "../../styles/Careers.module.css";

export default function JobDetail({ job }) {
  return (
    <Layout>
      <Link href="/careers" className={styles.backLink}>
        ← Back to Careers
      </Link>

      <div className={styles.jobContainer}>
        <h1 className={styles.jobDetailTitle}>{job["Job Name"]}</h1>
        <p className={styles.jobLocationItalic}>Location: {job["Location"]}</p>
        <section
          className={styles.jobDescription}
          dangerouslySetInnerHTML={{ __html: job["Description"] }}
        />
        <a href={job["Form URL"]} className={styles.applyButton}>
          Apply Online
        </a>
      </div>
    </Layout>
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

