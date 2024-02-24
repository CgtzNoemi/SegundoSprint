import { Component } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  angForm: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private dataService: ApiService, 
    private router:Router
    ){
      this.angForm = this.fb.group({
        NombreUsuario: ['', Validators.required],
        correoElectronico: ['', Validators.required, Validators.email],
        Password: ['', Validators.required]
      });
    }

    ngOnInit(): void {

    }

    AngularData(angForm:any)
    {
      if(this.angForm.valid){
        this.dataService.userRegistro(
          angForm.value.NombreUsuario,
          angForm.value.correoElectronico,
          angForm.value.Password,
        )
        .pipe(first()).subscribe({
          next: (data) => {
            this.router.navigate(['/login']);
          },
          error: (error) => {
          
          }
        });
      }else{
        alert('Todos los campos son obligatorios');
      }

    }
}
