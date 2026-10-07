import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Output, inject } from '@angular/core';
import Snowflakes from 'magic-snowflakes';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements AfterViewInit {
  @Output() readonly started = new EventEmitter<void>();

  private readonly destroyRef = inject(DestroyRef);
  private snowflakes?: Snowflakes;

  ngAfterViewInit(): void {
    this.snowflakes = new Snowflakes({ color: '#ffd700', minSize: 20 });
    this.destroyRef.onDestroy(() => this.snowflakes?.destroy());
  }
}