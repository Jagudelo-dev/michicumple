import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-balloon-border',
  standalone: true,
  templateUrl: './balloon-border.component.html',
  styleUrl: './balloon-border.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalloonBorderComponent {
  private readonly colors = ['#c76f78', '#d5a43a', '#db8166', '#e6a996', '#c76f78', '#d5a43a', '#db8166', '#e6a996'];

  readonly balloons = Array.from({ length: 8 }, (_, id) => ({
    id,
    color: this.colors[id],
    x: this.randomBetween(2, 98),
    duration: this.randomBetween(15, 25),
    delay: this.randomBetween(0, 10)
  }));

  respawn(event: AnimationEvent): void {
    const balloon = event.currentTarget;
    if (balloon instanceof HTMLElement) {
      balloon.style.setProperty('--balloon-x', `${this.randomBetween(2, 98)}%`);
    }
  }

  private randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}