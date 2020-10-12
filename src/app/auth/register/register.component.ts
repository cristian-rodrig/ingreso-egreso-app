import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

 registroForm: FormGroup;
 uiSubscription: Subscription;
 cargando: boolean = false;


  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private store: Store<AppState>,
               private router: Router) { }

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required ],
      correo: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required ], 
    })
  

  this.uiSubscription = this.store.select('ui')
         .subscribe( ui => this.cargando = ui.isLoading );
  }

  ngOnDestroy(): void {   
    this.uiSubscription.unsubscribe();    
  }
  
  crearUsuario(){
    if(this.registroForm.invalid){ return; }
    this.store.dispatch( ui.isLoading() );
    Swal.fire({
      title: 'Espere por favor!',
      timerProgressBar: true,
      willOpen: () => {
        Swal.showLoading()        
      }});

      const {nombre, correo, password } = this.registroForm.value;
      this.authService.crearUsuario(nombre, correo, password)
      .then( credenciales  => {
        console.log(credenciales)
        Swal.close();
        this.router.navigate(['/']);
      })
       .catch( err => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message , 
        timer: 2000,
        timerProgressBar: true,       
        })
      });
         
  }
}

