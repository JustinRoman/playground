import { Component } from '@angular/core';
import { Content1Component } from './content-1/content-1.component';
import { Content2Component } from './content-2/content-2.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [Content1Component, Content2Component],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

}
