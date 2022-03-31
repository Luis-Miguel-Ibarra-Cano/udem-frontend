import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/core/models/persona.model';
import { OnlyNumber_Int } from 'src/app/shared/directives/only-number.directive';
import Swal from 'sweetalert2';
import { PersonasServiceService } from '../../services/personas-service.service';

@Component({
  selector: 'app-personas-page',
  templateUrl: './personas-page.component.html',
  styleUrls: ['./personas-page.component.scss'],
  providers: [NgbModalConfig, NgbModal, NgbActiveModal]
})
export class PersonasPageComponent implements OnInit {

  public formSubmit:boolean = false;
  public waitCreate:boolean = false;
  public action:string = '';
  public persona:Persona;
  public list_personas:Array<Persona> = [];
  public formPersona = this.fb.group({
    nombres:    ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    apellidos:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    documento:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12), OnlyNumber_Int]],
    telefono:   ['', [Validators.maxLength(12), OnlyNumber_Int]],
  });


  constructor(
    private fb: FormBuilder,
    private _personasService: PersonasServiceService,
    public configModal1: NgbModalConfig, private serviceModal1: NgbModal, public _Modal1: NgbActiveModal
  ) {
    // Modal config
    configModal1.backdrop = 'static';
    configModal1.keyboard = false;
  }

  ngOnInit(): void {
    this.readAll();
  }

  public openModal(contentModalForm:any, action:string){
    this._Modal1 = this.serviceModal1.open(contentModalForm, {size: 'lg'});
    this.action = action;
  }
  public openModalUP(contentModalForm:any, persona:Persona, action:string){
    this._Modal1 = this.serviceModal1.open(contentModalForm, {size: 'lg'});
    this.action = action;
    this.persona = persona;
    this.setUpdate();
  }
  public closedModal(){
    this._Modal1.dismiss('closed');
    this.resetForm();
  }

  public submitForm(){
    console.log(this.formPersona.controls);
    this.formSubmit = true;
    switch (this.action) {
      case 'in':
        this.create();
      break;
      case 'up':
        this.update();
      break;
      default:
      break;
    }
  }
  private validForm(){
    const formData  = this.formPersona;
    let msg:string = '<p class="text-left">';
    if (formData.valid==false) {
      if (formData.controls['nombres'].errors) { msg = msg+'&bull;&nbsp; El <b>nombre</b> es obligatorio. <br>';  }
      if (formData.controls['nombres'].errors) { msg = msg+'&bull;&nbsp; El <b>nombre</b> debe tener mínimo 3 caracteres y máximo 50  caracteres. <br>';  }
      if (formData.controls['apellidos'].errors) { msg = msg+'&bull;&nbsp; El <b>apellido</b> es obligatorio. <br>';  }
      if (formData.controls['apellidos'].errors) { msg = msg+'&bull;&nbsp; El <b>apellido</b> debe tener mínimo 3 caracteres y máximo 50  caracteres. <br>';  }
      if (formData.controls['documento'].errors) { msg = msg+'&bull;&nbsp; El <b>documento</b> es obligatorio. <br>';  }
      if (formData.controls['documento'].errors) { msg = msg+'&bull;&nbsp; El <b>documento</b> debe tener mínimo 3 caracteres y máximo 12  caracteres. <br>';  }
      if (formData.controls['documento'].errors) { msg = msg+'&bull;&nbsp; El <b>documento</b> debe ser sólo de valor numérico sin espacios. <br>';  }
      if (formData.controls['telefono'].errors) { msg = msg+'&bull;&nbsp; El <b>teléfono</b> debe ser sólo de valor numérico sin espacios. <br>';  }
      msg = msg+'</p>';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#b0b0b0',
        width: 750,
        html: `${msg}`
      });
    }
  }

  public readAll(){
    this._personasService.readAll().subscribe(
      (response)=>{
        this.list_personas = response;
      }
    );
  }
  public read(persona:Persona){
    this._personasService.read(persona.id).subscribe(
      (response)=>{
        const p:Persona = response;
        Swal.fire({
          showCancelButton: false,
          showConfirmButton: false,
          showDenyButton: false,
          showCloseButton: true,
          html: `<p class="text-center"><b>${p.nombres.toLocaleUpperCase()} ${p.apellidos.toLocaleUpperCase()}</b></p><br>
          <p class="text-left">
          <b>Documento</b>: ${p.documento}
          <br>
          <b>Teléfono</b>: ${p.telefono}
          </p>`
        });
      }
    );
  }
  private create(){
    // this.waitCreate = true;
    const formValid = this.formPersona.valid;
    const formData  = this.formPersona.value;
    if(this.formSubmit && formValid){
      this._personasService.create(formData).subscribe(
        (response)=>{
          console.log(response);
          this.closedModal();
          Swal.fire({
            icon: 'success',
            title: 'guardado',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#b0b0b0',
            timer: 2500
          });
          this.readAll();
        }
      );
    }else{
      this.validForm();
    }
  }
  private setUpdate(){
    this.formPersona.controls['nombres'].setValue(this.persona.nombres);
    this.formPersona.controls['apellidos'].setValue(this.persona.apellidos);
    this.formPersona.controls['documento'].setValue(this.persona.documento);
    this.formPersona.controls['telefono'].setValue(this.persona.telefono);
  }
  private update(){
    // this.waitCreate = true;
    const formValid = this.formPersona.valid;
    const formData  = this.formPersona.value;
    if(this.formSubmit && formValid){
      this._personasService.update(formData, this.persona.id).subscribe(
        (response)=>{
          console.log(response);
          this.closedModal();
          Swal.fire({
            icon: 'success',
            title: 'Editado',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#b0b0b0',
            timer: 2500
          });
          this.readAll();
        }
      );
    }else{
      this.validForm();
    }
  }

  public delete(persona:Persona){
    this._personasService.delete( persona.id ).subscribe(
      (response)=>{
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#b0b0b0',
          timer: 2500
        });
        this.readAll();
      }
    );
  }

  private resetForm(){
    this.formPersona.controls['nombres'].setValue('');
    this.formPersona.controls['apellidos'].setValue('');
    this.formPersona.controls['documento'].setValue('');
    this.formPersona.controls['telefono'].setValue('');
  }

}
