import Action from "../models/actions.js";
import Users from "../models/register.js";

export const createAction = async (req, res) => {
  try {
    if (!["Admin", "SuperAdmin"].includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const {
      actionType,
      targetCategory,
      idNumber,
      duration,
      reason,
      effectiveDate,
    } = req.body;

    if (!actionType || !targetCategory || !idNumber || !reason || !effectiveDate) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    const user = await Users.findOne({ idNumber });

    if (!user) {
      return res.status(404).json({
        message: "Target user not found",
      });
    }

    if (actionType === "Suspension" && !duration) {
      return res.status(400).json({
        message: "Duration required for suspension",
      });
    }

    const action = await Action.create({
      actionType,
      targetCategory,
      idNumber,
      user: user._id,
      duration: actionType === "Dismissal" ? null : duration,
      reason,
      effectiveDate,
      issuedBy: req.user.userId,
    });

    res.status(201).json({
      message: "Action issued successfully",
      action,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};