import { AfterViewInit, Component } from '@angular/core';
import { TweenMax, Power1 } from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  // CONST
  VW;
  VH;
  AR;
  IS_ACTIVE = 'is-active';

  // VARS
  isAnimating = false;
  currentImage = 0;
  prevImage = 0;
  currentLink;
  imagesloaded = 0;
  partMove = {
    val: 1,
  };
  slideshowInterval;

  // IMAGES STUFF
  imagesList = [];
  linkList = [];
  imgW;
  imgH;
  IAR;

  // CANVAS STUFF

  canvas0;
  canvas1;
  canvas2;
  canvas3;
  ctx0;
  ctx1;
  ctx2;
  ctx3;
  linklist;
  btns;
  nextBtn;
  loadTxt;
  partList;

  ngAfterViewInit(): void {
    this.canvas0 = document.getElementById('canvas0') as HTMLCanvasElement;
    this.ctx0 = this.canvas0.getContext('2d');
    this.canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
    this.ctx1 = this.canvas1.getContext('2d');
    this.canvas2 = document.getElementById('canvas2') as HTMLCanvasElement;
    this.ctx2 = this.canvas2.getContext('2d');
    this.canvas3 = document.getElementById('canvas3') as HTMLCanvasElement;
    this.ctx3 = this.canvas3.getContext('2d');
    this.linklist = document.querySelector('.link-list');
    this.btns = document.querySelector('.btns');
    this.nextBtn = this.btns.querySelector('.show-next');
    this.loadTxt = document.querySelector('.loading-txt');
    this.partList = [
      {
        context: this.ctx1,
        xpos: 100,
        radius: 0, // circumference of mask1
      },
      {
        context: this.ctx2,
        xpos: -70,
        radius: 0, // circumference of mask2
      },
      {
        context: this.ctx3,
        xpos: 50,
        radius: 0, // circumference of mask3
      },
    ];
    this.preInit();
  }

  drawImages() {
    const imgPrev = this.imagesList[this.prevImage];
    const imgNext = this.imagesList[this.currentImage];

    // This is Next
    this.ctx0.globalAlpha = 1;
    this.ctx0.drawImage(imgNext, 0, 0, this.imgW, this.imgH);

    // This is Prev
    this.ctx0.globalAlpha = this.partMove.val;
    this.ctx0.drawImage(imgPrev, 0, 0, this.imgW, this.imgH);

    let obj, ctx, xPrev, xNext;
    for (var i = 0; i < this.partList.length; i++) {
      obj = this.partList[i];
      ctx = obj.context;
      xPrev = -obj.xpos * (1 - this.partMove.val);
      xNext = obj.xpos * this.partMove.val;

      ctx.clearRect(0, 0, this.VW, this.VH);

      ctx.save();
      ctx.beginPath();
      ctx.arc(this.VW / 2, this.VH / 2, obj.radius, 0, 2 * Math.PI, false);
      ctx.fill();

      // This is Next
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-in';
      ctx.drawImage(imgNext, xNext, 0, this.imgW, this.imgH);

      // This is Prev
      ctx.globalAlpha = this.partMove.val;
      ctx.globalCompositeOperation = 'source-atop';
      ctx.drawImage(imgPrev, xPrev, 0, this.imgW, this.imgH);

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;

      if (i === 0) {
        // 				if (i !== partList.length-1) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#fff';
        ctx.stroke();
      }

      // ctx.restore();
    }
  }

  changeImage() {
    // Do not interupt previous movement
    if (this.isAnimating) {
      return;
    }

    this.isAnimating = true;

    TweenMax.to(this.partMove, 1, {
      val: 0,
      ease: Power1.easeInOut,
      onUpdate: () => this.drawImages(),
      onComplete: () => {
        this.partMove.val = 1;
        this.isAnimating = false;
      },
    });
  }

  onBtnsClick(e) {
    e.preventDefault();
    // Do not interupt previous animation
    if (this.isAnimating) {
      return;
    }

    const trgt = e.target;
    if (trgt.nodeName === 'BUTTON') {
      this.prevImage = this.currentImage;

      if (trgt.classList.contains('show-next')) {
        this.currentImage + 1 >= this.imagesList.length
          ? (this.currentImage = 0)
          : this.currentImage++;
      } else {
        this.currentImage - 1 < 0
          ? (this.currentImage = this.imagesList.length - 1)
          : this.currentImage--;
      }

      this.changeImage();
      this.selectLink();

      clearInterval(this.slideshowInterval);
    }
  }

  onListClick(e) {
    debugger;
    e.preventDefault();

    // Do not interupt previous animation
    if (this.isAnimating) {
      return;
    }

    const trgt = e.target;

    if (trgt.nodeName === 'A') {
      this.prevImage = this.currentImage;
      this.currentImage = parseInt(trgt.getAttribute('data-order'), 10);
      this.changeImage();
      this.selectLink();
      clearInterval(this.slideshowInterval);
    }
  }

  selectLink() {
    if (this.currentLink !== undefined) {
      this.currentLink.classList.remove(this.IS_ACTIVE);
    }
    this.currentLink = this.linkList[this.currentImage];
    this.currentLink.classList.add(this.IS_ACTIVE);
  }

  calculateScreen() {
    this.VW = window.innerWidth;
    this.VH = window.innerHeight;
    this.AR = this.VW / this.VH;

    this.canvas0.width =
      this.canvas1.width =
      this.canvas2.width =
      this.canvas3.width =
        this.VW;
    this.canvas0.height =
      this.canvas1.height =
      this.canvas2.height =
      this.canvas3.height =
        this.VH;

    this.partList[0].radius = this.VW * 0.4;
    this.partList[1].radius = this.VW * 0.25;
    this.partList[2].radius = this.VW * 0.08;
  }

  resizeBg() {
    const image1 = this.imagesList[0];
    this.IAR = image1.width / image1.height;
    if (this.IAR < this.AR) {
      this.imgW = this.VW;
      this.imgH = this.VW / this.IAR;
    } else {
      this.imgW = this.VH * this.IAR;
      this.imgH = this.VH;
    }
  }

  slideshowChange() {
    this.prevImage = this.currentImage;
    this.currentImage + 1 >= this.imagesList.length
      ? (this.currentImage = 0)
      : this.currentImage++;
    this.changeImage();
    this.selectLink();
  }

  addEL() {
    var debounceResize = this.debounce(
      () => {
        this.calculateScreen();
        this.resizeBg();
        this.changeImage();
      },
      200,
      null
    );

    window.addEventListener('resize', debounceResize);
    this.linklist.addEventListener('click', this.onListClick);
  }

  handleImageComplete() {
    debugger;
    this.imagesloaded++;
    if (this.imagesloaded === this.imagesList.length) {
      this.loadTxt.classList.add('is-hidden');
      this.addEL();
      this.init();
    }
  }

  preloadImages() {
    debugger;
    this.imagesList.forEach((img) => {
      if (img.complete) {
        this.handleImageComplete();
      } else {
        img.onload = this.handleImageComplete;
      }
    });
  }

  init() {
    this.calculateScreen();
    this.resizeBg();
    this.selectLink();
    this.changeImage();
    this.slideshowInterval = setInterval(() => this.slideshowChange(), 3000);
  }

  preInit() {
    this.createImgList();
    this.preloadImages();
  }

  createImgList() {
    debugger;
    const alist = this.linklist.querySelectorAll('a');
    let img;

    for (var i = 0; i < alist.length; i++) {
      this.linkList.push(alist[i]);

      img = new Image();
      img.src = alist[i].getAttribute('data-imagesrc');
      this.imagesList.push(img);
    }
  }

  debounce(func, wait, immediate) {
    let timeout;
    return () => {
      let context = this,
        args = arguments;
      let later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}
