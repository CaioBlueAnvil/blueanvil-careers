// src/components/Layout.js
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  useEffect(() => {
    const forgeBg = document.getElementById("baForgeBg");
    if (!forgeBg) return;

    // Create sparks once
    if (!forgeBg.dataset.sparks) {
      forgeBg.dataset.sparks = "1";
      for (let i = 0; i < 30; i++) {
        const spark = document.createElement("div");
        spark.className = styles.spark;
        spark.style.left = Math.random() * 100 + "%";
        spark.style.bottom = "0";
        spark.style.setProperty("--drift", (Math.random() - 0.5) * 120 + "px");
        spark.style.animationDelay = Math.random() * 3 + "s";
        forgeBg.appendChild(spark);
      }
    }

    // Subtle parallax on background
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const y = window.pageYOffset || 0;
        forgeBg.style.transform = `translateY(${y * 0.18}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* Background */}
      <div className={styles.forgeBg} id="baForgeBg" aria-hidden="true" />
      <div className={styles.emberGlow} aria-hidden="true" />

      <Head>
        <title>Blue Anvil Careers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* ===== HEADER ===== */}
      <header className={styles.headerWhite}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <img
              src="/anvil.svg"
              alt="Blue Anvil Logo"
              className={styles.logoImg}
            />
          </Link>

          <nav className={styles.nav}></nav>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className={styles.main}>{children}</main>

      {/* ===== FOOTER ===== */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; {new Date().getFullYear()} Blue Anvil. All rights reserved.</p>
          <p>
            <a href="/privacy" className={styles.footerLink}>
              Privacy Policy
            </a>
            {" | "}
            <a href="/terms" className={styles.footerLink}>
              Terms of Use
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
