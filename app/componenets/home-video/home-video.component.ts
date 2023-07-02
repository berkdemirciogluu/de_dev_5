import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
declare var $;

@Component({
  selector: 'app-home-video',
  templateUrl: './home-video.component.html',
  styleUrls: ['./home-video.component.scss'],
})
export class HomeVideoComponent {
  is820 = window.innerWidth < 821;
}
