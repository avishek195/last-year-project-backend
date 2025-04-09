import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    // Personal Info
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
        required: false
    },
    nationality: {
        type: String,
        required: true
    },
    languagesSpoken: [{
        type: String
    }],

    // Lifestyle
    weekdayWakeUpTime: {
        type: String,
        required: true
    },
    weekendWakeUpTime: {
        type: String,
        required: true
    },
    sleepTime: {
        type: String,
        required: true
    },
    cleanlinessLevel: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    smokes: {
        type: Boolean,
        required: true
    },
    drinksAlcohol: {
        type: Boolean,
        required: true
    },
    personalityType: {
        type: String,
        enum: ['Introvert', 'Extrovert', 'Ambivert'],
        required: true
    },
    petFriendly: {
        type: Boolean,
        required: true
    },
    preferredStudyEnvironment: {
        type: String,
        enum: ['Quiet', 'Moderate', 'Social'],
        required: true
    },

    // Academic/Work Habits
    courseMajor: {
        type: String,
        required: true
    },
    studySchedule: {
        type: String,
        enum: ['Morning', 'Evening', 'Night'],
        required: true
    },
    workingPartTime: {
        type: Boolean,
        required: true
    },
    onlineClassFrequency: {
        type: Number,
        required: true
    },

    // Interests & Hobbies
    hobbies: [{
        type: String
    }],
    favoriteGenres: [{
        type: String
    }],
    weekendPreferences: {
        type: String,
        enum: ['Outdoorsy', 'Party', 'Chill'],
        required: true
    },

    // Room Preferences
    okayWithSharedRoom: {
        type: Boolean,
        required: true
    },
    preferredRoomTemperature: {
        type: Number,
        required: true
    },
    usesLightAtNight: {
        type: Boolean,
        required: true
    },
    guestFrequency: {
        type: String,
        enum: ['Rarely', 'Sometimes', 'Often'],
        required: true
    },

    // Beliefs/Values (Optional)
    religiousObservance: {
        type: String,
        enum: ['None', 'Moderate', 'Strict'],
        required: false
    },
    politicalViews: {
        type: String,
        enum: ['Liberal', 'Moderate', 'Conservative'],
        required: false
    },
    openToDiversity: {
        type: Boolean,
        required: false
    },

    // Derived Fields
    pastRoommateRating: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    complaintFrequency: {
        type: Number,
        default: 0
    },
    dormEngagementScore: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
