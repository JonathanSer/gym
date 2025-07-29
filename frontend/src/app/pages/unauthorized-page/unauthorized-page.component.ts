import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized-page',
  imports: [],
  templateUrl: './unauthorized-page.component.html',
  styleUrl: './unauthorized-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnauthorizedPageComponent { }
