import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INewNpcFormDetails } from './new-npc-form-details';

@Component({
  selector: 'app-new-npc-form',
  imports: [ReactiveFormsModule],
  templateUrl: './new-npc-form.html',
  styleUrl: './new-npc-form.css',
})
export class NewNpcForm {
  npcForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    hp: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  npcDetails = output<INewNpcFormDetails>();

  onSubmit() {
    if (this.npcForm.invalid) {
      return;
    }

    const npcData: INewNpcFormDetails = {
      name: this.npcForm.controls.name.value,
      hp: this.npcForm.controls.hp.value,
    };

    this.npcDetails.emit(npcData);

    this.npcForm.reset();
  }
}
