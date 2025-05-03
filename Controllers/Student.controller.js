import Student from "../Models/Student.model.js";
import StudentAuth from "../Models/StudentAuth.model.js";
import ResponseHandler from "../Utils/ResponseHandler.js";

// Create new student information
const createStudentInfo = async (req, res) => {
  try {
    const {
      fullName,
      age,
      gender,
      nationality,
      languagesSpoken,
      weekdayWakeUpTime,
      weekendWakeUpTime,
      sleepTime,
      cleanlinessLevel,
      smokes,
      drinksAlcohol,
      personalityType,
      petFriendly,
      preferredStudyEnvironment,
      courseMajor,
      studySchedule,
      workingPartTime,
      onlineClassFrequency,
      hobbies,
      favoriteGenres,
      weekendPreferences,
      okayWithSharedRoom,
      preferredRoomTemperature,
      usesLightAtNight,
      guestFrequency,
      religiousObservance,
      politicalViews,
      openToDiversity,
    } = req.body;

    // Verify student is authenticated
    const studentId = req.studentId;
    if (!studentId) {
      return ResponseHandler.error(res, "Authentication required", 401);
    }

    // Validate required fields
    if (
      !fullName ||
      !age ||
      !nationality ||
      !weekdayWakeUpTime ||
      !weekendWakeUpTime ||
      !sleepTime ||
      cleanlinessLevel === undefined ||
      smokes === undefined ||
      drinksAlcohol === undefined ||
      !personalityType ||
      petFriendly === undefined ||
      !preferredStudyEnvironment ||
      !courseMajor ||
      !studySchedule ||
      workingPartTime === undefined ||
      onlineClassFrequency === undefined ||
      !weekendPreferences ||
      okayWithSharedRoom === undefined ||
      preferredRoomTemperature === undefined ||
      usesLightAtNight === undefined ||
      !guestFrequency
    ) {
      return ResponseHandler.error(res, "Missing required fields", 400);
    }

    // Validate age
    if (age < 18 || age > 100) {
      return ResponseHandler.error(res, "Age must be between 18 and 100", 400);
    }

    // Validate cleanliness level
    if (cleanlinessLevel < 1 || cleanlinessLevel > 5) {
      return ResponseHandler.error(
        res,
        "Cleanliness level must be between 1 and 5",
        400
      );
    }

    // Create new student
    const newStudent = new Student({
      fullName,
      age,
      gender,
      nationality,
      languagesSpoken,
      weekdayWakeUpTime,
      weekendWakeUpTime,
      sleepTime,
      cleanlinessLevel,
      smokes,
      drinksAlcohol,
      personalityType,
      petFriendly,
      preferredStudyEnvironment,
      courseMajor,
      studySchedule,
      workingPartTime,
      onlineClassFrequency,
      hobbies,
      favoriteGenres,
      weekendPreferences,
      okayWithSharedRoom,
      preferredRoomTemperature,
      usesLightAtNight,
      guestFrequency,
      religiousObservance,
      politicalViews,
      openToDiversity,
    });

    // Save student to database
    const savedStudent = await newStudent.save();

    // Link student profile to auth record
    await StudentAuth.findByIdAndUpdate(studentId, {
      student: savedStudent._id,
    });

    return ResponseHandler.success(
      res,
      savedStudent,
      "Student information created successfully",
      201
    );
  } catch (error) {
    console.error("Error creating student:", error);
    return ResponseHandler.error(
      res,
      "Error creating student information",
      500,
      error
    );
  }
};

// Get all students data (admin only)
const getAllStudents = async (req, res) => {
  try {
    // This function is protected by isAdmin middleware
    // No need to check admin authentication here as it's done in the middleware

    // Get all students with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch students with pagination
    const students = await StudentAuth.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const totalStudents = await StudentAuth.countDocuments();

    return ResponseHandler.success(
      res,
      {
        students,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalStudents / limit),
          totalStudents,
          studentsPerPage: limit,
        },
      },
      "Students retrieved successfully"
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    return ResponseHandler.error(
      res,
      "Error retrieving student data",
      500,
      error
    );
  }
};

export { createStudentInfo, getAllStudents };
