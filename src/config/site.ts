export const siteConfig = {
  title: "Gemini的博客",
  description: "Gemini的技术博客，记录学习和生活的点滴。",
  author: "Gemini",
  social: {
    github: "https://github.com/MARK129428",
    email: "mark129428@gmail.com",
    qq: "1544832671",
  },
  /**
   * Giscus 评论配置
   * 1. 仓库需要是公开的，且开启 Discussions 功能
   * 2. 安装 Giscus App: https://github.com/apps/giscus
   * 3. 访问 https://giscus.app 填入仓库名，获取 repoId 和 categoryId
   */
  giscus: {
    repo: "MARK129428/blog" as string,
    repoId: "R_kgDOQWTaEg" as string,
    category: "General" as string,
    categoryId: "DIC_kwDOQWTaEs4C-ZIn" as string,
  },
  /**
   * 网站分析
   * scriptUrl: Umami / Plausible 等分析服务地址
   * websiteId: 网站 ID
   * baiduId: 百度统计 ID (https://tongji.baidu.com)，留空不加载
   */
  analytics: {
    scriptUrl: "https://cloud.umami.is/script.js" as string,
    websiteId: "" as string,
    baiduId: "" as string,
  },
} as const;
