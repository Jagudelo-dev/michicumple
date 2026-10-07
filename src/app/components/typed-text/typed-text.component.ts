import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, ViewChild, inject } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-typed-text',
  standalone: true,
  templateUrl: './typed-text.component.html',
  styleUrl: './typed-text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypedTextComponent implements AfterViewInit {
  @ViewChild('typedTarget', { static: true })
  private readonly typedTarget!: ElementRef<HTMLSpanElement>;

  private readonly destroyRef = inject(DestroyRef);
  private typed?: Typed;

  ngAfterViewInit(): void {
    const message = 'Que la vida te devuelva toda la alegría que regalas.';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      this.typedTarget.nativeElement.textContent = message;
      return;
    }

    this.typed = new Typed(this.typedTarget.nativeElement, {
      strings: [message],
      typeSpeed: 36,
      showCursor: true,
      cursorChar: '|',
      contentType: 'null'
    });
    this.destroyRef.onDestroy(() => this.typed?.destroy());
  }
}