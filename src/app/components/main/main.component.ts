import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnDestroy, inject } from '@angular/core';
import confetti from 'canvas-confetti';
import { BalloonBorderComponent } from '../balloon-border/balloon-border.component';
import { CakeComponent } from '../cake/cake.component';
import { EnvelopeComponent } from '../envelope/envelope.component';
import { NameBannerComponent } from '../name-banner/name-banner.component';
import { TypedTextComponent } from '../typed-text/typed-text.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NameBannerComponent, TypedTextComponent, CakeComponent, EnvelopeComponent, BalloonBorderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements AfterViewInit, OnDestroy {
  private readonly zone = inject(NgZone);
  private readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private readonly confettiCanvas = document.querySelector<HTMLCanvasElement>('#confetti');
  private readonly confettiBurst = this.confettiCanvas
    ? confetti.create(this.confettiCanvas, { resize: true, useWorker: true })
    : null;
  private burstTimer?: number;
  private burstIndex = 0;

  ngAfterViewInit(): void {
    if (this.reducedMotion || !this.confettiBurst) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.burstTimer = window.setInterval(() => this.launchBurst(), 300);
    });
  }

  ngOnDestroy(): void {
    if (this.burstTimer !== undefined) {
      window.clearInterval(this.burstTimer);
    }
    this.confettiBurst?.reset();
  }

  private launchBurst(): void {
    const spiral = 0.5 + Math.sin(this.burstIndex * 0.28) * 0.44;
    const jitter = (Math.random() - 0.5) * 0.12;
    const originX = Math.min(1, Math.max(0, spiral + jitter));
    this.burstIndex += 1;

    void this.confettiBurst?.({
      origin: { x: originX, y: -0.1 },
      gravity: 0.4,
      particleCount: Math.floor(Math.random() * 4) + 5,
      spread: 60,
      startVelocity: 15,
      ticks: 400,
      shapes: ['circle', 'square'],
      colors: ['#ffd700', '#ff69b4', '#df0049', '#ffd200'],
      zIndex: 3,
      disableForReducedMotion: true
    });
  }
}