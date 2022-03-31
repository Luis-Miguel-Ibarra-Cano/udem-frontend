import { AbstractControl } from '@angular/forms';

export function OnlyNumber_Int(control: AbstractControl) {
    let reg = /^\d+$/;
    // console.log(control.value);
    let isNumber = reg.test( control.value );
    // console.log(isNumber);
    if (!isNumber) {
        return { 'inteter': true };
    }
    return null;
}