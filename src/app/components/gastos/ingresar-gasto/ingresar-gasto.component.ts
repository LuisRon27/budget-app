import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent implements OnInit {

  //Variables
  nombreGasto: string;
  cantidad: number;
  formularioIncorrecto: boolean;
  textIncorrecto: string;


  constructor(private _presupuestoService: PresupuestoService) {
    this.nombreGasto = '';
    this.cantidad = 0;
    this.formularioIncorrecto = false;
    this.textIncorrecto = '';
  }
  ngOnInit(): void {

  }


  agregarGasto() {

    if (this.cantidad > this._presupuestoService.restante) {
      this.formularioIncorrecto = true;
      this.textIncorrecto = 'Cantidad Ingresada es Mayor al Restante';
      return
    }


    if (this.nombreGasto  === '' || this.cantidad <= 0) {

      this.formularioIncorrecto = true;
      this.textIncorrecto = 'Nombre Gasto o Cantidad Incorrecta';

    } else {

      //Creamos el Objeto
      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad
      }


      //Enviamos el Objeto a los suscriptores via subjet
      this._presupuestoService.agregarGasto(GASTO);

      //Reseteamos Formulario

      this.formularioIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }

}
