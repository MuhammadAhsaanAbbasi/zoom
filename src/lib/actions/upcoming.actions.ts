"use server";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import UpComing from "../database/models/upcoming.model";
import { redirect } from "next/navigation";


// ADD Upcoming Meeting
export async function addUpcoming({ upcoming, userId }: AddUpcomingParams) {
    try {
        await connectToDatabase();

        const user = await User.findOne({ clerkId: userId });;

        if (!user) {
            throw new Error("User not found");
        }

        const upComingMeeting = await UpComing.create({
            ...upcoming,
            user: user._id,
        });

        return JSON.parse(JSON.stringify(upComingMeeting));
    } catch (error) {
        handleError(error)
    }
}

// DELETE Upcoming
export async function deleteUpcoming(UpcomingId: string) {
    try {
        await connectToDatabase();

        await UpComing.findByIdAndDelete(UpcomingId);
    } catch (error) {
        handleError(error)
    } finally {
        redirect('/')
    }
}

// GET Upcoming BY USER
export async function getUserUpComing(userId: string) {
    try {
        // Connect to the database if not already connected
        await connectToDatabase();

        // Find the user based on userId
        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            throw new Error("User not found");
        }

        // Retrieve all previous meetings associated with the user
        const UpComingMeeting = await UpComing.find({ user: user._id });

        // Filter out meetings that are more than 20 minutes in the past
        const filteredMeetings = UpComingMeeting.filter(meeting => {
            const twentyMinutesAgo = new Date();
            twentyMinutesAgo.setMinutes(twentyMinutesAgo.getMinutes() - 20);
            return meeting.date > twentyMinutesAgo;
        });

        return {
            data: JSON.parse(JSON.stringify(filteredMeetings)),
        };
    } catch (error) {
        handleError(error);
    }
}