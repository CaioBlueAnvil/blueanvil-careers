// src/components/Layout.js
import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Blue Anvil Careers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="https://blueanvil.com" className={styles.logo}>
            <img src="/logo-blueanvil.svg" alt="Blue Anvil" />
          </Link>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
            <Link href="/careers" className={styles.navLinkActive}>
              Careers
            </Link>
          </nav>
        </div>
      </header>

 <main className={styles.main}>
   <div className={styles.container}>{children}</div>
 </main>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; {new Date().getFullYear()} Blue Anvil. All rights reserved.</p>
          <p>
            <a href="https://blueanvil.com/privacy" className={styles.footerLink}>
              Privacy Policy
            </a>
            {" | "}
            <a href="https://blueanvil.com/terms" className={styles.footerLink}>
              Terms of Use
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

