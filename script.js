const cursor=document.querySelector('.cursor')
const imageWrapper=document.querySelector('.image-wrapper')


function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function cursorAnimation(){
    document.addEventListener('mousemove',(e)=>{
        gsap.to('.cursor',{
            left:e.x,
            top:e.y
        })
    })
    
    
    imageWrapper.addEventListener('mouseenter',()=>{
        gsap.to('.cursor',{
            scale:1,
            opacity:1
        })
    })
    imageWrapper.addEventListener('mouseleave',()=>{
        gsap.to('.cursor',{
            scale:0,
            opacity:0,
        })
    })
}

function navAnimation(){
    gsap.to('.menu',{
        transform:'translateY(-100%)',
        scrollTrigger:{
            trigger:'.menu',
            scroller:'.main',
            start:'top -5%',
            scrub:1
        }
        
    })
    gsap.to('.logo',{
        transform:'translateY(-110%)',
        scrollTrigger:{
            trigger:'.logo',
            scroller:'.main',
            start:'top -5%',
            scrub:1
        }
        
    })
}

function titleAnimation(){
    gsap.to('.page-1 .animate-h1 h1',{
        opacity:1,
        transform:'translateY(0)',
        stagger:0.3
    })
}

function imageAnimation(){

    gsap.from('.page-1 .image-container',{
        opacity:0,
        scale:1.1,
        delay:1
    })

    gsap.from('.page-5-conleft,.page-5-conright div',{
        opacity:0,
        stagger:0.2,
        scale:1.1,
        scrollTrigger:{
            trigger:'.conright-left,.conright-right',
            scroller:'.main',
            start:'top 50%',
        }
    })

    gsap.from('.image-1-div,.image-2-div',{
        opacity:0,
        y:40,
        stagger:0.2,
        scrollTrigger:{
            trigger:'.image-1-div,.image-2-div',
            scroller:'.main',
            start:'top 50%',
        }
    })

    gsap.from('.image-3-div,.image-4-div',{
        opacity:0,
        y:40,
        stagger:0.2,
        scrollTrigger:{
            trigger:'.image-3-div,.image-4-div',
            scroller:'.main',
            start:'top 50%',
        }
    })
    
    gsap.from('.page-2-imgcon div',{
        opacity:0,
        scale:1.1,
        scrollTrigger:{
            trigger:'.page-2-imgcon div',
            scroller:'.main',
            start:'top 50%',
        }
    })

    gsap.from('.page-3 .row',{
        opacity:0,
        scale:1.1,
        scrollTrigger:{
            trigger:'.page-2-imgcon div',
            scroller:'.main',
            start:'top 50%',
        }
    })

  
    

}

function footerAnimation(){
    gsap.from('input,form button,.row-left,.row-center,.row-right,.footer-row-2,.footer>p',{
        opacity:0,
        y:40,
        stagger:0.2,
        scrollTrigger:{
            trigger:'input',
            scroller:'.main',
            start:'top 70%',
        }
    })

}

loco()
cursorAnimation()
navAnimation()
titleAnimation()
imageAnimation()
footerAnimation()
