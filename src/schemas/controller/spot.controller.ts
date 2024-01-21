import { spotContactInfo, spotSchedule } from "src/types";

export const spotContactInfoValidator = (v: spotContactInfo) => {

    /* RegEx to determine the v.email has an email format */
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    /* emailValidated and phoneValidated receives booleans in result of the validation on each one */
    const emailValidated = 'email' in v && emailRegex.test(v.email)
    const phoneValidated = 'phone' in v

    /* We just want to confirm that almost one of the validations are true. We don't want to save a contact_info object with properties that are not phone or email */
    return emailValidated || phoneValidated
}

export const scheduleValidator = (schedule: spotSchedule) => {
    if(Object.values(schedule).length !== 8 ) return false;

    return Object.values(schedule).every(day => !!day) // Validate if all days are not false or "" empty strings.
}