import { Component, OnInit } from '@angular/core';
import '../../../assets/smtp.js';
import { FormBuilder, FormGroup } from '@angular/forms';
declare let Email: any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  frm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.frm = this.formBuilder.group({
      fullName: [''],
      email: [''],
      body: [''],
    });
  }

  onSubmit(data) {
    Email?.send({
      Host: `smtp.elasticemail.com`,
      Username: `berk.demircioglu1994@gmail.com`,
      Password: `F8D6B0A278D5D7F5F46EEC2B9EB094F79958`,
      To: `berkdemircioglu@yahoo.com`,
      From: data.email,
      Subject: `Email From ${data.fullName} From Website`,
      Body: data.body,
    }).then((message) => {
      alert(message);
      this.frm.reset();
    });
  }
}
