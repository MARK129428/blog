export interface MenuItem {
  title: string;
  img: string;
  url: string;
}

export interface MenuGroup {
  label: string;
  items: MenuItem[];
}

const devicon = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;

const menuGroups: MenuGroup[] = [
  {
    label: '前端',
    items: [
      { title: 'JS', img: devicon('javascript'), url: '/js' },
      { title: 'TS', img: devicon('typescript'), url: '/ts' },
      { title: 'React', img: devicon('react'), url: '/react' },
      { title: 'Next', img: devicon('nextjs'), url: '/next' },
      { title: 'Nest', img: devicon('nestjs'), url: '/nest' },
      {
        title: 'Taro',
        img: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22%3E%3Crect fill=%22%236366f1%22 width=%2240%22 height=%2240%22 rx=%228%22/%3E%3Ctext fill=%22white%22 x=%2220%22 y=%2227%22 text-anchor=%22middle%22 font-size=%2218%22 font-weight=%22bold%22%3ETa%3C/text%3E%3C/svg%3E',
        url: '/taro',
      },
      { title: 'Webpack', img: devicon('webpack'), url: '/webpack' },
      { title: 'ReactNative', img: devicon('react'), url: '/reactnative' },
      { title: 'Vite', img: 'https://vitejs.dev/logo.svg', url: '/vite' },
      { title: 'Eslint', img: devicon('eslint'), url: '/eslint' },
      { title: 'Vitest', img: 'https://vitest.dev/logo.svg', url: '/vitest' },
      { title: 'NodeJs', img: devicon('nodejs'), url: '/nodejs' },
      {
        title: 'Microapp',
        img: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22%3E%3Crect fill=%22%2306b6d4%22 width=%2240%22 height=%2240%22 rx=%228%22/%3E%3Ctext fill=%22white%22 x=%2220%22 y=%2227%22 text-anchor=%22middle%22 font-size=%2216%22 font-weight=%22bold%22%3EMi%3C/text%3E%3C/svg%3E',
        url: '/microapp',
      },
      { title: 'Threejs', img: devicon('threejs'), url: '/threejs' },
    ],
  },
  {
    label: '后端',
    items: [
      { title: 'Java', img: devicon('java'), url: '/java' },
      { title: 'SpringBoot', img: devicon('spring'), url: '/springboot' },
      {
        title: 'Mybatis-plus',
        img: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22%3E%3Crect fill=%22%23dc2626%22 width=%2240%22 height=%2240%22 rx=%228%22/%3E%3Ctext fill=%22white%22 x=%2220%22 y=%2227%22 text-anchor=%22middle%22 font-size=%2216%22 font-weight=%22bold%22%3EMP%3C/text%3E%3C/svg%3E',
        url: '/mybatisplus',
      },
      { title: 'Redis', img: devicon('redis'), url: '/redis' },
      { title: 'Mysql', img: devicon('mysql'), url: '/mysql' },
      { title: 'SpringCloud', img: devicon('spring'), url: '/springcloud' },
      { title: 'Nginx', img: devicon('nginx'), url: '/nginx' },
      { title: 'ElasticSearch', img: 'https://avatars.githubusercontent.com/u/6764390?s=48&v=4', url: '/elasticsearch' },
      { title: 'RabbitMQ', img: devicon('rabbitmq'), url: '/rabbitmq' },
      { title: 'Kibana', img: devicon('kibana'), url: '/kibana' },
      { title: 'Docker', img: devicon('docker'), url: '/docker' },
      { title: 'Kubernetes', img: devicon('kubernetes'), url: '/kubernetes' },
      { title: 'Jenkins', img: devicon('jenkins'), url: '/jenkins' },
    ],
  },
];

export default menuGroups;
