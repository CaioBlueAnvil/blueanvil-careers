{/* src/pages/careers/index.js (excerpt) */}
import Link from "next/link";
import Layout from "../../components/Layout";
import { fetchJobs } from "../../../lib/jobs";
import styles from "../../styles/Careers.module.css";

export default function Careers({ jobs }) {
  return (
    <Layout>
      <h1 className={styles.pageTitle}>Careers at Blue Anvil</h1>

      {/* About Section */}
      <section className={styles.aboutCard}>
        <h2>Why Choose Blue Anvil?</h2>
        <p>
          At Blue Anvil, we’re not just placing workers—we’re building elite
          tradespeople. We understand the frustrations you face on-site:
        </p>
        <ul style={{ marginLeft: "1.25rem", lineHeight: "1.6", color: "#333" }}>
          <li>
            <strong>No more layoffs:</strong> When a site slows down or wraps up,
            you won’t be sent home. Instead, we move you seamlessly to the next
            assignment—no EI, no lost benefits, no forced downtime.
          </li>
          <li>
            <strong>Real variety in work:</strong> Tired of doing the same task
            month after month? We match apprentices and seasoned tradespeople
            to projects that fit your skill level—1st Year Apprentices have
            different tasks than 4th Years or Red Seals. You’ll never be bored.
          </li>
          <li>
            <strong>Keep your benefits:</strong> Sick of losing health and
            pension coverage if you walk off a bad site? With Blue Anvil, once
            you’re enrolled, your benefits stay in effect—no waiting period,
            no resets.
          </li>
          <li>
            <strong>Personalized job matching:</strong> We take the time to know
            you and your goals. Instead of blindly applying to dozens of
            listings, let us place you at a site where you’ll thrive and grow.
          </li>
          <li>
            <strong>Clear career progression:</strong> Feel stuck at your current
            role? We invest in your training and connect you to opportunities
            that align with your ambitions—so you can move from Apprentice to
            Red Seal and beyond.
          </li>
        </ul>
        <p style={{ marginTop: "1.5rem", lineHeight: "1.6", color: "#333" }}>
          “We’re not building towers—our clients are. We’re building people, an
          elite workforce.”<br />
          <em>– Barclay Ellis, Founder</em>
        </p>
      </section>

      {/* Job Cards Grid */}
      <ul className={styles.jobGrid}>
        {jobs.map((job) => (
          <li key={job.slug} className={styles.jobCard}>
            <Link href={`/careers/${job.slug}`} className={styles.jobLink}>
              <h2 className={styles.jobTitle}>{job["Job Name"]}</h2>
              <p className={styles.jobLocation}>📍 {job["Location"]}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const jobs = await fetchJobs();
  return { props: { jobs }, revalidate: 60 };
}

