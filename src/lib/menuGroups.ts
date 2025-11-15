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
        img: 'data:image/png;base64,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',
        url: '/microapp',
      },
      {
        title: 'Threejs',
        img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEX///8AAAD8/Pz29vbu7u7y8vLi4uL39/etra3Z2dn6+vrq6uq+vr5GRkbHx8ejo6NxcXG0tLSamprV1dV8fHzNzc1aWlre3t4pKSmHh4dhYWGnp6e6uro/Pz9MTEyysrKNjY0hISEwMDA4ODhtbW0QEBAYGBiSkpIsLCxJSUlUVFRlZWUcHByBgYELCwuNT6+5AAAN5UlEQVR4nO2da1/qPAzAGVcVBOWicEQFFLzz/T/eQ5ptJG3a+ABjm7/9Xx1hB1vaXJvGWq2ioqKioqKioqKioqKioqKioqKioqKi4g8waeY9gmy5+o6ix7fLvIeRIRcRcjNv5T2UjJhEKY/DP7mU9Yiyvek18h7RyXncTezfO5nl9eA+7zGdlsVuUsNa9+GOTPJ73LvKe1yno7+b0RP+62dJZvk0aOc8slPRgOkkP7QHT2SS059+niM7GSCIk/2P9d74m8zy86H8S4mCyLgfXtOlnE3k/1kWQBA/nFcbvZstmeW/i24OQzsRHZiBqDovhy9kku+L0i4lTGPkea85f6UewdNtKd30mSuIjNHbikzy5c33bRQXEMTP8CPN5y+6lK8lc9Nb1CJ6GTAHNnoplZu+CghiwjBy2N7My+Kma4JYQ6NpuLt/owq2JBFXTxXEmZnOJN7OXCrXJVhK45rWAw+MzVS6xq7EazZa0KW8LvpSkpFL3MQTNEs5SF9uXvxjS9nrnGGoB/LDRm5j5rEFUw/b+Y69N5lRW/kxLGrw7I6cYELjb2MARbvSvaDB83ZcyKVsBiziJ7y3jHUJxFXCMl1NZksyy6cC5kGWXkH8MOY9ccxhOz/IH9F9+KTGsmgprbFPEE2c+JLq2fnupy/vp3T6P3SSn0XKg3gEsW4swtP+hdB2RngeJBr3CyKV8sg7K2uCtdpUFkQO1TyFWcqVMPLGJnKWduwXxJS3yGbz0889OymMvGkm+I+/GBZEQyqLwzFbypxTWu7IzcaNXq3n4NVt8JPMtNZfqLouWUprOeuHfMNs6dqC2EVF4TwIFjG0GOjhNfdRdWN+Q5fy7iGvlNaaC2LbDOfHfQ6Ge+H/GJPVWTfR+0kX7HL4SCb5nk92kgvivRnKQnhuLmzdPcaFNQ6Qnd5q8ZTW1/PZU1q3VBAvzSjepOec7UwxZmJqnBnJmc83pdUlKgRPTT3BRkAQja1f4d70+BCtW5bS+jpndnKZjrwfmmBAEI2sPcbCF/B+RoslW8pzSWU68p75xV5tcusRxCvj4V2nP8MsvFE1j7ii1/k5ljIZ+dz8zlvvc7Cdv92Xr8Cfo9mecFS983l5xHWGlFasQm7N7+sFHtxIgtgwE6QOUC9yHCKH9i1dyV3ElW2iGX5HE4tPggejsJ2frddaxsNjm1cPQ2pCFvYxyzwIjByD2LDoP8O3zV9qriP3Rah+UIaburA0pbXJLA/ynPwKxUy1ncWRPTw9DDEu7DtIY9cqIvjIJOJCRy3aqp8dmSHZ/9Hx8NQwBP3VDszTaO72gOZBvse9k7vp8fG9GrG+ckFEB2jhPKYJotmZ3y1mfur9MV3KU9eD7B3H5TgU5lwwmcMJSsce26AgYpKygXt8Q97geZDlKetBLiKKP2KFXTlNfgh4eOn2k0APz6gU1/x0euMNGcrdqYJnGPmaRaw/8lJu94KIE5TnERJETFLip0vmx64HWZ4m4oKParR6PGIVijDAeZ6bf6GH53GAAmEI8/AE84M09KH8T16T0fKIdff98aV8iGLbgB6e1wFaOtsvHjlPUrrmh3DPhxIIvn8DVSEtnnxg9TQQH69riQX1awJPGNKwXdgo4ubHgu2q4zYrfJlUq/GlnC5GyVLikB60XymHIW4OzzI/EulQ5r+djAx8BI9jWmIeCUxZHycYcoC68Vozmlt7gpb58YEHDL+ah58v8UviS7nZaTXYnmarhc5Va/iNWYKIHh5fWdg7S21s10x2DyVVITbWUqZ6XPGsXTuAHp69YOuwIAKPluweCKiQqe9Nnt0Flpr2duwATnBmPwd7xx9z77gyKSzvIe7/wBVERuuWpQSvNV/DtgO+HN6Fb+/ENN4d2T2Uf7q2GrF6mu/wmQvffiPzXwQXNjE/HlrfruweilcQGTRejYJnLqkPAQRc2CgkiF0pvj4U2EYb7SF+PGiYejxYagcwSSnHxLISR3wnKAcCH6akg9Iw9bnPIgBpKYkdCLqwgb2Dymnx6xlowPqEEm1x2HMNKSSI6q2KcCeYS7cfurC+dQJBXInvtD3K6WAGkXjitMfYpSc6pKveDQvmLuhSJnZAc2HB0ZGU+KVfdg8EPjHgGdUTw1vn29lb3B/bAQyuAy7sP3nvjAKyeyhBQewYV80YXmc774K5NVtKsznNMV1Nd2EfxL2D2ldxyv8vIUHEvC+G7eJ2toIRWEr4B9ZuBl1Y2DuONxVUTgcDI3e8KoSd7MOQ3oWHrBTBa+oeKC5s5AqiEl8fivhlGiy7JAwp/Qy2lIat5sK6e0dTTgfjE0Sc4H55w3bFCkZCR/+Is+tV5XQwn/LI8WSf2KWhfzvH8KVU7hXZSnygKqeDkUfuli6Mol9E3C2qXqNV4F6RMT/7csahrpwORhy5EBWYISmHRHVHHv1LyfYOXg3IqIjK+jINE3eC6L6F9UA9UaTrAS3CkOtp6N75yXKC+GXykctRwTBSHOIOxq1b8401b616GnspYZvEfmBcV3XULEI4I/eULmiC2FnCf7sjSne0oEu5supp4DWjxM1XscmwdsEeuTcqELYzAQPzL8sOdJ+99TTJ3jEPLDM90ecj9xtedzsTMC0KDpDjzE8WU2kp471j4utVtkXiTIUEShdCgoj+gQnvrTDE0LbqaWApYe88Yny9yrjelo48ZHgnfkHEuDX28Dw+BD+5X70ZhW0m+HjsDDTgV8UnX0HDewXviekZ9A8S3e/3ftr8BkNM5hMkV58VwwtRr2Ta0D9Y0B+lMAThJ/fRCTL3vyAZuWZ4oWRdyKA4DpAgiAx2cn+KxLZKPHJT7hIKe8h2tl7lqZWg0kU6vTH2V1HK5E/ExAiD8SyChvcq3c4EdICYf6B6PwCem54o76sB+n1tPAvF8H64gihlHka/UB8nzvtqJImzqRI7uIKIxYaWA2TWOvxR3sr5jIhvvbxohhe2M2upgUk1R+Y+NEG8ZOblDMTtsdQIu2NZxIE8QVUQUfueMLGt0op36fZVuabN7xygfyBYyElYEL2nbhlCjgiD5cmstw3ubfFpeMP7XYUOpTJjEVH817RpSw38P3JaVFC6Kah9T5zYVoGRr4b6NW1ykx8vqnkcII/3A4QPpTLDqBC4NMBu3I/dSvPHRBCTpgQysvcDYPh58sS2Tjry+mRG29XZUpkIovEPtl4HyNu1wad9s4epEOv+B+2DEQuiWepNwAGyGooleLVv9thdeXZLSVMPaR8M3M5pva+XhSiIqH3z6VkkdU+wlnJsbtyDNjIaaRV0y/qSIKL2zatniNyVp9Nnd3ufBt3kWvMqXFgvuaazkPbNHn9XHuvGfbxttc9z8wFh7Zs9wfZYjd6YT1BPrTid/W5ynqDeled++EGmuJxNwoHIvsUmYrTvOtfub6E+dTGNHktgByvNLdVldFbIvJwB3k9IpkEtiNE3/ksDTHWZ5Z/m3P0k2JUH6aa9I+lBqOeaNlFddZNDyDqxraL3qcPUyg9s5/tLVpMpXdPeqy48VnzMr71CwjIKW+Ok3je5hWdd03695VKWqq6G2zElJ5SLvGlBM4Q/SfnuiB0rcTc9Vl0ou0WYoCKI+ytr1i285jMrsN33ekdBxFO3syS2VYL3B2lqBbYzC4/rk8WSLaV513xjDfe2RY6s/IKIybg4tSJeh+XBM7jp5hzRHAyfKbGt47/IyzP3vlt4u4iLdpW+S2zL2RLbKlSFMKzcEWxnX6V9+8GpCl9kMNQD8QmiUzMIQucPgup91iD8nHlfFasrTwweTdDUitKVp0avaZ8376shCqJwJ8/XDITRo8qpKEgqZOBOMNyVJ0Y4ViwAwsjlzP06KIhATnlfFUeFeCq2VUHUO6bkhH2j3pe51wTxFx1TcoK1x0pSK8J29HTlSZBktyDQ9ljxBOXajGCfOkxsF7RXPVUhJvrz5I5Ct7FDp275Q1RI0opEJHAbO+N632PZqxBsNufL3PvbIuSd99VILSK2IvHnjnzTyD3vqxJ3VsFmc4HnPIJoZHdTrJ7JFnij3mo2JyALopHdvNOiCnAI/WrSm+HUitgW4Sz1vsfSTsI6LbWyccWNdtkpMHHqQc08OG0R6qrsFoT4HshMa+Zs38a+KkzeV2PfHivc5QxKu8lNfnKftuikgmic0kAzZ2b30uskZSCy8J0S0pYaQqPIAgOC2Guz2+gbuzUWQASRXCcpA0lnFbufkr2UIIh45+Dc9b7HQjvsXbLejVO+lPAShB78OkkZ4K5zpzfeyksZ38ILdMouKm5nlfshrahZxUuJt/DyqPc9FrGzSof3iIDbvbCdX7JoZJE53hZHvDXWy76u+Nz1vkfDBZHRmLOlRIqX99VQ2mPxv+VZyLyvht4eqzF/TRVsEfO+GqD/5RZHlDZ2Fyhk3lclseVBCp331dDbYwWvk5QAtT1W7vW+x+LvypNQ9LyvCgw/VOyadSOL7FEEUb1tUXyGQUE0RxrrYud9NYJtTEh39fIideVJMBMsft5Xw9Paolb7xZFGOfC1triy/wRkaSEtjihOd/USI7qmmPctSjnskUitLbCguSSJbRVBEEuW99Vwb9SzNkJ/AKeNif8vJJaVay6IJcz7aryxFStj3leDCWL4LySWFOqaKn8hsazse8xofyGxrKSCWNh632NJBNHTRugPYO4PFrre92hMM5As+/vmDpyevf/lCcZGsMx5X43OX59gXEarto8vM4vS5301diHv+5+e4I6/qkQrKioqKioqKioqKioqKioqzsV/oHW5KIsqlL0AAAAASUVORK5CYII=',
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
