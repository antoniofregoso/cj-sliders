import Swiper from "swiper/bundle";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Remarkable } from "remarkable";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faStar } from '@fortawesome/free-solid-svg-icons';

export class CjSwiper {

    constructor(context= {lang:"en"}){
        this.context = context;
        this.md = new Remarkable();
    }

    #getYoutube(src){
        return `
        <iframe width="100%" height="100%" src="${src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        `
    }

    #getSlides(swiper={}){
        let slidesHtml = '';
        if (swiper.slides.length>0&&swiper.slides!=undefined){
            swiper.slides.forEach((item)=>{
                let slide = /*html*/`
                <div class="swiper-slide">
                <figure class="image ${item.image?.ratio!=undefined?item.image.ratio:'is-16by9'}">
                    ${item.image?.src!=undefined?item.image.src.includes("https://www.youtu")?this. #getYoutube(item.image.src):item.image?.href!=undefined?`<a href="${item.image.href}" ><img src="${item.image.src}" /></a>`:`<img src="${item.image.src}" />`:''}
                    </figure>
                </div>
                ${item.content!=undefined?`
                <div class="is-overlay" style="padding:5%;">
                    <div ${this.#getClasses([""], item.content?.classList)} style="width:50%; padding:3%; position: relative; top: 50%; -webkit-transform: translateY(-50%); -ms-transform: translateY(-50%);transform: translateY(-50%);">
                        ${item.content?.title?.text[this.context.lang]!=undefined?`
                        <p ${this.#getClasses(["title"], item.content.title?.classList)}>${item.content.title.text[this.context.lang]}</p>
                        `:'' }
                        ${item.content?.subtitle?.text[this.context.lang]!=undefined?`
                        <p ${this.#getClasses(["subtitle"], item.content.subtitle?.classList)}>${item.content.subtitle.text[this.context.lang]}</p>
                        `:'' }
                        ${item.content?.description?.text[this.context.lang]!=undefined?`
                        <div ${this.#getClasses(["content"], item.content.description?.classList)}>${this.md.render(item.content.description.text[this.context.lang])}</div>
                        `:'' } 
                    </div>
                </div>                    
                    `:''}
                `;
                slidesHtml += slide;
            });
        }
        return slidesHtml
    }

    /**
     * Add the additional classes sent to the component props
     * 
     * @param {string} defaultClass 
     * @param {string} optionalClasses 
     */
    #getClasses(defaultClass=[], optionalClasses){
        let resultClasses = [];
        if (optionalClasses===undefined){
            resultClasses = defaultClass
        }else{
            resultClasses = [...defaultClass, ...optionalClasses]
        }
        let classes = '';
        if (resultClasses.length>0){
            classes = `class="${resultClasses.toString().replaceAll(",", " ")}"`;
        }
        return classes;
    }


    #getFooter(props){
        if(props!=undefined){
            let render = '';
            Object.entries(props).forEach(([key, value])=>{                
                render += `<button class="card-footer-item"  id="${props[key]['id']}">
                    ${props[key]['text'][this.context.lang]}
                </button>`;
            });
            return render;
        }else return '';
    }
    

    #getCards(swiper={}){
        let slidesHtml = '';
        if (swiper.slides.length>0&&swiper.slides!=undefined){
            swiper.slides.forEach((item)=>{
                let slide =`
                <div class="swiper-slide${swiper.setup?.effect!=undefined?` swiper-slide-${swiper.setup.effect}`:''} card">
                ${item.header?.text[this.context.lang]!=undefined?`
                    <header ${this.#getClasses(["card-header"], item.header?.classList)}>
                        <p class="card-header-title">Card header</p>
                    </header>
                    `:''}                
                    ${item.image?.src!=undefined?`
                    <div class="card-image">
                        <figure ${this.#getClasses(["image"], item.image.classList)} >
                            ${item.image?.src!=undefined?item.image.src.includes("youtu")?this. #getYoutube(item.image.src):`<img src="${item.image.src}" />`:''}
                        </figure>
                    </div>
                        `:''}
                    ${item.content!=undefined?`
                        <div class="card-content">
                        ${item.content?.title?.text[this.context.lang]!=undefined?`
                        <p ${this.#getClasses(["title"], item.content?.title?.classList)}>
                            ${item.content.title.text[this.context.lang]}
                        </p>
                        `:''}
                        ${item.content?.subtitle?.text[this.context.lang]!=undefined?`
                        <p ${this.#getClasses(["subtitle"], item.content?.subtitle?.classList)}>
                            ${item.content.subtitle.text[this.context.lang]}
                        </p>
                        `:''}
                        ${item.content?.description?.text[this.context.lang]!=undefined?`
                        <div ${this.#getClasses(["content"], item.content?.description?.classList)}>
                            ${this.md.render(item.content.description.text[this.context.lang])}
                        </div>
                        `:''}
                        </div>  
                        `:''}
                        ${item.footer?.buttons!=undefined?`
                            <footer ${this.#getClasses(["card-footer"], item.footer?.classList)}>
                                ${this.#getFooter(item.footer.buttons)}
                            </footer>
                                `:''}
                </div> 
                `;
                slidesHtml += slide;
            });
        }
        return slidesHtml
    }

    #star = icon(faStar, {classes: ['fa-xs','has-text-dark']}).html[0];
    #starOk = icon(faStar, {classes: ['fa-xs','has-text-warning']}).html[0];

    #getStars(rating){
        let stars = '';
        let noSelected = 5 - rating;
        if (rating>0){
            for (let i = 1; i <= rating; i++) {
                stars+= `<span class="icon">${this.#starOk}</span>`;
                }
            }
        if (noSelected>0){
            for (let i = 1; i <= noSelected; i++) {
                stars+= `<span class="icon">${this.#star}</span>`;
                }
            }
        return stars;
        }
    

    #getMediaObjects(swiper={}){
        let slidesHtml = '';
        if (swiper.slides.length>0&&swiper.slides!=undefined){
            swiper.slides.forEach((item)=>{
                let slide =`
                <div class="swiper-slide${swiper.setup?.effect!=undefined?` swiper-slide-${swiper.setup.effect}`:''}">
                <div class="media">
                ${item.imageL?.src!=undefined?`
                <figure class="media-left">
                    <p class="image is-64x64">
                    <img src="${item.imageL.src}" />
                    </p>
                </figure>`:''}
                <div class="media-content">
                    <div ${this.#getClasses(["content"], item.description?.classList)}>
                        ${item.review?.rating!=undefined?`<span class="icon-text">${this.#getStars(item.review.rating)}${item.review?.text?.[this.context.lang]!==undefined?`<span>${item.review?.text[this.context.lang]}</span>`:''}</span>`:''}
                        ${item.description?.text[this.context.lang]!=undefined?`${this.md.render(item.description.text[this.context.lang])}`:''}
                    </div>
                </div>
                ${item.imageR?.src!=undefined?`
                <figure class="media-right">
                    <p class="image is-64x64">
                    <img src="${item.imageR.src}" />
                    </p>
                </figure>`:''}
                </div>
                </div>`;
                slidesHtml += slide;
            });
        }
        return slidesHtml
    }

    #getParallax(swiper={}){
        let slidesHtml = '';
        if (swiper.slides.length>0&&swiper.slides!=undefined){
            swiper.slides.forEach((item)=>{
                let slide = /*html*/`
                <div class="swiper-slide swiper-slide-parallax" >
                    ${item.title?.text[this.context.lang]!=undefined?`
                    <div class="title" data-swiper-parallax="-300"> ${item.title.text[this.context.lang]}</div>`:''}
                    ${item.subtitle?.text[this.context.lang]!=undefined?`
                        <div class="subtitle" data-swiper-parallax="-200">${item.subtitle.text[this.context.lang]}</div>`:''}
                    ${item.description?.text[this.context.lang]!=undefined?`
                    <div class="content" data-swiper-parallax="-100">
                        ${this.md.render(item.description.text[this.context.lang])}
                    </div>
                        `:''}
                </div>
                `;
                slidesHtml += slide;
            });
        }
        return slidesHtml
    }

    #getSwipers(){
        let swipersHtml = ``;
        if (this.state!=undefined&&Object.keys(this.state).length>0){
            this.state.forEach((swiper)=>{
                let cards = swiper.setup?.cards||false;
                let mediaObjects = swiper.setup?.mediaObjects||false;
                let effect = swiper.setup?.effect||'default';
                let navigationColor = swiper.setup.navigationColor||'#ffffff';
                let paginationColor = swiper.setup.paginationColor||'#ffffff';
                let paginationGap = swiper.setup.paginationGap||false;
                let result;
                if (cards === true) {
                    result = this.#getCards(swiper);
                } else if (mediaObjects === true) { 
                    result = this.#getMediaObjects(swiper);
                } else if (effect === 'parallax') {
                    result = this.#getParallax(swiper);
                } else {
                    result = this.#getSlides(swiper);
                }
                let layout = /*html*/`
                <div style="--swiper-navigation-color: ${navigationColor}; --swiper-pagination-color: ${paginationColor}" class="swiper ${swiper.id}${swiper.setup?.effect!=undefined?` swiper-${swiper.setup.effect}`:''}">
                    ${effect==='parallax'?`
                    <div class="bjs-parallax-bg" style="background-image: url(${swiper.setup.parallaxImage});" data-swiper-parallax="-23%"></div>`:''}
                    <div class="swiper-wrapper"${paginationGap===true?' style="margin-bottom:30px;"':''}>
                        ${result}
                    </div>
                ${swiper.setup?.navigation==true?`
                    <div class="swiper-button-next swiper-button-next-${swiper.id}"></div>
                    <div class="swiper-button-prev swiper-button-prev-${swiper.id}"></div>    
                        `:''}
                    ${swiper.setup?.pagination!=undefined?`<div class="swiper-pagination swiper-pagination-${swiper.id}"></div>`:''}
                </div>
                `;
                swipersHtml += layout;
                return swipersHtml
            })
        }else{
            console.warn('SwiperElement: No swipers to show')
        }
    return swipersHtml;
    }

    setup(){
        if (this.state!=undefined&&Object.keys(this.state).length>0){
            this.state.forEach((item)=>{
                item.setup.id = item.id;
                var swiper = new Swiper(`.${item.id}`, this.#getSwiperConfig(item.setup));
            })
        };
    }

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

    #getSwiperConfig(props){
        let setup = {lazy:true}
        if (props.navigation==true){
            setup.navigation = {
                nextEl:  `.swiper-button-next-${props.id}`,
                prevEl:  `.swiper-button-prev-${props.id}`,
                }
        }
        if (props.pagination!=undefined){
            let pagination = {el: `.swiper-pagination-${props.id}`}
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
                    let bullet = '<span class="swiper-pagination-bullet-big ' + className + '">' + (index + 1) + "</span>";
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
            case 'parallax':
                setup.parallax = true;

            case 'fade':
                setup.effect = 'fade';
                setup.spaceBetween = 30;
                return setup;
            case 'coverflow': 
                setup.effect = 'coverflow';
                setup.grabCursor = true;
                setup.centeredSlides = true,
                setup.slidesPerView = "auto",
                setup.coverflowEffect = this.#coverFlow;
                return  setup
            default:  
                return setup
        }
    }


    render(props={}, context={lang:"en"}){
        this.context = context;
        this.state = props;
        return  this.#getSwipers();
    }

}

