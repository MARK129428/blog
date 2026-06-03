import { siteConfig } from '@/config/site';
import Script from 'next/script';

export function Analytics() {
  const { scriptUrl, websiteId } = siteConfig.analytics;
  if (!scriptUrl || !websiteId) return null;

  return (
    <Script
      src={scriptUrl}
      data-website-id={websiteId}
      strategy='afterInteractive'
      defer
    />
  );
}
