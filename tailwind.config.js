/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const _map = require('lodash/map');

module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    maskImageUrl: {
      arrow: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6"><path d="M3.27989 3.23571L1.53642 4.97917C1.36382 5.15176 1.36383 5.43158 1.53642 5.60417C1.70901 5.77676 1.98882 5.77676 2.16139 5.60417L4.47096 3.29463C4.63371 3.13192 4.63371 2.86809 4.47096 2.70538L2.16139 0.395812C1.98883 0.22325 1.70901 0.22325 1.53642 0.395812C1.36383 0.568437 1.36383 0.84825 1.53642 1.02081L3.27989 2.76429C3.41006 2.89446 3.41006 3.10554 3.27989 3.23571Z"/></svg>',
      success: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 11"><path d="M4.89557 6.49823L2.79487 4.26513C2.26967 3.70683 1.38251 3.70683 0.857309 4.26513C0.375593 4.77721 0.375593 5.57574 0.857309 6.08781L4.74989 10.2257C5.14476 10.6455 5.81176 10.6455 6.20663 10.2257L13.1427 2.85252C13.6244 2.34044 13.6244 1.54191 13.1427 1.02984C12.6175 0.471537 11.7303 0.471536 11.2051 1.02984L6.06096 6.49823C5.74506 6.83403 5.21146 6.83403 4.89557 6.49823Z"/></svg>'
    },
    backgroundImageSvg: {
      'radio': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 8 8"><circle r="2" fill="#FFFFFF"/></svg>',
      'checkbox': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 11" width="13" height="11" fill="none"><path d="M11.0426 1.02893C11.3258 0.695792 11.8254 0.655283 12.1585 0.938451C12.4917 1.22162 12.5322 1.72124 12.249 2.05437L5.51985 9.97104C5.23224 10.3094 4.72261 10.3451 4.3907 10.05L0.828197 6.88335C0.50141 6.59288 0.471975 6.09249 0.762452 5.7657C1.05293 5.43891 1.55332 5.40948 1.88011 5.69995L4.83765 8.32889L11.0426 1.02893Z" fill="#FFFFFF"/></svg>',
      'img-input-dark': '<svg width="900" height="900" viewBox="0 0 900 900" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="900" fill="#151521"/><g clip-path="url(#clip0_713_2)"><path d="M328.063 589.559C293.977 589.559 263.656 567.734 252.646 535.242L251.902 532.794C249.305 524.19 248.217 516.954 248.217 509.714V364.541L196.563 536.966C189.92 562.327 205.059 588.62 230.459 595.626L559.701 683.799C563.811 684.863 567.92 685.374 571.967 685.374C593.172 685.374 612.548 671.3 617.979 650.559L637.161 589.559H328.063Z" fill="#3E3E51"/><path d="M386.618 365.991C410.104 365.991 429.2 346.892 429.2 323.406C429.2 299.92 410.104 280.82 386.618 280.82C363.132 280.82 344.032 299.92 344.032 323.406C344.032 346.892 363.132 365.991 386.618 365.991Z" fill="#3E3E51"/><path d="M652.768 216.944H333.385C304.047 216.944 280.156 240.835 280.156 270.177V504.388C280.156 533.73 304.047 557.621 333.385 557.621H652.768C682.11 557.621 706.001 533.73 706.001 504.388V270.177C706.001 240.835 682.11 216.944 652.768 216.944V216.944ZM333.385 259.529H652.768C658.647 259.529 663.415 264.297 663.415 270.177V421.33L596.155 342.845C589.02 334.478 578.692 330.006 567.6 329.753C556.571 329.815 546.224 334.712 539.155 343.188L460.074 438.106L434.311 412.406C419.749 397.844 396.049 397.844 381.507 412.406L322.741 471.152V270.177C322.741 264.297 327.51 259.529 333.385 259.529V259.529Z" fill="#3E3E51"/></g><defs><clipPath id="clip0_713_2"><rect width="511" height="511" fill="white" transform="translate(195 195)"/></clipPath></defs></svg>',
      'img-input-light': '<svg width="900" height="900" viewBox="0 0 900 900" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="900" height="900" fill="white"/><g clip-path="url(#clip0_616_6)"><path d="M328.063 589.559C293.977 589.559 263.656 567.734 252.646 535.242L251.902 532.794C249.305 524.19 248.217 516.954 248.217 509.714V364.541L196.563 536.966C189.92 562.327 205.059 588.62 230.459 595.626L559.701 683.799C563.811 684.863 567.92 685.374 571.967 685.374C593.172 685.374 612.548 671.3 617.979 650.559L637.161 589.559H328.063Z" fill="#DCE5F1"/><path d="M386.618 365.991C410.104 365.991 429.2 346.892 429.2 323.406C429.2 299.92 410.104 280.82 386.618 280.82C363.132 280.82 344.032 299.92 344.032 323.406C344.032 346.892 363.132 365.991 386.618 365.991Z" fill="#DCE5F1"/><path d="M652.768 216.944H333.385C304.047 216.944 280.156 240.835 280.156 270.177V504.388C280.156 533.73 304.047 557.621 333.385 557.621H652.768C682.11 557.621 706.001 533.73 706.001 504.388V270.177C706.001 240.835 682.11 216.944 652.768 216.944V216.944ZM333.385 259.529H652.768C658.647 259.529 663.415 264.297 663.415 270.177V421.33L596.155 342.845C589.02 334.478 578.692 330.006 567.6 329.753C556.571 329.815 546.224 334.712 539.155 343.188L460.074 438.106L434.311 412.406C419.749 397.844 396.049 397.844 381.507 412.406L322.741 471.152V270.177C322.741 264.297 327.51 259.529 333.385 259.529V259.529Z" fill="#DCE5F1"/></g><defs><clipPath id="clip0_616_6"><rect width="511" height="511" fill="white" transform="translate(195 195)"/></clipPath></defs></svg>',
    },
    transition: {
      'left-3-ease': 'left 0.3s ease',
      'transform-3-ease': 'transform 0.3s ease',
      'color-2-ease': 'color 0.2s ease',
      'btn': 'color 0.15s ease-in-out,background-color 0.15s ease-in-out,border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out',
      'drawer': 'transform 0.3s ease-in-out',
      'pagination': 'color 0.15s ease-in-out,background-color 0.15s ease-in-out,border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out',
      'modal': 'opacity 0.15s linear',
      'modal-dialog': 'transform 0.3s ease-out',
    },
    gridArea: {
      'aside': 'aside',
      'header': 'header',
      'main': 'main',
      'footer': 'footer',
      'body': 'body',
    },
    gridTemplateAreas: {
      'layout-lg': [
        'aside header',
        'aside main',
        'aside footer',
      ],
      'layout': [
        'header',
        'main',
        'footer',
      ],
      'auth-xl': [
        'aside body',
      ],
      'auth': [
        'body',
      ],
    },
    outline: {
      0: 0,
    },
    listStyle: {
      'none': 'none'
    },
    border: {
      'base': '1px solid var(--bs-gray-300)',
      'base-none': '0',
      'card-none': '0',
      'btn': '1px solid transparent',
      'btn-none': '0',
      'separator': '1px solid var(--bs-border-color)',
      'card': '1px solid var(--bs-border-color)',
      'form-control': '1px solid var(--bs-gray-300)',
      'form-check-input': '1px solid var(--bs-gray-300)',
      'form-check-input-none': '0',
      'table': '1px dashed var(--bs-border-color)',
      'table-border-none': '0 none transparent',
      'table-none': '0',
      'pagination': '0 solid transparent',
      'img-input': '3px solid var(--bs-body-bg)',
      'img-input-none': '0',
      'btn-outline-dashed': '1px dashed var(--bs-gray-300)',
      'modal-content': '0 solid rgba(255, 255, 255, 0.15)',
      'modal-header': '1px solid var(--bs-border-color)',
      'spinner-border': '0.185rem solid currentcolor',
      'stepper-none': '0',
      'loaction': '1px solid var(--bs-gray-300)',
    },
    borderBottomWidth: {
      '1px': '1px',
    },
    borderTop: {
      'modal-footer': '1px solid var(--bs-border-color)',
      'card': '1px solid var(--bs-border-color)'
    },
    scrollbarWidth: {
      'thin': 'thin'
    },
    scrollbarColor: {
      'base': ' var(--bs-scrollbar-color) transparent',
      'scrollbar-hover': 'var(--bs-scrollbar-hover-color) transparent',
      'transparent': 'transparent transparent'
    },
    extend: {
      screens: {
        'sm': { 'min': '576px' },
        'md': { 'min': '768px' },
        'lg': { 'min': '992px' },
        'xl': { 'min': '1200px' },
        'xxl': { 'min': '1400px' },
        'max-sm': { 'max': '575.98px' },
        'max-md': { 'max': '767.98px' },
        'max-lg': { 'max': '991.98px' },
        'max-xl': { 'max': '1199.98px' },
        'max-xxl': { 'max': '1399.98px' },
      },
      fontFamily: {
        'sans-serif': ['Inter', 'Helvetica', "sans-serif"],
        'sans': ['sans-serif'],
        'body': 'var(--bs-body-font-family)',
      },
      colors: {
        'body': {
          'color': 'var(--bs-body-color)',
          'bg': 'var(--bs-body-bg)',
        },
        'page': {
          'bg': 'var(--bs-page-bg)',
          'auth-bg': 'var(--bs-page-auth-bg)',
        },
        'heading': 'var(--bs-heading-color)',
        'header': {
          'fixed': {
            'bg-color': 'var(--bs-header-fixed-bg-color)',
          }
        },
        'scrolltop': {
          'bg-color': 'var(--bs-scrolltop-bg-color)',
          'icon-color': 'var(--bs-scrolltop-icon-color)',
        },
        'aside': {
          'bg': 'var(--bs-aside-bg-color)',
        },
        'auth-bg': 'var(--bs-auth-bg)',
        'bullet-bg': 'var(--bs-bullet-bg-color)',
        'drawer-bg': 'var(--bs-drawer-bg-color)',
        'scrollbar': 'var(--bs-scrollbar-color)',
        'scrollbar-hover': 'var(--bs-scrollbar-hover-color)',
        'border-color': 'var(--bs-border-color)',
        'form-invalid': 'var(--bs-form-invalid-color)',
        'dropdown-bg': 'var(--bs-dropdown-bg)',
        'opacity': 'rgba(var(--bs-bg-rgb-color), var(--tw-bg-opacity))',
        'menu': {
          'link': {
            'color': {
              'hover': 'var(--bs-menu-link-color-hover)',
              'show': 'var(--bs-menu-link-color-show)',
              'here': 'var(--bs-menu-link-color-here)',
              'active': 'var(--bs-menu-link-color-active)',
            },
            'bg': {
              'hover': 'var(--bs-menu-link-bg-color-hover)',
              'show': 'var(--bs-menu-link-bg-color-show)',
              'here': 'var(--bs-menu-link-bg-color-here)',
              'active': 'var(--bs-menu-link-bg-color-active)',
            }
          },
          'dropdown': {
            'bg': 'var(--bs-menu-dropdown-bg-color)',
          }
        },
        'component': {
          'active': {
            'color': 'var(--bs-component-active-color)',
            'bg': 'var(--bs-component-active-bg)',
          },
          'hover': {
            'color': 'var(--bs-component-hover-color)',
            'bg': 'var(--bs-component-hover-bg)',
          }
        },
        'theme': {
          'white': 'var(--bs-white)',
          'light': 'var(--bs-light)',
          'primary': 'var(--bs-primary)',
          'secondary': 'var(--bs-secondary)',
          'success': 'var(--bs-success)',
          'info': 'var(--bs-info)',
          'warning': 'var(--bs-warning)',
          'danger': 'var(--bs-danger)',
          'dark': 'var(--bs-dark)',
          'primary-active': 'var(--bs-primary-active)',
          'secondary-active': 'var(--bs-secondary-active)',
          'light-active': 'var(--bs-light-active)',
          'success-active': 'var(--bs-success-active)',
          'info-active': 'var(--bs-info-active)',
          'warning-active': 'var(--bs-warning-active)',
          'danger-active': 'var(--bs-danger-active)',
          'dark-active': 'var(--bs-dark-active)',
          'primary-light': 'var(--bs-primary-light)',
          'secondary-light': 'var(--bs-secondary-light)',
          'success-light': 'var(--bs-success-light)',
          'info-light': 'var(--bs-info-light)',
          'warning-light': 'var(--bs-warning-light)',
          'danger-light': 'var(--bs-danger-light)',
          'dark-light': 'var(--bs-dark-light)',
          'primary-inverse': 'var(--bs-primary-inverse)',
          'secondary-inverse': 'var(--bs-secondary-inverse)',
          'light-inverse': 'var(--bs-light-inverse)',
          'success-inverse': 'var(--bs-success-inverse)',
          'info-inverse': 'var(--bs-info-inverse)',
          'warning-inverse': 'var(--bs-warning-inverse)',
          'danger-inverse': 'var(--bs-danger-inverse)',
          'dark-inverse': 'var(--bs-dark-inverse)',
        },
        'gray': {
          '100': 'var(--bs-gray-100)',
          '200': 'var(--bs-gray-200)',
          '300': 'var(--bs-gray-300)',
          '400': 'var(--bs-gray-400)',
          '500': 'var(--bs-gray-500)',
          '600': 'var(--bs-gray-600)',
          '700': 'var(--bs-gray-700)',
          '800': 'var(--bs-gray-800)',
          '900': 'var(--bs-gray-900)'
        },
        'text': {
          'gray': {
            '100': 'var(--bs-text-gray-100)',
            '200': 'var(--bs-text-gray-200)',
            '300': 'var(--bs-text-gray-300)',
            '400': 'var(--bs-text-gray-400)',
            '500': 'var(--bs-text-gray-500)',
            '600': 'var(--bs-text-gray-600)',
            '700': 'var(--bs-text-gray-700)',
            '800': 'var(--bs-text-gray-800)',
            '900': 'var(--bs-text-gray-900)',
          },
          'theme': {
            'white': 'var(--bs-text-white)',
            'light': 'var(--bs-text-light)',
            'primary': 'var(--bs-text-primary)',
            'secondary': 'var(--bs-text-secondary)',
            'success': 'var(--bs-text-success)',
            'info': 'var(--bs-text-info)',
            'warning': 'var(--bs-text-warning)',
            'danger': 'var(--bs-text-danger)',
            'dark': 'var(--bs-text-dark)',
            'muted': 'var(--bs-text-muted)',
          }
        }
      },
      boxShadow: {
        'aside': 'var(--bs-aside-bg-color)',
        'menu-dropdown': 'var(--bs-menu-dropdown-box-shadow)',
        'drawer': 'var(--bs-drawer-box-shadow)',
        'card': '0px 0px 30px rgba(210, 215, 221, 0.08)',
        'btn': 'inset 0 1px 0 rgba(255, 255, 255, 0.15),0 1px 1px rgba(0, 0, 0, 0.075)',
        'table': 'inset 0 0 0 9999px initial',
        'box': 'var(--bs-box-shadow)',
        'dropdown': 'var(--bs-dropdown-box-shadow)',
        'header-fixed': 'var(--bs-header-fixed-box-shadow)',
        'scrolltop': 'var(--bs-scrolltop-box-shadow)',
        'modal-content': '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'base': '1.15rem',
        'circle': '50%',
        'scrollbar': 'var(--bs-scrollbar-size)',
        'card': 'calc(1.15rem - 1px) calc(1.15rem - 1px) 0 0',
      },
      lineHeight: {
        'body': 'var(--bs-body-line-height)',
        'btn': '1.5',
        'inherit': 'inherit'
      },
      fontSize: {
        'body': 'var(--bs-body-font-size)',
        '1': 'calc(1.3rem + 0.6vw)',
        '2': 'calc(1.275rem + 0.3vw)',
        '3': 'calc(1.26rem + 0.12vw)',
        '4': '1.25rem',
        '5': '1.15rem',
        '6': '1.075rem',
        '7': '0.95rem',
        '8': '0.85rem',
        '9': '0.75rem',
        '10': '0.5rem',
        'base': '1rem',
        '2x': 'calc(1.325rem + 0.9vw)',
        '2qx': 'calc(1.35rem + 1.2vw)',
        '2hx': 'calc(1.375rem + 1.5vw)',
        '2tx': 'calc(1.4rem + 1.8vw)',
        '3x': 'calc(1.425rem + 2.1vw)',
        '3qx': 'calc(1.45rem + 2.4vw)',
        '3hx': 'calc(1.475rem + 2.7vw)',
        '3tx': 'calc(1.5rem + 3vw)',
        '4x': 'calc(1.525rem + 3.3vw)',
        '4qx': 'calc(1.55rem + 3.6vw)',
        '4hx': 'calc(1.575rem + 3.9vw)',
        '4tx': 'calc(1.6rem + 4.2vw)',
        '5x': 'calc(1.625rem + 4.5vw)',
        '5qx': 'calc(1.65rem + 4.8vw)',
        '5hx': 'calc(1.675rem + 5.1vw)',
        '5tx': 'calc(1.7rem + 5.4vw)',
        '6x': 'calc(1.725rem + 5.7vw)',
        '6qx': 'calc(1.75rem + 6vw)',
        '6hx': 'calc(1.775rem + 6.3vw)',
        '6tx': 'calc(1.8rem + 6.6vw)',
        '7x': 'calc(1.825rem + 6.9vw)',
        '7qx': 'calc(1.85rem + 7.2vw)',
        '7hx': 'calc(1.875rem + 7.5vw)',
        '7tx': 'calc(1.9rem + 7.8vw)',
      },
      backgroundSize: {
        'arrow': '100% 100%',
        'checkbox': '60% 60%'
      },
      spacing: {
        'btn': 'calc(0.775rem + 1px) calc(1.5rem + 1px)',
        'btn-sm': 'calc(0.55rem + 1px) calc(1.25rem + 1px)',
        'btn-icon': 'calc(1.5em + 1.55rem + 2px)',
        'sidebar': 'calc(100% - 1.25rem)',
        'scrollbar': 'var(--bs-scrollbar-size)',
        'search': 'calc(1.26rem + 0.12vw)',
        'search-lg': '1.35rem',
      },
      minHeight: {
        'form-control-lg': 'calc(1em + 0.5rem + 2px)'
      },
      keyframes: {
        'menu-sub-dropdown-fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'menu-sub-dropdown-move-up': {
          '0%': { 'margin-top': '0.75rem' },
          '100%': { 'margin-top': '0' },
        },
        'spinner-border': {
          'to': { 'transform': 'rotate(360deg)' }
        },
        'animation-scrolltop': {
          '0%': { 'margin-bottom': '-15px' },
          '100%': { 'margin-bottom': '0' },
        }
      },
      animation: {
        'menu-sub-dropdown': 'menu-sub-dropdown-fade-in .3s ease 1, menu-sub-dropdown-move-up .3s ease 1',
        'spinner-border': '0.65s linear infinite spinner-border',
        'scrolltop': 'animation-scrolltop 0.4s ease-out 1'
      },
      gridTemplateColumns: {
        'auth-page': '58.33333333% 41.66666667%'
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const gridTemplateAreases = theme('gridTemplateAreas');

      const gridAreas = theme('gridArea');

      const outlines = theme('outline');

      const listStyles = theme('listStyle');

      const masks = theme('maskImageUrl');

      const imageSvgs = theme('backgroundImageSvg');

      const transitions = theme('transition');

      const borders = theme('border');

      const borderBottomWidths = theme('borderBottomWidth');

      const borderTops = theme('borderTop');

      const scrollbarWidths = theme('scrollbarWidth');

      const scrollbarColors = theme('scrollbarColor');

      addUtilities([
        _map(gridTemplateAreases, (value, name) => {
          return {
            [`.grid-template-areas-${name}`]: {
              gridTemplateAreas: _map(value, (row) => {
                return `"${row}"`;
              }).join('\n'),
            },
          }
        }),
        _map(gridAreas, (value, name) => {
          return {
            [`.${`grid-area-${name}`}`]: { gridArea: `${value}` }
          }
        }),
        _map(outlines, (value, name) => {
          return {
            [`.${`outlines-${name}`}`]: { outline: `${value}` }
          }
        }),
        _map(listStyles, (value, name) => {
          return {
            [`.${`list-style-${name}`}`]: { listStyle: `${value}` }
          }
        }),
        _map(masks, (svg, svg_name) => {
          let svg64 = encodeURIComponent(svg);
          return {
            [`.${`mask-svg-${svg_name}`}`]: {
              maskRepeat: `no-repeat`,
              maskPosition: `center`,
              maskImage: `url("data:image/svg+xml,${svg64}")`
            }
          }
        }),
        _map(imageSvgs, (svg, svg_name) => {
          let svg64 = encodeURIComponent(svg);
          return {
            [`.${`bg-svg-${svg_name}`}`]: {
              backgroundImage: `url("data:image/svg+xml,${svg64}")`
            }
          }
        }),
        _map(transitions, (value, name) => {
          return {
            [`.${`transition-${name}`}`]: { transition: `${value}` }
          }
        }),
        _map(borders, (value, name) => {
          return {
            [`.${`border-${name}`}`]: { border: `${value}` },
            [`.${`border-bottom-${name}`}`]: { borderBottom: `${value}` }
          }
        }),
        _map(borderBottomWidths, (value, name) => {
          return {
            [`.${`border-bottom-width-${name}`}`]: { borderBottomWidth: `${value}` },
          }
        }),
        _map(borderTops, (value, name) => {
          return {
            [`.${`border-top-${name}`}`]: { borderTop: `${value}` },
          }
        }),
        _map(scrollbarWidths, (value, name) => {
          return {
            [`.${`scrollbar-width-${name}`}`]: { scrollbarWidth: `${value}` },
          }
        }),
        _map(scrollbarColors, (value, name) => {
          return {
            [`.${`scrollbar-color-${name}`}`]: { scrollbarColor: `${value}` },
          }
        }),
      ])
    }),
    plugin(function ({ matchVariant }) {
      matchVariant(
        "theme",
        (value) => {
          return `[data-bs-theme=${value}] &`;
        },
        {
          values: {
            light: "light",
            dark: "dark",
          },
        },
      );
      matchVariant(
        'type',
        (value) => {
          return `&[type=${value}]`;
        },
        {
          values: {
            file: "file",
          },
        }
      );
    }),
  ],
}

