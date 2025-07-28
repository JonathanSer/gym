import { Injectable, signal } from '@angular/core';
import { Membresia } from '../interfaces/membresia.interface';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  private membresia = signal<Membresia | null>(null);

  constructor() { }

  setData(membresia: Membresia) {
    this.membresia.set(membresia);
  }

  getData(): any {
    return this.membresia();
  }

}
