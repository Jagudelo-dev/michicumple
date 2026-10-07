import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class MainComponent {}