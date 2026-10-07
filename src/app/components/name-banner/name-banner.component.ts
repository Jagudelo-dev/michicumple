import { ChangeDetectionStrategy, Component } from '@angular/core';
import { birthdayTexts } from '../../data/texts';

@Component({
  selector: 'app-name-banner',
  standalone: true,
  templateUrl: './name-banner.component.html',
  styleUrl: './name-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameBannerComponent {
  readonly texts = birthdayTexts;
  readonly titleLetters = birthdayTexts.titleLine2.split('');
}