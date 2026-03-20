import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormArray, FormRecord, Validator, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone : true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
name = new FormControl('', Validators.required);

account = new FormGroup({
  email : new FormControl('', [Validators.required, Validators.email]),
  paasword : new FormControl ('', Validators.required)
});

skills = new FormArray([
  new FormControl('Angular')
]);

preferences = new FormRecord({
  darkMode: new FormControl(true),
  notification: new FormControl(false)
});

addSkill(){
  this.skills.push(new FormControl(''));
}

removeSkill(i: number){
  this.skills.removeAt(i);
}

addPreference(){
  const key = 'pref_' + Object.keys(this.preferences.controls).length;
  this.preferences.addControl(key, new FormControl(false));
}

submit()
{
  const data = {
    name: this.name.value,
    account: this.account.value,
    skills: this.skills.value,
    preferences : this.preferences.value
  };

  console.log('EMPLOYEE DATA ', data);
  alert(JSON.stringify(data, null,2));
}

}
