import { Component, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-campaign-form',
  imports: [FormsModule],
  templateUrl: './new-campaign-form.html',
  styleUrl: './new-campaign-form.css',
})
export class NewCampaignForm {
  campaignName = output<string>();
  title = '';

  submitForm(form: NgForm) {
    this.campaignName.emit(this.title);

    form.resetForm();
  }
}
