import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MetodoPagoService } from '../../../services/metodo-pago.service';
import { Membresia } from '../../../interfaces/membresia.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MembresiaUsuarioService } from '../../../services/membresia-usuario.service';
import { MembresiaActual } from '../../../interfaces/membresia-actual.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from '../../../interfaces/usuario.interface';

@Component({
  selector: 'app-metodo-pago',
  imports: [],
  templateUrl: './metodo-pago.component.html',
  styleUrl: './metodo-pago.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetodoPagoComponent {

  private membresiaUsuarioService = inject(MembresiaUsuarioService);
  private metodoPagoService = inject(MetodoPagoService);
  private authService = inject(AuthService);
  private router = inject(Router);

  me = signal<Usuario | null>(null);
  membresia = signal<Membresia | null>(null);
  metodoSeleccionado = signal<'tarjeta' | 'efectivo' | null>(null);

  mostrarFormularioTarjeta = signal(false);
  mostrarInfoEfectivo = signal(false);
  aceptoTerminos = signal(false);
  textoBtn = signal<string>('Selecciona método de pago')

  ngOnInit(): void {
    this.membresia.set(this.metodoPagoService.getData());
    if(this.membresia() === null){
      this.router.navigate(['/membresias'])
    }
    this.authService.me().subscribe(me => {
      this.me.set(me);
    })
  }

  metodoPagoSeleccionado(metodo: 'tarjeta' | 'efectivo') {
    this.metodoSeleccionado.set(metodo);
    this.mostrarFormularioTarjeta.set(metodo === 'tarjeta');
    this.mostrarInfoEfectivo.set(metodo === 'efectivo');

    this.textoBtn.set(this.metodoSeleccionado() === 'tarjeta' ? 'Pagar con tarjeta' : 'Pagar en efectivo')
  }

  formatoTarjetaNumero(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{4})(?=\d)/g, '$1 ');
    event.target.value = valor;
  }

  formatoFechaExpiracion(event: any) {
    let valor = event.target.value.replace(/\D/g, '').slice(0, 4);
    if (valor.length >= 3) {
      valor = valor.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    }
    event.target.value = valor;
  }

  actualizarTerminos(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.aceptoTerminos.set(checked);
  }

  procesarPago() {
    if (!this.metodoSeleccionado()) {
      this.mostrarAlerta('warning', 'Método de pago no seleccionado', 'Por favor selecciona un método de pago.');
      return;
    }

    if (!this.aceptoTerminos()) {
      this.mostrarAlerta('info', 'Términos y condiciones', 'Debes aceptar los términos y condiciones antes de continuar.');
      return;
    }

    if (this.metodoSeleccionado() === 'tarjeta') {
      if (!this.validarCamposTarjeta()) return;

      const membresiaUsuario: MembresiaActual = {
        user_id: this.me()?.id,
        membresia_id: this.membresia()?.id,
        activa: 1
      }

      this.mostrarAlerta('success', 'Procesando pago', 'Quedará en pendiente hasta realizar el pago', 1500);
      //console.log('Datos enviados: ', membresiaUsuario)
      this.membresiaUsuarioService.crearMembresia(membresiaUsuario).subscribe(usuario => {
        //console.log(usuario);
      })
      this.router.navigate(['/inicio']);
    } else {
      const membresiaUsuario: MembresiaActual = {
        user_id: this.me()?.id,
        membresia_id: this.membresia()?.id,
        activa: 2
      }
      this.membresiaUsuarioService.crearMembresia(membresiaUsuario).subscribe(usuario => {
        //console.log(usuario);
      })
      this.mostrarAlerta('success', 'Pasar a pagar', 'Quedara en pendiente hasta realizar el pago', 2000);
      this.router.navigate(['/inicio']);
    }
  }

  validarCamposTarjeta(): boolean {
    const numero = (document.getElementById('card-number') as HTMLInputElement)?.value.trim();
    const vencimiento = (document.getElementById('expiry-date') as HTMLInputElement)?.value.trim();
    const cvv = (document.getElementById('cvv') as HTMLInputElement)?.value.trim();
    const nombre = (document.getElementById('cardholder-name') as HTMLInputElement)?.value.trim();

    if (!numero) {
      this.mostrarAlerta('warning', 'Campo vacío', 'Por favor ingresa el número de tarjeta');
      return false;
    }

    if (!vencimiento) {
      this.mostrarAlerta('warning', 'Campo vacío', 'Por favor ingresa la fecha de vencimiento');
      return false;
    }

    if (!cvv) {
      this.mostrarAlerta('warning', 'Campo vacío', 'Por favor ingresa el CVV');
      return false;
    }

    if (!nombre) {
      this.mostrarAlerta('warning', 'Campo vacío', 'Por favor ingresa el nombre del titular');
      return false;
    }

    return true;
  }


  mostrarAlerta(icon: 'info' | 'warning' | 'success' | 'error', titulo: string, mensaje: string, temporizador: number = 0) {
    Swal.fire({
      icon,
      title: titulo,
      text: mensaje,
      confirmButtonColor: '#f97316',
      showConfirmButton: temporizador === 0,
      timer: temporizador || undefined
    });
  }
}
