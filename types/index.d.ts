/* eslint-disable no-unused-vars */

// ====== USER PARAMS
declare type CreateUserParams = {
    clerkId: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    photo: string;
};

declare type UpdateUserParams = {
    firstName: string;
    lastName: string;
    username: string;
    photo: string;
};


declare type AddUpcomingParams = {
    upcoming: {
        link: string;
        description: string;
        date: Date;
        call_id: string;
    }
    userId: string;
};


declare type AddPreviousParams = {
    previous: {
        description: string;
        date: Date;
    }
    userId: string;
};

interface getCallParamas {
    _id: string
    date: Date;
    description?: string;
    link?: string;
    call_id?: string;
}