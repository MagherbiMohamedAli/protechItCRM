import { Component } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  callus() {
    Swal.fire('Appelez-nous sur +216 31597990 ou bien +216 28609284');
  }
}