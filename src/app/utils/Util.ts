import {FormGroup} from "@angular/forms";

export const markAllFieldsAsDirty = (formGroup: FormGroup) => {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsDirty();
  });
}

export const getTenantFromEmail = (email: string) => {
  const domain = email.split('@')[1];
  return domain.replaceAll('.', '')
}
