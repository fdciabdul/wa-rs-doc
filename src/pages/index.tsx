import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({title, description}: {title: string; description: string}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md padding-vert--lg">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <Feature
            title="Multi-Session"
            description="Manage multiple WhatsApp accounts simultaneously with separate sessions."
          />
          <Feature
            title="Built with Rust"
            description="High performance and memory safety with the Rust programming language."
          />
          <Feature
            title="REST API"
            description="Simple HTTP API with Swagger UI documentation for easy integration."
          />
        </div>
        <div className="row">
          <Feature
            title="Webhooks"
            description="Receive real-time events with HMAC-SHA256 signature verification."
          />
          <Feature
            title="JWT Auth"
            description="Secure API access with JSON Web Token authentication."
          />
          <Feature
            title="Docker Ready"
            description="Deploy easily with Docker Compose and PostgreSQL."
          />
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description="WhatsApp REST API Gateway built with Rust">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
