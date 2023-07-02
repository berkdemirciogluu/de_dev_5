import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  isSmallWidth = window.innerWidth < 821;

  servicesItems = [
    {
      link: '../../../assets/images/service_1.jpg',
      title: 'Tubular run service – Fishing and Jar  service',
    },
    {
      link: '../../../assets/images/service_1.jpg',
      title: 'Snubbing unit and Coil tubing',
    },
    {
      link: '../../../assets/images/service_1.jpg',
      title: 'Completions and Liner Tools – ESP technology -Dual Completion',
    },
    {
      link: '../../../assets/images/service_1.jpg',
      title: 'Geomodelling  of reservoirs',
    },
    {
      link: '../../../assets/images/service_2.jpg',
      title: 'Torque and drug and Tubular design analysis',
    },
    {
      link: '../../../assets/images/service_2.jpg',
      title: 'Hydraulic pumps  spare parts supplement',
    },
    {
      link: '../../../assets/images/service_2.jpg',
      title: 'Technical evaluation of Completion design as Third Company',
    },
    {
      link: '../../../assets/images/service_2.jpg',
      title: 'Torque units calibration device',
    },
  ];
}
