import { AppElement } from "@customerjourney/cj-core";
import { CjSwiper } from "./CjSwiper";

export class MultiSlider extends AppElement {

    #defaultData = {context:{
        lang:"es"
        }
    }

    constructor(props={}){
        super();
        this.eventName = "user:click-multi-slider";
        this.state =this.initState(this.#defaultData,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.swiper = new CjSwiper();
    }

    #ballsStyles = /*CSS*/`
    .swiper-pagination-bullet-big {
      width: 20px !important;
      height: 20px !important;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
    }
    `;

    #fadeStyles = /*CSS*/`
      swiper-fade {
        width: 100%;padding-top: 
        50px;padding-bottom: 50px;
        }
      .swiper-slide-fade {
        background-position: center;
        background-size: cover;
      }
  
      .swiper-slide-fade img {
        display: block;
        width: 100%;
      }
      `;

    #coverflowStyles = /*CSS*/`
    .swiper-coverflow {
        width: 100%;
        padding-top: 50px;
        padding-bottom: 50px;
      }
  
      .swiper-slide-coverflow {
        background-position: center;
        background-size: cover;
        width: 300px;
      }`;

    #parallax = /*CSS*/`
    .bjs-parallax-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 130%;
      height: 100%;
      -webkit-background-size: cover;
      background-size: cover;
      background-position: center;
    }    
    .swiper-slide-parallax {
      color: #fff;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 40px 60px;
      text-shadow: 2px 2px 4px #000000;
    }
    .swiper-slide-parallax .content {
      max-width: 400px;
      line-height: 1.3;
    }
    .swiper-slide-parallax .subtitle {
      max-width: 400px;
      line-height: 1.3;
    }
    `;

    #default = /*CSS*/`x
    .swiper-default {
      width: 100%;
    }    
    .swiper-slide-default {
      background-position: center;
      background-size: cover;
      }    
    `;

    #GetStyles(swipers=[]){
        let stylesList = {fade:false,cube:false,coverflow:false,flip:false, cards:false,parallax:false}
        let stylesSetup = '';
        if (swipers.length>0){
            swipers.forEach(swiper=>{
                if (swiper.setup?.effect!=undefined){
                    let effect = swiper.setup.effect
                    if (stylesList[effect]===false){
                        stylesList[effect]=true;
                            switch(effect){
                                case 'fade':
                                    stylesSetup+= this.#fadeStyles;
                                    break;
                                case 'coverflow':
                                    stylesSetup+= this.#coverflowStyles;
                                    break;
                                case 'parallax':
                                    stylesSetup+=`.swiper-parallax { width: 100%; height: ${swiper.setup?.height||'600px'}; background: #000;}`;
                                    stylesSetup+= this.#parallax;
                                default:
                                  stylesSetup+=`.swiper-slide-default {background-position: center;background-size: cover; height: ${swiper.setup?.height||'600px'};}`;
                                    stylesSetup+= this.#default;
                            }
                    }
                }
            })
        }
        return stylesSetup;
    }

    render(){
        this.innerHTML =  /* html */`        
            <style>
                ${this.#ballsStyles}
                ${this.#GetStyles(this.state.swipers)}
            </style>
        <section ${this.getClasses(["section"], this.state?.classList)} ${this.setAnimation(this.state.animation)} ${this.getBackground()}>
            <div class="${this.state?.wide===true?'':'container'} py-4">
                ${this.getTitles()}
                ${this.swiper.render(this.state.swipers, this.state.context)}
            </div>
        </section>
        `;
        this.swiper.setup();
        this.addEvents();
    }

}

customElements.define("multi-slider", MultiSlider)
