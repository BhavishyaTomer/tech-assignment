
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDetailService } from '../service/user-detail.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Input() isModalOpen: boolean = false;
  @Output() modalClose = new EventEmitter<void>();
  userData:any;
  Editflag:any;
  userForm: FormGroup;
 

  constructor(private fb: FormBuilder, private userDetailService: UserDetailService) {
    this.userForm = this.fb.group({
      userId: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(6), Validators.maxLength(6)]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: [''], // Optional field
      gender: ['male', Validators.required],
      dob: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(10), Validators.max(90)]],
      country: ['usa', Validators.required],
      address: ['', Validators.required]
    });

    this.userForm.get('dob')?.valueChanges.subscribe(dob => {
      if (dob) {
        this.calculateAge();
      }
    });
  }
  

  closeModal() {
    this.modalClose.emit();
  }
 ngOnChanges(): void {
 
  this.userData=this.userDetailService.getUserData() 
  if(this.userData)
  { console.log("entered the loop")  
  this.Editflag=true
  this.userForm.get('userId')?.setValue(this.userData.userId)

  }
  
 }
  onSubmit() {
    if(!this.Editflag)
    {
  console.log("Add Case")
 
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      console.log('Form Data:', formData);

      this.userDetailService.addUserDetail(this.userForm.value);
      this.userForm.reset();
      this.closeModal();
    }

  }

  if(this.Editflag)
  {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      console.log('Form Data:', formData);

      this.userDetailService.updateUserDetail(this.userForm.value);
      this.userForm.reset();
      this.closeModal();
      this.userDetailService.storeUserData('')
    }
  }
  }

  get formControls() {
    return this.userForm.controls;
  }

  calculateAge() {
    const dob = new Date(this.userForm.get('dob')?.value);
    const age = this.getAge(dob);
    const ageControl = this.userForm.get('age');
    ageControl?.setValue(age, { emitEvent: false });
    if (ageControl?.invalid) {
      ageControl.markAsTouched();
    }
  }

  getAge(dob: Date): number {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }
  getSelectPanelClass() {
    return 'dark-select-panel';
  }
}
