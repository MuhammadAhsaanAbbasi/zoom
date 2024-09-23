"use server";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import { redirect } from "next/navigation";
import Previous from "../database/models/previous.model";


// ADD Upcoming Meeting
export async function addPrevious({ previous, userId }: AddPreviousParams) {
    try {
        await connectToDatabase();

        const user = await User.findOne({ clerkId: userId });;

        if (!user) {
            throw new Error("User not found");
        }

        const previousMeeting = await Previous.create({
            ...previous,
            user: user._id,
        });

        return JSON.parse(JSON.stringify(previousMeeting));
    } catch (error) {
        handleError(error)
    }
}

// DELETE Upcoming
export async function deletePrevious(UpcomingId: string) {
    try {
        await connectToDatabase();

        await Previous.findByIdAndDelete(UpcomingId);
    } catch (error) {
        handleError(error)
    } finally {
        redirect('/')
    }
}

// GET Upcoming BY USER
export async function getUserPrevious(userId: string){
    try {
        await connectToDatabase();
        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            throw new Error("User not found");
        }

        // Retrieve all previous meetings associated with the user
        const previousMeetings: string[] = await Previous.find({ user: user._id });

        return {
            data : JSON.parse(JSON.stringify(previousMeetings)),
        };
    } catch (error) {
        handleError(error);
    }
}