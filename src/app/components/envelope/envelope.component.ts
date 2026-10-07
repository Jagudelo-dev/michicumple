import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, HostBinding, HostListener, ViewChild, inject, signal } from '@angular/core';
import { gsap } from 'gsap';
import { birthdayTexts } from '../../data/texts';

@Component({
  selector: 'app-envelope',
  standalone: true,
  templateUrl: './envelope.component.html',
  styleUrl: './envelope.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnvelopeComponent implements AfterViewInit {
  @ViewChild('scene', { static: true })
  private readonly scene!: ElementRef<HTMLDivElement>;

  @ViewChild('backdrop', { static: true })
  private readonly backdrop!: ElementRef<HTMLDivElement>;

  @ViewChild('flap', { static: true })
  private readonly flap!: ElementRef<HTMLDivElement>;

  @ViewChild('letter', { static: true })
  private readonly letter!: ElementRef<HTMLDivElement>;

  readonly isOpen = signal(false);
  readonly state = signal<'closed' | 'opening' | 'open' | 'closing'>('closed');
  readonly texts = birthdayTexts;

  @HostBinding('class.modal-open')
  private get modalOpen(): boolean {
    return this.state() !== 'closed';
  }

  private readonly destroyRef = inject(DestroyRef);
  private readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private timeline?: gsap.core.Timeline;

  ngAfterViewInit(): void {
    if (this.reducedMotion) {
      return;
    }

    this.destroyRef.onDestroy(() => this.timeline?.kill());
  }

  open(): void {
    if (this.isOpen()) {
      return;
    }

    const bounds = this.scene.nativeElement.getBoundingClientRect();
    const offsetX = bounds.left + bounds.width / 2 - window.innerWidth / 2;
    const offsetY = bounds.top + bounds.height / 2 - window.innerHeight / 2;
    const initialScale = Math.min(0.72, window.innerWidth * 0.8 / Math.max(bounds.width, 1));
    this.isOpen.set(true);
    this.state.set('opening');

    if (this.reducedMotion) {
      this.openInstantly();
      this.state.set('open');
      return;
    }

    gsap.set(this.backdrop.nativeElement, { opacity: 0 });
    gsap.set(this.scene.nativeElement, {
      x: offsetX,
      y: offsetY,
      scale: initialScale,
      rotation: 0,
      transformOrigin: 'center center'
    });
    gsap.set(this.letter.nativeElement, {
      autoAlpha: 0,
      yPercent: 18,
      zIndex: 6
    });

    this.timeline?.kill();
    this.timeline = gsap.timeline({
      paused: true,
      onComplete: () => this.state.set('open')
    })
      .to(this.backdrop.nativeElement, { opacity: 1, duration: 0.25, ease: 'power1.out' }, 0)
      .to(this.scene.nativeElement, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, 0)
      .to(this.scene.nativeElement, {
        keyframes: [
          { rotation: 3, x: 2 },
          { rotation: -3, x: -2 },
          { rotation: 3, x: 2 },
          { rotation: -3, x: -2 },
          { rotation: 0, x: 0 }
        ],
        duration: 0.5,
        ease: 'sine.inOut'
      })
      .to(this.flap.nativeElement, {
        rotateX: -180,
        duration: 0.4,
        ease: 'power2.inOut'
      })
      .to(this.letter.nativeElement, {
        right: '5%',
        bottom: '4%',
        left: '5%',
        height: '72vh',
        maxHeight: '80vh',
        yPercent: 0,
        autoAlpha: 1,
        zIndex: 6,
        duration: 0.55,
        ease: 'power2.out'
      }, '<0.05')
      .to(this.scene.nativeElement.querySelectorAll('.envelope-body, .envelope-pocket, .seal, .open-label'), {
        opacity: 0,
        duration: 0.2
      }, '<');

    this.timeline.play();
  }

  close(): void {
    if (!this.isOpen()) {
      return;
    }

    if (this.reducedMotion) {
      this.closeInstantly();
      return;
    }

    this.state.set('closing');
    this.timeline?.eventCallback('onReverseComplete', () => {
      gsap.set(this.scene.nativeElement, { clearProps: 'transform' });
      gsap.set(this.backdrop.nativeElement, { clearProps: 'opacity' });
      gsap.set(this.letter.nativeElement, {
        clearProps: 'right,bottom,left,height,maxHeight,yPercent,zIndex,opacity,visibility'
      });
      this.isOpen.set(false);
      this.state.set('closed');
    });
    this.timeline?.reverse();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === this.backdrop.nativeElement) {
      this.close();
    }
  }

  onEnvelopeKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.open();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }

  private openInstantly(): void {
    this.flap.nativeElement.style.transform = 'rotateX(-180deg)';
    this.letter.nativeElement.style.right = '5%';
    this.letter.nativeElement.style.bottom = '4%';
    this.letter.nativeElement.style.left = '5%';
    this.letter.nativeElement.style.height = '72vh';
    this.letter.nativeElement.style.maxHeight = '80vh';
    this.letter.nativeElement.style.zIndex = '6';
    this.letter.nativeElement.style.opacity = '1';
    this.letter.nativeElement.style.visibility = 'visible';
    this.backdrop.nativeElement.style.opacity = '1';
  }

  private closeInstantly(): void {
    this.isOpen.set(false);
    this.state.set('closed');
    this.flap.nativeElement.style.transform = '';
    this.letter.nativeElement.removeAttribute('style');
    this.backdrop.nativeElement.style.opacity = '';
    this.scene.nativeElement.removeAttribute('style');
  }
}