import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { gsap } from 'gsap';
import { PersonalizationService } from '../../services/personalization.service';

@Component({
  selector: 'app-envelope',
  standalone: true,
  templateUrl: './envelope.component.html',
  styleUrl: './envelope.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnvelopeComponent implements AfterViewInit {
  @ViewChild('flap', { static: true })
  private readonly flap!: ElementRef<HTMLDivElement>;

  @ViewChild('letter', { static: true })
  private readonly letter!: ElementRef<HTMLDivElement>;

  readonly isOpen = signal(false);
  readonly personalization = inject(PersonalizationService);

  private readonly destroyRef = inject(DestroyRef);
  private readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private timeline?: gsap.core.Timeline;

  ngAfterViewInit(): void {
    if (this.reducedMotion) {
      return;
    }

    this.timeline = gsap.timeline({ paused: true })
      .to(this.flap.nativeElement, {
        rotateX: -180,
        duration: 0.55,
        ease: 'power2.inOut'
      }, 0)
      .to(this.letter.nativeElement, {
        yPercent: -95,
        duration: 0.65,
        ease: 'power2.out'
      }, 0.55)
      .set(this.letter.nativeElement, { zIndex: 6 }, 0.55);

    this.destroyRef.onDestroy(() => this.timeline?.kill());
  }

  toggle(): void {
    const nextOpen = !this.isOpen();
    this.isOpen.set(nextOpen);

    if (this.reducedMotion) {
      this.flap.nativeElement.style.transform = nextOpen ? 'rotateX(-180deg)' : 'rotateX(0deg)';
      this.letter.nativeElement.style.transform = nextOpen ? 'translateY(-95%)' : 'translateY(0)';
      this.letter.nativeElement.style.zIndex = nextOpen ? '6' : '';
      return;
    }

    if (nextOpen) {
      this.timeline?.play();
    } else {
      this.timeline?.reverse();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }
}