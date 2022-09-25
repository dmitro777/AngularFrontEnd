export class Feedback {
    firstname!: string;
    lastname!: string;
    telnum!: number;
    email!: string;
    agree!: boolean;
    contacttype!: string;
    message!: string;

    constructor() { }
};

export const ContactType = ['None', 'Tel', 'Email'];