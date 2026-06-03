import { siteConfig } from '@/config/site';
import Script from 'next/script';

export function Analytics() {
  const { scriptUrl, websiteId, baiduId } = siteConfig.analytics;

  return (
    <>
      {scriptUrl && websiteId && (
        <Script
          src={scriptUrl}
          data-website-id={websiteId}
          strategy='afterInteractive'
          defer
        />
      )}
      {baiduId && (
        <Script id='baidu-analytics' strategy='afterInteractive'>
          {`var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.src="https://hm.baidu.com/hm.js?${baiduId}";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();`}
        </Script>
      )}
    </>
  );
}
