import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import Snowflakes from 'magic-snowflakes';
import { gsap } from 'gsap';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements AfterViewInit {
  @Output() readonly started = new EventEmitter<void>();

  @ViewChild('crtContent', { static: true })
  private readonly crtContent!: ElementRef<HTMLDivElement>;

  @ViewChild('flash', { static: true })
  private readonly flash!: ElementRef<HTMLDivElement>;

  @ViewChild('blackout', { static: true })
  private readonly blackout!: ElementRef<HTMLDivElement>;

  private readonly destroyRef = inject(DestroyRef);
  private snowflakes?: Snowflakes;
  transitioning = false;
  private transition?: gsap.core.Timeline;

  ngAfterViewInit(): void {
    this.snowflakes = new Snowflakes({ color: '#ffd700', minSize: 20 });
    this.destroyRef.onDestroy(() => {
      this.snowflakes?.destroy();
      this.transition?.kill();
    });
  }

  start(): void {
    if (this.transitioning) {
      return;
    }

    this.transitioning = true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      this.started.emit();
      return;
    }

    this.transition = gsap.timeline({
      onComplete: () => this.started.emit()
    })
      .to(this.crtContent.nativeElement, {
        scaleY: 0.005,
        duration: 0.25,
        ease: 'power2.in'
      })
      .to(this.flash.nativeElement, {
        opacity: 1,
        duration: 0.075,
        ease: 'none'
      }, 0.25)
      .to(this.flash.nativeElement, {
        opacity: 0,
        duration: 0.075,
        ease: 'none'
      }, 0.325)
      .to(this.blackout.nativeElement, {
        opacity: 1,
        duration: 0.3,
        ease: 'power1.in'
      }, 0.4);
  }
}