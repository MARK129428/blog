// 定义每个菜单项
export interface MenuItem {
  title: string; // 技术名称
  img: string; // logo 链接
  url: string; // 跳转链接
}

// 定义每个菜单分组
export interface MenuGroup {
  label: string; // 分组名称，例如 "前端" 或 "后端"
  items: MenuItem[]; // 该分组下的菜单项
}

// 菜单数组
export const menuGroups: MenuGroup[] = [
  {
    label: '前端',
    items: [
      {
        title: 'JS',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        url: '/js',
      },
      {
        title: 'TS',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        url: '/ts',
      },
      {
        title: 'React',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        url: '/react',
      },
      {
        title: 'Next',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
        url: '/next',
      },
      {
        title: 'Nest',
        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAANlBMVEVHcEzgI07gI07gI07gI07gI07gI07gI07gI07gI07gI07gI07gI07gI07gI07gI07gI07gI04MRxOkAAAAEnRSTlMA9GdXHbN6/0ieBuA5jcIT0C5JiDMVAAAAuElEQVR4AWIgCTAC6qALIwZiIAiCKxzRU/7JuvyMXSwdW+f1JURI+pABii5cMEDNrQOIOimVi3D+M1xlWS185K6JqL/KQy8Lg6TEQ5YDwsss1GhH/ob/Lx/mrgNjtLHnbtRf01/J3OgscVV05rgYdNG/ld0aT5wYbcBLQzOE5/UTSC5gaNsXSasBTAcQPItktMvb4pGZKUk7u12Mv4zTRXPTtkyXR72INkGW0asGTrHoTTZRX6ZBZz8K+QvOS9frRQAAAABJRU5ErkJggg==',
        url: '/nest',
      },
      {
        title: 'Taro',
        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAn1BMVEX///+54/9kxf9qx/+u3/94hdAUNbggPLoMMbiQm9h3zf90yv/g8//2+P0AAK8AJLPS1ezz+/+/xecACrAAKLQCLLcAPMvE2/+n1v+W1/8AGrIQZugWg/8Ad/8Acf9atv/G6P8Vfv8Aef/j5/Y1k/970f+hqt4JVdgwj/9Hof91uP/P7P+Ci9CJjc4Adf+0z//s9P8qh/+GtP9bnf+jxf/b5xysAAAAp0lEQVR4AdXOxQHEMAxEUS0zQ5iZsf/WQuPc3EDe9duSaOFW681ovSXY7Q9wPBGdL5PNFe12fzD3J73WFyB4f77w+wuCyJo0T5XRHoqq6QabahL8HixalmWfWXyhOfcvHFXLcr3z+TIceybw7zIEQwyjKIoT07zOMYVMtQa2nRfEYVsTveQ0IUesiKPGT7vmxQofc4HTSh1RI45Cw9SGFxs9H+ktLVQPl7MWmhPXfpIAAAAASUVORK5CYII=',
        url: '/taro',
      },
      {
        title: 'Webpack',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg',
        url: '/webpack',
      },
      {
        title: 'ReactNative',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        url: '/reactnative',
      },
      { title: 'Vite', img: 'https://vitejs.dev/logo.svg', url: '#' },
      {
        title: 'Eslint',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg',
        url: '/eslint',
      },
      { title: 'Vitest', img: 'https://vitest.dev/logo.svg', url: '/vitest' },
      {
        title: 'NodeJs',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        url: '/nodejs',
      },
      {
        title: 'Microapp',
        img: 'https://jd-opensource.github.io/micro-app/media/logo.png',
        url: '/microapp',
      },
      {
        title: 'Threejs',
        img: 'data:image/png;base64,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',
        url: '/threejs',
      },
    ],
  },
  {
    label: '后端',
    items: [
      {
        title: 'Java',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
        url: '/java',
      },
      {
        title: 'SpringBoot',
        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAclBMVEVHcExzuhpzuhh2vB14vR93vB13vB9suBF2vBp3vBx2vB54vB1rtxR0uRt1uwSo03psuADX68Ht9uNyug222ZH////2+/F+wCt1uxdsuADF4aiPx0/F4aSAwDSi0HTf7s////6czWb5/PaJxT6u1Ynm89ZqpjpNAAAAJnRSTlMAOX665vT/Wc7ebAQnFova/d3u/+L/8aP/8ePl1+/w7fnc+cDvWGpsffIAAAE0SURBVHgBZZNVYsQgEEBjTLzBhoV40u39r1iIy/tjXoQx78APwohAFAa+9yRO4CDNchspdlWGcCMpbChfnU/gSfxTFauDN5Tx2LmSvJ2QqD5Ohi+lTY2Ilbvn0wjacLS0NqfkiGotBDVdP4zo4PFxG6G7ZpL1MHDcmAMv2P+yBg8z4vxZryOaGe8wxHHyUvdeMz4cXyWxjnB8UHEreyeFfLkWlzcjADo8XLv8Zv51F6L3P47SKHTy41IxN6cas15hCFwRKL+o2kTbcbLlS88LjUp2tFHrYUhs4TMAwp1hsjHU1OPqFFn6mbjiVSml1DS7wsGEnqPQTdvZuvetWtWshkmTcps8hrWImq9Dym/fRFTDMaB/rNGgxYbWAGR1C0UCN8LSu5BnKRwkyz1v2q0DkNs6/ANK2Ck1u+n5mgAAAABJRU5ErkJggg==',
        url: '/springboot',
      },
      {
        title: 'Mybatis-plus',
        img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3NzI3Nzc3Nzc3Nzc3MzczNzc3Nzc3Nzc3Nzc3NDY3Nzc3NzA1N//AABEIABsAIAMBEQACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAFBgcIBP/EACcQAAIBAwMEAgIDAAAAAAAAAAECAwQFEQAGIQcSMUFRYROyNHFy/8QAGQEAAgMBAAAAAAAAAAAAAAAAAQIAAwQF/8QAKREAAQMCAwYHAAAAAAAAAAAAAQACAxEhBBJRBWFxobHhEzFDgZHw8f/aAAwDAQACEQMRAD8AtNYtUyxtRyIrpICyv4kXwVzgkec5HsDVkZYCc47JHh9spSpcLwr09TdrLdaWrVCq1EdI3c0YBxkgsRxnkdoOPjGt+D8GZwhcNaV/AeaxYoywgyg6V+1I5LlvHUiOlq2httrlq41ODO79it/kAEkfZxrK/B4lvmw9ei1MxWGd6g+Uc2nuyl3GskawvTVcQzJC5zx8g+/I9A8/1ql0UjRVzSOIVgkjJo1wPAob1Pi3NHaIrjtKtniqKRiZ6eJFczRkckKynLLgED2C3k4GkTLPtKY6mteuk/lSu0jSrhT3MSSQBwPJ4GBoVIuFZQGxTLRX6alkKTKkp7SveVGcEY8HjPPnjXWh2u8ANlFd4se/JcqXZLCS6I03G47Jv2RXTXTdsMtAWjlEQ/IJADGkSKqEKByAeDjOO4k8ZOqJcRC4SZc1Xa0teuvsro8PMzJmy0bpW9uFkH6s7/3dR3CayNRGy0rEhZon73qk+VkwMA8cABh4J9awrWphSTlMdpxoJwURiqPLO32SToJgrx0k23Na7ZJdK+Jo6qtAEcbjDRxDkZHosecfAHvOiErjWydLnbKC70jUlzo4KunbkxzIGGfnn396KRZ76o7Ys+3a3ss9IadcgY/M7/sTqIhPnSfadiloUus1vjlrIyCjyszhT5yFJ7c8ecZGopVVPUQX/9k=',
        url: '/mybatisplus',
      },
      {
        title: 'Redis',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
        url: '/redis',
      },
      {
        title: 'Mysql',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        url: '/mysql',
      },
      {
        title: 'SpringCloud',
        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAALVBMVEVtsz9HcExtsz9tsz9tsz9tsz9tsz9tsz9tsz9tsz9tsz9tsz9tsz9tsz9tsz9hbePXAAAAD3RSTlP/ADnVlKUUt2x+J+lOxlxUdnreAAABAklEQVQokY2S25LEIAhEWwERUf//c8eM0Vxqa2r7JZFTEboJwg/hvzCZiHD8CxbClNeQyhMaLrHwA2bcVfUO04PlwGnDKKS+EY2GsS+4695EbM7CJ1xI0vYUA+QL9WR2+RufEXzANQpdrNsB0QKWh75ZPeY4SmXDnVpGOmHesO4Qy8oro956RnPolUnGduLtsFNmV8yeoZ9ORqXlbGbi664xmczXhpdmfPVdPqR7KyW+dW6lz0iXz5rKmXFMMKLMlU2MC3MygmbufYzmFRGRVMDkKu6Dd1WFaINWVEMbsJALuydm0jagfGF0HhdTUeVMSOM4npwbtxaPacveRw0P/fzjP9DSB8/Vm+q1AAAAAElFTkSuQmCC',
        url: '/springcloud',
      },
      {
        title: 'Nginx',
        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAV1BMVEVHcEwNl0cNl0gOl0gMlkYOmEcNl0gNl0gOl0gNl0gNl0gOl0gOl0gHlkYAlUMmnlU1pGHr9/H////K6NdKrnN3wJNTs3qn0bW73skAkTjP6dmBxZxwuottpFM/AAAADXRSTlMAWeAUQbn/j/KC2MCzV8aAaAAAAMFJREFUeAGF0wUSgDAMBECkBK0Fl/9/EwkuGW68W2/jXON6nut8xhcBzAnEh4kwAkoUPtmPEziSxP7V3BRuSd2DRBbBI1EmiPyQSCq5gZTENLcAijZ6U6OBInaUxmJeKABQJVojb6gqRMzNrKpGpF4PxAYkj1i3HDYdYtkyWBcWbdUy2FazGg7bHrFrGIRlTuRQ6oZHUCYnfF6fHZYmWXRotbwiXTxQpL5c/PFkx4up48n4x/7/JvwH+/+aP5+aKYcJ/UsWvyxQz4gAAAAASUVORK5CYII=',
        url: '/nginx',
      },
      {
        title: 'ElasticSearch',
        img: 'https://avatars.githubusercontent.com/u/6764390?s=48&v=4',
        url: '/elasticsearch',
      },
      {
        title: 'RabbitMQ',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg',
        url: '/rabbitmq',
      },
      {
        title: 'Kibana',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kibana/kibana-original.svg',
        url: '/kibana',
      },
      {
        title: 'Docker',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
        url: '/docker',
      },
      {
        title: 'Kubernetes',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg',
        url: '/kubernetes',
      },
      {
        title: 'Jenkins',
        img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg',
        url: '/jenkins',
      },
    ],
  },
];

// 默认导出
export default menuGroups;
// File: src/lib/menuGroups.ts
