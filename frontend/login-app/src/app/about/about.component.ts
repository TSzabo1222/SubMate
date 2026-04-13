import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  title = 'Rólunk';
  subtitle = 'A SubMate egy modern előfizetéskezelő alkalmazás, amely segít rendszerezni, nyomon követni és átláthatóvá tenni minden szolgáltatásodat egyetlen helyen – egyszerűen, gyorsan és hatékonyan.';
}