import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, ViewChild, inject } from '@angular/core';
import Typed from 'typed.js';
import { birthdayTexts } from '../../data/texts';

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
  private readonly messages = birthdayTexts.typedMessages;
  private typed?: Typed;

  ngAfterViewInit(): void {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      this.typedTarget.nativeElement.textContent = this.messages.join(' · ');
      return;
    }

    this.typed = new Typed(this.typedTarget.nativeElement, {
      strings: [...this.messages],
      typeSpeed: 40,
      backSpeed: 20,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      contentType: 'null'
    });
    this.destroyRef.onDestroy(() => this.typed?.destroy());
  }
}