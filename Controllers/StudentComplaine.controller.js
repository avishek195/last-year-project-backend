import ComplaineModel from "../Models/Complaine.model.js";
import ResponseHandler from "../Utils/ResponseHandler.js";

export const createComplaine = async (req, res) => {
  try {
    const { complineType, ComplaineDescription } = req.body;
    const studentId = req.studentId;
    console.log("studentId", studentId);

    const newComplaine = await ComplaineModel.create({
      studentId,
      complineType,
      ComplaineDescription,
    });
    return ResponseHandler.success(
      res,
      newComplaine,
      "Complaint created successfully",
      201
    );
  } catch (err) {
    return ResponseHandler.error(res, "Failed to create complaint", 500, err);
  }
};

/**
 * Get all complaints
 */
export const getStudentComplaine = async (req, res) => {
  try {
    // Assume you've set req.studentId in your auth middleware
    const studentId = req.studentId;

    const complaints = await ComplaineModel.find({ studentId })
      .populate("studentId", "name email") // adjust fields as needed
      .sort({ createdAt: -1 });

    return ResponseHandler.success(
      res,
      complaints,
      "Fetched student complaints successfully"
    );
  } catch (err) {
    return ResponseHandler.error(res, "Failed to fetch complaints", 500, err);
  }
};

export const getAllComplaine = async (req, res) => {
  try {
    const all = await ComplaineModel.find()
      .populate("studentId", "name email") // adjust fields as needed
      .sort({ createdAt: -1 });
    return ResponseHandler.success(res, all, "Fetched all complaints");
  } catch (err) {
    return ResponseHandler.error(res, "Failed to fetch complaints", 500, err);
  }
};

/**
 * Update an existing complaint by ID
 */
export const updateComplaine = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await ComplaineModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return ResponseHandler.error(res, "Complaint not found", 404);
    }
    return ResponseHandler.success(
      res,
      updated,
      "Complaint updated successfully"
    );
  } catch (err) {
    return ResponseHandler.error(res, "Failed to update complaint", 500, err);
  }
};

/**
 * Delete a complaint by ID
 */
export const deleteComplaine = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ComplaineModel.findByIdAndDelete(id);
    if (!deleted) {
      return ResponseHandler.error(res, "Complaint not found", 404);
    }
    return ResponseHandler.success(
      res,
      deleted,
      "Complaint deleted successfully"
    );
  } catch (err) {
    return ResponseHandler.error(res, "Failed to delete complaint", 500, err);
  }
};
