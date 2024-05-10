import {FormGroup} from "@angular/forms";

export const markAllFieldsAsDirty = (formGroup: FormGroup) => {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsDirty();
  });
}
