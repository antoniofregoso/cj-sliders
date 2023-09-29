import { Swiper } from 'swiper/bundle';
import { FunnelElement } from "./FunnelElement";



export class SwiperElement extends FunnelElement {

    #default = {
        textAlign:"centered",
        headingCoror:"black"
    };

    constructor(props={}){
        super();
        this.state =this.initState(this.#default,props);
        this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.setAttribute("text-align",this.state.textAlign);
        this.attachShadow({ mode: "open" }); 
    }
    
    #getCardWidt(){
        if (screen.width<361){
            return '250'
        }else{
            return '300'
        }
    }
    


    #swiperStyles = /* css */`
            /**
        * Swiper 9.1.1
        * Most modern mobile touch slider and framework with hardware accelerated transitions
        * https://swiperjs.com
        *
        * Copyright 2014-2023 Vladimir Kharlampidi
        *
        * Released under the MIT License
        *
        * Released on: March 16, 2023
        */

        /* FONT_START */
        @font-face {
            font-family: 'swiper-icons';
            src: url('data:application/font-woff;charset=utf-8;base64, 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');
            font-weight: 400;
            font-style: normal;
          }
        /* FONT_END */
        :root {
        --swiper-theme-color: #007aff;
        /*
        --swiper-preloader-color: var(--swiper-theme-color);
        --swiper-wrapper-transition-timing-function: initial;
        */
        }
        .swiper,
        swiper-container {
        margin-left: auto;
        margin-right: auto;
        position: relative;
        overflow: hidden;
        list-style: none;
        padding: 0;
        /* Fix of Webkit flickering */
        z-index: 1;
        display: block;
        }
        .swiper-vertical > .swiper-wrapper {
        flex-direction: column;
        }
        .swiper-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1;
        display: flex;
        transition-property: transform;
        transition-timing-function: var(--swiper-wrapper-transition-timing-function, initial);
        box-sizing: content-box;
        }
        .swiper-android .swiper-slide,
        .swiper-wrapper {
        transform: translate3d(0px, 0, 0);
        }
        .swiper-horizontal {
        touch-action: pan-y;
        }
        .swiper-vertical {
        touch-action: pan-x;
        }
        .swiper-slide,
        swiper-slide {
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        position: relative;
        transition-property: transform;
        display: block;
        }
        .swiper-slide-invisible-blank {
        visibility: hidden;
        }
        /* Auto Height */
        .swiper-autoheight,
        .swiper-autoheight .swiper-slide {
        height: auto;
        }
        .swiper-autoheight .swiper-wrapper {
        align-items: flex-start;
        transition-property: transform, height;
        }
        .swiper-backface-hidden .swiper-slide {
        transform: translateZ(0);
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        }
        /* 3D Effects */
        .swiper-3d.swiper-css-mode .swiper-wrapper {
        perspective: 1200px;
        }
        .swiper-3d .swiper-wrapper {
        transform-style: preserve-3d;
        }
        .swiper-3d {
        perspective: 1200px;
        }
        .swiper-3d .swiper-slide,
        .swiper-3d .swiper-slide-shadow,
        .swiper-3d .swiper-slide-shadow-left,
        .swiper-3d .swiper-slide-shadow-right,
        .swiper-3d .swiper-slide-shadow-top,
        .swiper-3d .swiper-slide-shadow-bottom,
        .swiper-3d .swiper-cube-shadow {
        transform-style: preserve-3d;
        }
        .swiper-3d .swiper-slide-shadow,
        .swiper-3d .swiper-slide-shadow-left,
        .swiper-3d .swiper-slide-shadow-right,
        .swiper-3d .swiper-slide-shadow-top,
        .swiper-3d .swiper-slide-shadow-bottom {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10;
        }
        .swiper-3d .swiper-slide-shadow {
        background: rgba(0, 0, 0, 0.15);
        }
        .swiper-3d .swiper-slide-shadow-left {
        background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
        }
        .swiper-3d .swiper-slide-shadow-right {
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
        }
        .swiper-3d .swiper-slide-shadow-top {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
        }
        .swiper-3d .swiper-slide-shadow-bottom {
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
        }
        /* CSS Mode */
        .swiper-css-mode > .swiper-wrapper {
        overflow: auto;
        scrollbar-width: none;
        /* For Firefox */
        -ms-overflow-style: none;
        /* For Internet Explorer and Edge */
        }
        .swiper-css-mode > .swiper-wrapper::-webkit-scrollbar {
        display: none;
        }
        .swiper-css-mode > .swiper-wrapper > .swiper-slide {
        scroll-snap-align: start start;
        }
        .swiper-horizontal.swiper-css-mode > .swiper-wrapper {
        scroll-snap-type: x mandatory;
        }
        .swiper-vertical.swiper-css-mode > .swiper-wrapper {
        scroll-snap-type: y mandatory;
        }
        .swiper-centered > .swiper-wrapper::before {
        content: '';
        flex-shrink: 0;
        order: 9999;
        }
        .swiper-centered > .swiper-wrapper > .swiper-slide {
        scroll-snap-align: center center;
        scroll-snap-stop: always;
        }
        .swiper-centered.swiper-horizontal > .swiper-wrapper > .swiper-slide:first-child {
        margin-inline-start: var(--swiper-centered-offset-before);
        }
        .swiper-centered.swiper-horizontal > .swiper-wrapper::before {
        height: 100%;
        min-height: 1px;
        width: var(--swiper-centered-offset-after);
        }
        .swiper-centered.swiper-vertical > .swiper-wrapper > .swiper-slide:first-child {
        margin-block-start: var(--swiper-centered-offset-before);
        }
        .swiper-centered.swiper-vertical > .swiper-wrapper::before {
        width: 100%;
        min-width: 1px;
        height: var(--swiper-centered-offset-after);
        }
        .swiper-lazy-preloader {
        width: 42px;
        height: 42px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -21px;
        margin-top: -21px;
        z-index: 10;
        transform-origin: 50%;
        box-sizing: border-box;
        border: 4px solid var(--swiper-preloader-color, var(--swiper-theme-color));
        border-radius: 50%;
        border-top-color: transparent;
        }
        .swiper:not(.swiper-watch-progress) .swiper-lazy-preloader,
        swiper-container:not(.swiper-watch-progress) .swiper-lazy-preloader,
        .swiper-watch-progress .swiper-slide-visible .swiper-lazy-preloader {
        animation: swiper-preloader-spin 1s infinite linear;
        }
        .swiper-lazy-preloader-white {
        --swiper-preloader-color: #fff;
        }
        .swiper-lazy-preloader-black {
        --swiper-preloader-color: #000;
        }
        @keyframes swiper-preloader-spin {
        0% {
        transform: rotate(0deg);
        }
        100% {
        transform: rotate(360deg);
        }
        }
        .swiper-virtual .swiper-slide {
        -webkit-backface-visibility: hidden;
        transform: translateZ(0);
        }
        .swiper-virtual.swiper-css-mode .swiper-wrapper::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none;
        }
        .swiper-virtual.swiper-css-mode.swiper-horizontal .swiper-wrapper::after {
        height: 1px;
        width: var(--swiper-virtual-size);
        }
        .swiper-virtual.swiper-css-mode.swiper-vertical .swiper-wrapper::after {
        width: 1px;
        height: var(--swiper-virtual-size);
        }
        :root {
        --swiper-navigation-size: 44px;
        /*
        --swiper-navigation-top-offset: 50%;
        --swiper-navigation-sides-offset: 10px;
        --swiper-navigation-color: var(--swiper-theme-color);
        */
        }
        .swiper-button-prev,
        .swiper-button-next {
        position: absolute;
        top: var(--swiper-navigation-top-offset, 50%);
        width: calc(var(--swiper-navigation-size) / 44 * 27);
        height: var(--swiper-navigation-size);
        margin-top: calc(0px - (var(--swiper-navigation-size) / 2));
        z-index: 10;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--swiper-navigation-color, var(--swiper-theme-color));
        }
        .swiper-button-prev.swiper-button-disabled,
        .swiper-button-next.swiper-button-disabled {
        opacity: 0.35;
        cursor: auto;
        pointer-events: none;
        }
        .swiper-button-prev.swiper-button-hidden,
        .swiper-button-next.swiper-button-hidden {
        opacity: 0;
        cursor: auto;
        pointer-events: none;
        }
        .swiper-navigation-disabled .swiper-button-prev,
        .swiper-navigation-disabled .swiper-button-next {
        display: none !important;
        }
        .swiper-button-prev:after,
        .swiper-button-next:after {
        font-family: swiper-icons;
        font-size: var(--swiper-navigation-size);
        text-transform: none !important;
        letter-spacing: 0;
        font-variant: initial;
        line-height: 1;
        }
        .swiper-button-prev,
        .swiper-rtl .swiper-button-next {
        left: var(--swiper-navigation-sides-offset, 10px);
        right: auto;
        }
        .swiper-button-prev:after,
        .swiper-rtl .swiper-button-next:after {
        content: 'prev';
        }
        .swiper-button-next,
        .swiper-rtl .swiper-button-prev {
        right: var(--swiper-navigation-sides-offset, 10px);
        left: auto;
        }
        .swiper-button-next:after,
        .swiper-rtl .swiper-button-prev:after {
        content: 'next';
        }
        .swiper-button-lock {
        display: none;
        }
        :root {
        /*
        --swiper-pagination-color: var(--swiper-theme-color);
        --swiper-pagination-left: auto;
        --swiper-pagination-right: 8px;
        --swiper-pagination-bottom: 8px;
        --swiper-pagination-top: auto;
        --swiper-pagination-fraction-color: inherit;
        --swiper-pagination-progressbar-bg-color: rgba(0,0,0,0.25);
        --swiper-pagination-progressbar-size: 4px;
        --swiper-pagination-bullet-size: 8px;
        --swiper-pagination-bullet-width: 8px;
        --swiper-pagination-bullet-height: 8px;
        --swiper-pagination-bullet-border-radius: 50%;
        --swiper-pagination-bullet-inactive-color: #000;
        --swiper-pagination-bullet-inactive-opacity: 0.2;
        --swiper-pagination-bullet-opacity: 1;
        --swiper-pagination-bullet-horizontal-gap: 4px;
        --swiper-pagination-bullet-vertical-gap: 6px;
        */
        }
        .swiper-pagination {
        position: absolute;
        text-align: center;
        transition: 300ms opacity;
        transform: translate3d(0, 0, 0);
        z-index: 10;
        }
        .swiper-pagination.swiper-pagination-hidden {
        opacity: 0;
        }
        .swiper-pagination-disabled > .swiper-pagination,
        .swiper-pagination.swiper-pagination-disabled {
        display: none !important;
        }
        /* Common Styles */
        .swiper-pagination-fraction,
        .swiper-pagination-custom,
        .swiper-horizontal > .swiper-pagination-bullets,
        .swiper-pagination-bullets.swiper-pagination-horizontal {
        bottom: var(--swiper-pagination-bottom, 8px);
        top: var(--swiper-pagination-top, auto);
        left: 0;
        width: 100%;
        }
        /* Bullets */
        .swiper-pagination-bullets-dynamic {
        overflow: hidden;
        font-size: 0;
        }
        .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
        transform: scale(0.33);
        position: relative;
        }
        .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active {
        transform: scale(1);
        }
        .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main {
        transform: scale(1);
        }
        .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev {
        transform: scale(0.66);
        }
        .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev {
        transform: scale(0.33);
        }
        .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next {
        transform: scale(0.66);
        }
        .swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next {
        transform: scale(0.33);
        }
        .swiper-pagination-bullet {
        width: var(--swiper-pagination-bullet-width, var(--swiper-pagination-bullet-size, 8px));
        height: var(--swiper-pagination-bullet-height, var(--swiper-pagination-bullet-size, 8px));
        display: inline-block;
        border-radius: var(--swiper-pagination-bullet-border-radius, 50%);
        background: var(--swiper-pagination-bullet-inactive-color, #000);
        opacity: var(--swiper-pagination-bullet-inactive-opacity, 0.2);
        }
        button.swiper-pagination-bullet {
        border: none;
        margin: 0;
        padding: 0;
        box-shadow: none;
        -webkit-appearance: none;
        appearance: none;
        }
        .swiper-pagination-clickable .swiper-pagination-bullet {
        cursor: pointer;
        }
        .swiper-pagination-bullet:only-child {
        display: none !important;
        }
        .swiper-pagination-bullet-active {
        opacity: var(--swiper-pagination-bullet-opacity, 1);
        background: var(--swiper-pagination-color, var(--swiper-theme-color));
        }
        .swiper-vertical > .swiper-pagination-bullets,
        .swiper-pagination-vertical.swiper-pagination-bullets {
        right: var(--swiper-pagination-right, 8px);
        left: var(--swiper-pagination-left, auto);
        top: 50%;
        transform: translate3d(0px, -50%, 0);
        }
        .swiper-vertical > .swiper-pagination-bullets .swiper-pagination-bullet,
        .swiper-pagination-vertical.swiper-pagination-bullets .swiper-pagination-bullet {
        margin: var(--swiper-pagination-bullet-vertical-gap, 6px) 0;
        display: block;
        }
        .swiper-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic,
        .swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        }
        .swiper-vertical > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,
        .swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
        display: inline-block;
        transition: 200ms transform, 200ms top;
        }
        .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
        .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 4px);
        }
        .swiper-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic,
        .swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        }
        .swiper-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,
        .swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
        transition: 200ms transform, 200ms left;
        }
        .swiper-horizontal.swiper-rtl > .swiper-pagination-bullets-dynamic .swiper-pagination-bullet,
        :host(.swiper-horizontal.swiper-rtl) .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
        transition: 200ms transform, 200ms right;
        }
        /* Fraction */
        .swiper-pagination-fraction {
        color: var(--swiper-pagination-fraction-color, inherit);
        }
        /* Progress */
        .swiper-pagination-progressbar {
        background: var(--swiper-pagination-progressbar-bg-color, rgba(0, 0, 0, 0.25));
        position: absolute;
        /*ADD_HOST*/
        }
        .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
        background: var(--swiper-pagination-color, var(--swiper-theme-color));
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transform: scale(0);
        transform-origin: left top;
        }
        .swiper-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
        transform-origin: right top;
        }
        .swiper-horizontal > .swiper-pagination-progressbar,
        .swiper-pagination-progressbar.swiper-pagination-horizontal,
        .swiper-vertical > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,
        .swiper-pagination-progressbar.swiper-pagination-vertical.swiper-pagination-progressbar-opposite {
        width: 100%;
        height: var(--swiper-pagination-progressbar-size, 4px);
        left: 0;
        top: 0;
        }
        .swiper-vertical > .swiper-pagination-progressbar,
        .swiper-pagination-progressbar.swiper-pagination-vertical,
        .swiper-horizontal > .swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,
        .swiper-pagination-progressbar.swiper-pagination-horizontal.swiper-pagination-progressbar-opposite {
        width: var(--swiper-pagination-progressbar-size, 4px);
        height: 100%;
        left: 0;
        top: 0;
        }
        .swiper-pagination-lock {
        display: none;
        }
        :root {
        /*
        --swiper-scrollbar-border-radius: 10px;
        --swiper-scrollbar-top: auto;
        --swiper-scrollbar-bottom: 4px;
        --swiper-scrollbar-left: auto;
        --swiper-scrollbar-right: 4px;
        --swiper-scrollbar-sides-offset: 1%;
        --swiper-scrollbar-bg-color: rgba(0, 0, 0, 0.1);
        --swiper-scrollbar-drag-bg-color: rgba(0, 0, 0, 0.5);
        --swiper-scrollbar-size: 4px;
        */
        }
        .swiper-scrollbar {
        border-radius: var(--swiper-scrollbar-border-radius, 10px);
        position: relative;
        -ms-touch-action: none;
        background: var(--swiper-scrollbar-bg-color, rgba(0, 0, 0, 0.1));
        }
        .swiper-scrollbar-disabled > .swiper-scrollbar,
        .swiper-scrollbar.swiper-scrollbar-disabled {
        display: none !important;
        }
        .swiper-horizontal > .swiper-scrollbar,
        .swiper-scrollbar.swiper-scrollbar-horizontal {
        position: absolute;
        left: var(--swiper-scrollbar-sides-offset, 1%);
        bottom: var(--swiper-scrollbar-bottom, 4px);
        top: var(--swiper-scrollbar-top, auto);
        z-index: 50;
        height: var(--swiper-scrollbar-size, 4px);
        width: calc(100% - 2 * var(--swiper-scrollbar-sides-offset, 1%));
        }
        .swiper-vertical > .swiper-scrollbar,
        .swiper-scrollbar.swiper-scrollbar-vertical {
        position: absolute;
        left: var(--swiper-scrollbar-left, auto);
        right: var(--swiper-scrollbar-right, 4px);
        top: var(--swiper-scrollbar-sides-offset, 1%);
        z-index: 50;
        width: var(--swiper-scrollbar-size, 4px);
        height: calc(100% - 2 * var(--swiper-scrollbar-sides-offset, 1%));
        }
        .swiper-scrollbar-drag {
        height: 100%;
        width: 100%;
        position: relative;
        background: var(--swiper-scrollbar-drag-bg-color, rgba(0, 0, 0, 0.5));
        border-radius: var(--swiper-scrollbar-border-radius, 10px);
        left: 0;
        top: 0;
        }
        .swiper-scrollbar-cursor-drag {
        cursor: move;
        }
        .swiper-scrollbar-lock {
        display: none;
        }
        .swiper-zoom-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        }
        .swiper-zoom-container > img,
        .swiper-zoom-container > svg,
        .swiper-zoom-container > canvas {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        }
        .swiper-slide-zoomed {
        cursor: move;
        touch-action: none;
        }
        /* a11y */
        .swiper .swiper-notification,
        swiper-container .swiper-notification {
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none;
        opacity: 0;
        z-index: -1000;
        }
        .swiper-free-mode > .swiper-wrapper {
        transition-timing-function: ease-out;
        margin: 0 auto;
        }
        .swiper-grid > .swiper-wrapper {
        flex-wrap: wrap;
        }
        .swiper-grid-column > .swiper-wrapper {
        flex-wrap: wrap;
        flex-direction: column;
        }
        .swiper-fade.swiper-free-mode .swiper-slide {
        transition-timing-function: ease-out;
        }
        .swiper-fade .swiper-slide {
        pointer-events: none;
        transition-property: opacity;
        }
        .swiper-fade .swiper-slide .swiper-slide {
        pointer-events: none;
        }
        .swiper-fade .swiper-slide-active,
        .swiper-fade .swiper-slide-active .swiper-slide-active {
        pointer-events: auto;
        }
        .swiper-cube {
        overflow: visible;
        }
        .swiper-cube .swiper-slide {
        pointer-events: none;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        z-index: 1;
        visibility: hidden;
        transform-origin: 0 0;
        width: 100%;
        height: 100%;
        }
        .swiper-cube .swiper-slide .swiper-slide {
        pointer-events: none;
        }
        .swiper-cube.swiper-rtl .swiper-slide {
        transform-origin: 100% 0;
        }
        .swiper-cube .swiper-slide-active,
        .swiper-cube .swiper-slide-active .swiper-slide-active {
        pointer-events: auto;
        }
        .swiper-cube .swiper-slide-active,
        .swiper-cube .swiper-slide-next,
        .swiper-cube .swiper-slide-prev,
        .swiper-cube .swiper-slide-next + .swiper-slide {
        pointer-events: auto;
        visibility: visible;
        }
        .swiper-cube .swiper-slide-shadow-top,
        .swiper-cube .swiper-slide-shadow-bottom,
        .swiper-cube .swiper-slide-shadow-left,
        .swiper-cube .swiper-slide-shadow-right {
        z-index: 0;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        }
        .swiper-cube .swiper-cube-shadow {
        position: absolute;
        left: 0;
        bottom: 0px;
        width: 100%;
        height: 100%;
        opacity: 0.6;
        z-index: 0;
        }
        .swiper-cube .swiper-cube-shadow:before {
        content: '';
        background: #000;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        filter: blur(50px);
        }
        .swiper-flip {
        overflow: visible;
        }
        .swiper-flip .swiper-slide {
        pointer-events: none;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        z-index: 1;
        }
        .swiper-flip .swiper-slide .swiper-slide {
        pointer-events: none;
        }
        .swiper-flip .swiper-slide-active,
        .swiper-flip .swiper-slide-active .swiper-slide-active {
        pointer-events: auto;
        }
        .swiper-flip .swiper-slide-shadow-top,
        .swiper-flip .swiper-slide-shadow-bottom,
        .swiper-flip .swiper-slide-shadow-left,
        .swiper-flip .swiper-slide-shadow-right {
        z-index: 0;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        }
        .swiper-creative .swiper-slide {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        overflow: hidden;
        transition-property: transform, opacity, height;
        }
        .swiper-cards {
        overflow: visible;
        }
        .swiper-cards .swiper-slide {
        transform-origin: center bottom;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        overflow: hidden;
        }
        .swiper-big-bullets {
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            color: #000;
            opacity: 1;
            background: rgba(0, 0, 0, 0.2);
          }
        .add-to-cart {
        display: inline-block;
        border: none;
        border-radius: 20px;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        transition: background-color 0.3s ease;
        }

        .p-4 {
            padding: 1rem;
        }
        
        .add-to-cart:hover {            
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }         
        .has-text-centered {
            text-align: center;
        }
        .has-text-justified {
            text-align: justify;
        }
        .has-text-left {
            text-align: left;
        }
        .has-text-right {
            text-align: right;
        }
    `;


    #cardsStyles = /* css */`
    .swiper-cards {
        width: ${this.#getCardWidt()}px;
        padding: 50px;
      }
  
      .swiper-slide-cards {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 18px;
        font-size: 22px;
        font-weight: bold;
        color: #fff;
      }
    
    `
    #flipStyles = /* css */`
    .swiper-flip {
        width: ${this.#getCardWidt()};
        padding: 50px;
      }
  
      .swiper-slide-flip {
        background-position: center;
        background-size: cover;
        width: ${this.#getCardWidt()};
      }
  
      .swiper-slide-flip img {
        display: block;
        width: 100%;
      }
    
    `
    
    #coverflowStyles = /* css */`
    .swiper-coverflow {
        width: 100%;
        padding-top: 50px;
        padding-bottom: 50px;
      }
  
      .swiper-slide-coverflow {
        background-position: center;
        background-size: cover;
      }
  
      .swiper-slide-coverflow img {
        display: block;
        width: 100%;
      }
    `

    #cubeStyles = /* css */`
    .swiper-cube {
        width: ${this.#getCardWidt()};
        position: relative;
        left: 50%;
        top: 50%;
        margin-left: -150px;
        padding: 50px;
      }
  
      .swiper-slide-cube {
        background-position: center;
        background-size: cover;
      }
  
      .swiper-slide-cube img {
        display: block;
        width: 100%;
      }
    
    `

    #fadeStyles = /* css */`
    .swiper-fade {
        width: 100%;
        padding-top: 50px;
        padding-bottom: 50px;
      }
  
      .swiper-slide-fade {
        background-position: center;
        background-size: cover;
      }
  
      .swiper-slide-fade img {
        display: block;
        width: 100%;
      }


    `

    #parallaxStyles = /* css */`
    .swiper-parallax {
        width: 100%;
        height: 100%;
      }
  
      .swiper-slide-parallax {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 40px 60px;
        min-height: 50vh;
      }
  
      .parallax-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 130%;
        height: 100%;
        -webkit-background-size: cover;
        background-size: cover;
        background-position: center;
      }
  
      .swiper-slide-parallax .title {
        font-size: 2.5em;
        font-weight: 300;
        text-shadow: 2px 2px 4px #000000;
        text-align: left;
      }
  
      .swiper-slide-parallax .subtitle {        
        font-size: 2em;
        text-shadow: 2px 2px 4px #000000;
        text-align: left;
      }
  
      .swiper-slide-parallax .description {
        font-size: 1.5em;
        max-width: 600px;
        line-height: 1.3;
        text-shadow: 2px 2px 4px #000000;
        text-align: left;
      }
  
    `

    #defaultStyles = /* css */`
    .swiper-default {
        width: 100% ;
        height: 100%;
      }
  
      .swiper-slide-default {
        background-position: center;
        background-size: cover;
      }
  
      .swiper-slide-default img {
        display: block;
        width: 100%;
        max-height: 95vh;
      }

      .swiper-slide-default-container {
        position: absolute;
        bottom:5%; 
        padding-left:5%;
      }

      .slide-default-title {
        font-size: 2.5em;
        font-weight: 300;
        text-shadow: 2px 2px 4px #000000;
      }
  
      .slide-default-subtitle {
        font-size: 1.8em;
        font-weight: 300;
        text-shadow: 2px 2px 4px #000000;
      }
      .slide-default-description {
        font-size: 1em;
        font-weight: 300;
        max-width:80%;
        text-shadow: 2px 2px 4px #000000;
        margin-bottom:0.5em
      }
    `
    

    #productStyles = /* css */`

        .product-card {
            display: flex;
            flex-direction: column;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            width: ${this.#getCardWidt()} !important;
        }
        
        .product-image img {
            width: 100%;
            height: auto;
        }
        
        .product-info {
            padding: 20px;
            text-align: center;
        }
        
        .product-name {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 10px 0;
        }
        
        .product-description {
            font-size: 16px;
            margin: 0 0 20px 0;
        }
        
        .product-price {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 20px 0;
        }
        
        .cents {
            font-size: 16px;
            margin-top: 5px;
        }
                     
    `;

    #GetStyles(props){
        let stylesList = {fade:false,cube:false,coverflow:false,flip:false, cards:false,products:false,parallax:false}
        let stylesSetup = '';
        if (props!=undefined){
            props.forEach((swiper)=>{  
                let key = Object.keys(swiper)[0]
                if (swiper[key].setup?.effect != undefined){
                    let effect = swiper[key].setup.effect;
                    if (effect!=undefined){
                        if (stylesList[effect]===false){
                            stylesList[effect]=true;
                            switch(effect){
                                case 'fade':
                                    stylesSetup+= this.#fadeStyles;
                                    break;
                                case 'cube':
                                    stylesSetup+= this.#cubeStyles;
                                    break;
                                case 'coverflow':
                                    stylesSetup+= this.#coverflowStyles;
                                    break;
                                case 'flip':
                                    stylesSetup+= this.#flipStyles;
                                    break;
                                case 'cards':
                                    stylesSetup+= this.#cardsStyles;
                            }
                        }   
                    }
                    
                }
                if (swiper[key].setup?.products != undefined){
                    if (stylesList.products===false){
                        if (swiper[key].setup.products===true){
                            stylesList.products=true;
                            stylesSetup+= this.#productStyles;
                        }}
                }
                if (swiper[key].setup?.parallax != undefined){
                    if(stylesList.parallax===false){
                        stylesList.parallax=true;
                        stylesSetup+= this.#parallaxStyles;
                    }
                }
                if (swiper[key].setup?.effect === undefined&&swiper[key].setup?.parallax === undefined){               
                    stylesSetup+= this.#defaultStyles;
                }
            })
        }
        
        return stylesSetup;
    }


    #getSwiperConfig(props){
        let setup = {lazy:true}
        if (props.nav===true){
            setup.navigation = {
                nextEl: this.shadowRoot.querySelector(`.swiper-button-next-${props.id}`),
                prevEl: this.shadowRoot.querySelector(`.swiper-button-prev-${props.id}`),
              }
        }
        if (props.pagination!=undefined){
            let pagination = {el: this.shadowRoot.querySelector(`.swiper-pagination-${props.id}`)}
            setup.pagination = pagination
            if (props.pagination === 'fraction'|| props.pagination === 'progressbar'){
                setup.pagination.type = props.pagination;
            }
            if (props.pagination ==='dynamic'){
                setup.pagination.dynamicBullets = true;
            }
            if (props.pagination ==='bullets'){
                setup.pagination.clickable = true;
                setup.pagination.renderBullet = function (index, className) {
                    let bullet = '<span class="swiper-big-bullets ' + className + '">' + (index + 1) + "</span>";
                    return bullet;
                    }
            }
            if (props.pagination ==='dots'){
                setup.pagination.clickable = true;
            }
        }
        if (props.autoplay !=undefined){
            setup.autoplay={
                delay:props.autoplay
            };
        }
        if (props.loop ===true){
            setup.loop = true;
        }
        if (props.spaceBetween!=undefined){
            setup.spaceBetween = props.spaceBetween;
        }
        if (props.slidesPerView!=undefined){
            setup.slidesPerView = props.slidesPerView;
        }
        if (props.speed!=undefined){
            setup.speed = props.speed;
        }
        if (props.centeredSlides!=undefined){
            setup.centeredSlides = props.centeredSlides;
        }
        if (props.parallax===true){
            setup.parallax = true;
        } 
        switch(props.effect){ 
            case 'fade':
                setup.effect = 'fade';
                return setup;
            case 'cube': 
                setup.effect = 'cube';
                setup.grabCursor = true,
                setup.cubeEffect = this.#cube;
                return  setup;
            case 'coverflow': 
                setup.effect = 'coverflow';
                setup.grabCursor = true;
                setup.coverflowEffect = this.#coverFlow;
                return  setup
            case 'flip':
                setup.effect = 'flip';
                setup.grabCursor = true;
                return  setup;
            case 'cards':
                setup.effect = 'cards';
                setup.grabCursor = true;
                return  setup;
            default:  
                return setup
    }}

    #cube = {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    }

    #coverFlow = {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }

    #getClassName(effect){
        if (effect!=undefined){
            return effect;
        }else{
            return 'default';
        }
    }

    

    #getSlides(props, products=false, className, color, buttonColor, parallax){
        let slideHtml = ``;
        if(parallax===true){
            props.forEach((slide)=>{
                slideHtml+= `<div class="swiper-slide swiper-slide-parallax">`;
                    if(slide.title?.text[this.state.context.lang]!=undefined){
                        slideHtml+=`<div class="title" data-swiper-parallax="-300" style="color:${color};">${slide.title.text[this.state.context.lang]}</div>`
                    }
                    if(slide.subtitle?.text[this.state.context.lang]!=undefined){
                        slideHtml+=`<div class="subtitle" data-swiper-parallax="-300" style="color:${color};">${slide.subtitle.text[this.state.context.lang]}</div>`
                    }
                    if(slide.description?.text[this.state.context.lang]!=undefined){
                        slideHtml+=`<div class="description" data-swiper-parallax="-300" style="color:${color};"><p>${slide.description.text[this.state.context.lang]}</p></div>`
                    }
                    if(slide.call2Action!=undefined&&slide.ref!=undefined){
                        slideHtml+=`<button id="${slide.ref}" class="add-to-cart" style="background-color:${buttonColor}; color:${color};">${slide.call2Action[this.state.context.lang]}</button>`;
                    }
                slideHtml+= `</div>`;
            });
            return slideHtml;
        }else if (products===true){
            props.forEach((slide)=>{
                slideHtml+= `<div class="swiper-slide product-card">`;
                    if(slide.imgSrc!=undefined){
                        slideHtml+= `
                        <div class="product-image">
                        <img src="${slide.imgSrc}" loading="lazy">
                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                        </div>
                            `
                    }
                    slideHtml+=`<div class="product-info">`;                        
                        if(slide.title?.text[this.state.context.lang]!=undefined){
                            slideHtml+=`<h2 class="product-name">${slide.title.text[this.state.context.lang]}</h2>`
                        }
                        if(slide.description?.text[this.state.context.lang]!=undefined){
                            slideHtml+=`<p class="product-description">${slide.description.text[this.state.context.lang]}</p>`;
                        }
                        if(slide.price!=undefined){
                            slideHtml+=`<div class="product-price"  style="color:${buttonColor};">$${slide.price.toLocaleString('en')}<sup class="cents">${slide.cents}</sup></div>`;
                        }
                        if(slide.call2Action!=undefined&&slide.ref!=undefined){
                            slideHtml+=`<button id="${slide.ref}" class="add-to-cart" style="background-color:${buttonColor}; color:${color};">${slide.call2Action[this.state.context.lang]}</button>`;
                        }
                slideHtml+= `</div></div>`;
            });         
            return slideHtml;
        }else {
            props.forEach((slide)=>{
                slideHtml+= `<div class="swiper-slide swiper-slide-${className}" >`;
                slide.imgSrc != undefined?slideHtml += `<img src="${slide.imgSrc}" ${slide.title?.text!= undefined?alt="${slide.title?.text[this.state.context.lang]}":''} loading="lazy"/><div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>`:``;
                slideHtml+= `<div class="swiper-slide-default-container">`;
                    if(slide.title?.text[this.state.context.lang]!=undefined){
                        slideHtml+= `<div class="slide-default-title" style="color:${color};">${slide.title.text[this.state.context.lang]}</div>`;
                    }
                    if(slide.subtitle?.text[this.state.context.lang]!=undefined){
                        slideHtml+= `<div class="slide-default-subtitle" style="color:${color};">${slide.subtitle.text[this.state.context.lang]}</div>`;
                    }
                    if(slide.description?.text[this.state.context.lang]!=undefined){
                        slideHtml+= `<div class="slide-default-description" style="color:${color};">${slide.description.text[this.state.context.lang]}</div>`;
                    }
                    if(slide.call2Action!=undefined&&slide.ref!=undefined){
                        slideHtml+=`<button id="${slide.ref}" class="add-to-cart" style="background-color:${buttonColor}; color:${color};">${slide.call2Action[this.state.context.lang]}</button>`;
                    }
                slideHtml+= `</div>`;
                slideHtml+= `</div>`;
            });
            return slideHtml;
        }       
    }


    #getSwipers(){
        let swipersHtml = ``;
        if (this.state.swipers!=undefined){
            this.state.swipers.forEach((swiper)=>{
                let key = Object.keys(swiper)[0]
                let products = swiper[key].setup?.products!=undefined?swiper[key].setup.products:false;
                let className = this.#getClassName(swiper[key].setup?.effect);
                if (swiper[key].setup?.parallax===true){
                    className = 'parallax';
                }
                let color;
                swiper[key].setup?.color===undefined?color = "#fff":color=swiper[key].setup.color;
                let buttonColor;
                swiper[key].setup?.buttonColor===undefined?buttonColor = "#3089cc":buttonColor=swiper[key].setup.buttonColor;
                swipersHtml += /* html */`
                <div style="--swiper-navigation-color: ${color}; --swiper-pagination-color: ${color}" class="swiper ${key} swiper-${className}">
                    ${swiper[key].setup?.parallax!=undefined&&swiper[key].setup.parallaxImg!=undefined?`<div class="parallax-bg" style="background-image: url(${swiper[key].setup.parallaxImg});" data-swiper-parallax="-23%"></div>`:``}
                    <div class="swiper-wrapper">
                        ${this.#getSlides(swiper[key].slides, products, className, color, buttonColor, swiper[key].setup?.parallax)}
                    </div>
                    ${swiper[key].setup?.pagination!=undefined?`<div class="swiper-pagination swiper-pagination-${key}"></div>`:''}  
                    ${swiper[key].setup?.navigation===true?`<div class="swiper-button-next swiper-button-next-${key}"></div><div class="swiper-button-prev swiper-button-prev-${key}"></div>`:''}
                </div>
                `
                });
            }else{
                console.warn('SwiperElement: No swipers to show')
            }
        return swipersHtml;
    }

    #setupSwipers(){
        if (this.state.swipers!=undefined){
            this.state.swipers.forEach((swiper)=>{
                let props = {}
                let key = Object.keys(swiper)[0];
                if (swiper[key].setup!=undefined){
                    props = swiper[key].setup;
                }
                props.id = key;
                var swiper = new Swiper(this.shadowRoot.querySelector(`.${key}`), this.#getSwiperConfig(props));            
            })
            this.addEvents()
        }
    }

    handleEvent(event) {
        console.log('Huy')
        if (event.type === "click") {
            let eventName;
            if(this.state.eventName===undefined){
              eventName = "user:click-swipers"
            }else {
              eventName = this.state.eventName
            }
            const clickFunnel = new CustomEvent(eventName,{
            detail:{click:event.target.id},
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(clickFunnel);
        }
    }


    addEvents(){
        let buttons = this.querySelectorAll(".add-to-cart");
        if (buttons.length>0){
          buttons.forEach((item)=>{
            item.addEventListener("click",this)
          });    
        }  
      }

    renderedcallback(){
        let buttons = this.querySelectorAll(".add-to-cart");
        if (buttons.length>0){
          buttons.forEach((item)=>{
            item.addEventListener("click",this)
          });    
        }  
      }

    render(){
        this.shadowRoot.innerHTML = /* html */`
            <style>
                ${this.#swiperStyles}
                ${this.#GetStyles(this.state.swipers)}
            </style>
            <div class="has-text-${this.state.textAlign} p-4" style="background-color:${this.state.backgroundColor}"> 
                ${this.state.title != undefined?`<h1 style="color:${this.state.headingCoror}">${this.state.title.text[this.state.context.lang]}</h1>`:``}
                ${this.state.subtitle != undefined?`<h2 style="color:${this.state.headingCoror}">${this.state.subtitle.text[this.state.context.lang]}</h2>`:``}
                ${this.#getSwipers()}
            </div>
        `;
        this.#setupSwipers();
    }
}

customElements.define("swiper-element", SwiperElement);