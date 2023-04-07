import { AbstractControl } from "@angular/forms";

export function passwordMatch(formControl: AbstractControl) {
    const p1 = formControl.parent?.get('password')?.value;
    const p2 = formControl.parent?.get('confirmedPassword')?.value;
 
    const match = p1 === p2;
 
    return match ? null : {passwordMatch: true};
 
   };