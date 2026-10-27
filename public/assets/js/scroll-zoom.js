/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2019, Codrops
 * http://www.codrops.com
 *
 * Adapted for Haven so the fixed .jw_main_body can scroll,
 * and so height refreshes after images load.
 */
(function ($) {
  'use strict';

  $(function () {
    const MathUtils = {
      map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
      lerp: (a, b, n) => (1 - n) * a + n * b,
      getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2),
    };

    const body = document.body;
    let winsize;
    const calcWinsize = () => {
      winsize = { width: window.innerWidth, height: window.innerHeight };
    };
    calcWinsize();
    window.addEventListener('resize', calcWinsize);

    let docScroll = 0;
    let lastScroll = 0;
    let scrollingSpeed = 0;
    const getPageYScroll = () => {
      docScroll = window.pageYOffset || document.documentElement.scrollTop;
    };
    window.addEventListener('scroll', getPageYScroll, { passive: true });

    class Item {
      constructor(el) {
        this.DOM = { el: el };
        this.DOM.image = this.DOM.el.querySelector('.content__item-img');
        this.DOM.title = this.DOM.el.querySelector('.content__item-title');
        if (!this.DOM.image) {
          this.disabled = true;
          return;
        }
        this.DOM.imageWrapper = this.DOM.image.parentNode;
        this.renderedStyles = {
          imageScale: {
            previous: 0,
            current: 0,
            ease: 0.1,
            setValue: () => {
              const toValue = 1.5;
              const fromValue = 1;
              const val = MathUtils.map(
                this.props.top - docScroll,
                winsize.height,
                -1 * this.props.height,
                fromValue,
                toValue
              );
              return Math.max(Math.min(val, toValue), fromValue);
            },
          },
          titleTranslationY: {
            previous: 0,
            current: 0,
            ease: 0.1,
            fromValue: Number(MathUtils.getRandomFloat(30, 400)),
            setValue: () => {
              const fromValue = this.renderedStyles.titleTranslationY.fromValue;
              const toValue = -1 * fromValue;
              const val = MathUtils.map(
                this.props.top - docScroll,
                winsize.height,
                -1 * this.props.height,
                fromValue,
                toValue
              );
              return fromValue < 0
                ? Math.min(Math.max(val, fromValue), toValue)
                : Math.max(Math.min(val, fromValue), toValue);
            },
          },
        };
        this.getSize();
        this.update();
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => (this.isVisible = entry.intersectionRatio > 0));
        });
        this.observer.observe(this.DOM.el);
        window.addEventListener('resize', () => {
          this.getSize();
          this.update();
        });
      }

      update() {
        if (this.disabled) return;
        for (const key in this.renderedStyles) {
          this.renderedStyles[key].current = this.renderedStyles[key].previous =
            this.renderedStyles[key].setValue();
        }
        this.layout();
      }

      getSize() {
        if (this.disabled) return;
        const rect = this.DOM.el.getBoundingClientRect();
        this.props = {
          height: rect.height,
          top: docScroll + rect.top,
        };
      }

      render() {
        if (this.disabled) return;
        for (const key in this.renderedStyles) {
          this.renderedStyles[key].current = this.renderedStyles[key].setValue();
          this.renderedStyles[key].previous = MathUtils.lerp(
            this.renderedStyles[key].previous,
            this.renderedStyles[key].current,
            this.renderedStyles[key].ease
          );
        }
        this.layout();
      }

      layout() {
        if (this.disabled) return;
        const s = this.renderedStyles.imageScale.previous;
        this.DOM.image.style.transform = `scale3d(${s},${s},1)`;
        if (this.DOM.title) {
          this.DOM.title.style.transform = `translate3d(0,${this.renderedStyles.titleTranslationY.previous}px,0)`;
        }
      }
    }

    class SmoothScroll {
      constructor() {
        this.DOM = { main: document.querySelector('.jw_main_body') };
        if (!this.DOM.main) return;
        this.DOM.scrollable = this.DOM.main.querySelector('[data-scroll]');
        if (!this.DOM.scrollable) return;

        this.items = [];
        this.DOM.content = this.DOM.main.querySelector('.jw_content');
        if (this.DOM.content) {
          [...this.DOM.content.querySelectorAll('.content__item')].forEach((item) => {
            const instance = new Item(item);
            if (!instance.disabled) this.items.push(instance);
          });
        }

        this.renderedStyles = {
          translationY: {
            previous: 0,
            current: 0,
            ease: 0.1,
            setValue: () => docScroll,
          },
        };

        this.style();
        this.setSize();
        this.update();
        body.classList.add('has-smooth-scroll');
        window.addEventListener('resize', () => this.setSize());
        requestAnimationFrame(() => this.render());
      }

      update() {
        for (const key in this.renderedStyles) {
          this.renderedStyles[key].current = this.renderedStyles[key].previous =
            this.renderedStyles[key].setValue();
        }
        this.layout();
      }

      layout() {
        this.DOM.scrollable.style.transform = `translate3d(0,${-1 * this.renderedStyles.translationY.previous}px,0)`;
      }

      setSize() {
        const footer = document.querySelector('footer');
        const footerH = footer ? footer.offsetHeight : 0;
        const mainEl = this.DOM.main.querySelector('main');
        if (mainEl) {
          mainEl.style.paddingBottom = footerH + 'px';
        }
        body.style.height = `${this.DOM.scrollable.scrollHeight}px`;
      }

      style() {
        this.DOM.main.style.position = 'fixed';
        this.DOM.main.style.width = '100%';
        this.DOM.main.style.height = '100%';
        this.DOM.main.style.top = '0';
        this.DOM.main.style.left = '0';
        this.DOM.main.style.overflow = 'hidden';
      }

      render() {
        scrollingSpeed = Math.abs(docScroll - lastScroll);
        lastScroll = docScroll;

        for (const key in this.renderedStyles) {
          this.renderedStyles[key].current = this.renderedStyles[key].setValue();
          this.renderedStyles[key].previous = MathUtils.lerp(
            this.renderedStyles[key].previous,
            this.renderedStyles[key].current,
            this.renderedStyles[key].ease
          );
        }
        this.layout();

        for (const item of this.items) {
          if (item.isVisible) {
            if (item.insideViewport) {
              item.render();
            } else {
              item.insideViewport = true;
              item.update();
            }
          } else {
            item.insideViewport = false;
          }
        }

        requestAnimationFrame(() => this.render());
      }
    }

    // Start smooth scroll immediately (do not wait on image preload).
    getPageYScroll();
    lastScroll = docScroll;
    const scroller = new SmoothScroll();

    // Refresh height when images finish (layout can grow).
    if (typeof imagesLoaded === 'function') {
      imagesLoaded(document.body, function () {
        if (scroller && scroller.setSize) {
          scroller.setSize();
          scroller.items.forEach((item) => {
            item.getSize();
            item.update();
          });
        }
        body.classList.remove('loading');
      });
    } else {
      body.classList.remove('loading');
    }
  });
})(jQuery);
