import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { submitForm } from 'src/app/store/create-post/create-post.actions';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) {
    this.form = fb.group({
      userId: new FormControl({disabled: true,value: 101}, Validators.required),
      title: new FormControl('', [Validators.required, this.titleValidator()]),
      body: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  get title() {
    return this.form.get('title') as FormControl;
  }

  get body() {
    return this.form.get('body') as FormControl;
  }

  onFormSubmit() {
    this.store.dispatch(submitForm({...this.form.getRawValue()}))
  }

  titleValidator(): ValidatorFn {
    return (titleControl: AbstractControl): ValidationErrors | null => {
      const value = titleControl.value ?? '';
      if (!value) {
        return null;
      } else if (value.split('')[0] !== 'x') {
        return { titleInvalid: 'Please provide x at the start of title' };
      } else {
        return null;
      }
    };
  }
}


