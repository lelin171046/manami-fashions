import ContactMessage from "../models/ContactMessage.model.js";
import { sendSuccess } from "../helpers/response.js";
import { AppError } from "../middlewares/error.middleware.js";
import { HTTP_STATUS, MESSAGE_STATUS } from "../constants/index.js";
import { sendContactNotification, sendContactReply } from "../services/email.service.js";
import { emitContactNew, emitContactUpdated } from "../socket.js";

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      throw new AppError("Name, email, and message are required", HTTP_STATUS.BAD_REQUEST);
    }

    const contact = await ContactMessage.create(req.body);

    emitContactNew(contact);
    sendContactNotification(contact).catch(() => {});

    return sendSuccess(res, { message: "Message sent successfully", data: contact, statusCode: HTTP_STATUS.CREATED });
  } catch (error) {
    next(error);
  }
};

export const getMessageStats = async (req, res, next) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [total, unread, today, month] = await Promise.all([
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ isRead: false }),
      ContactMessage.countDocuments({ createdAt: { $gte: startOfToday } }),
      ContactMessage.countDocuments({ createdAt: { $gte: startOfMonth } }),
    ]);

    return sendSuccess(res, {
      data: { total, unread, today, month },
    });
  } catch (error) {
    next(error);
  }
};

export const getUnreadContactCount = async (req, res, next) => {
  try {
    const count = await ContactMessage.countDocuments({ isRead: false });
    return sendSuccess(res, { data: { count } });
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, sort = "-createdAt", status, search, filter = "all" } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const query = {};

    if (filter === "unread") query.isRead = false;
    else if (filter === "read") query.isRead = true;
    else if (filter === "replied") query.status = MESSAGE_STATUS.REPLIED;
    else if (filter === "archived") query.status = MESSAGE_STATUS.ARCHIVED;
    else if (filter === "pending") query.status = MESSAGE_STATUS.PENDING;

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const [contacts, total] = await Promise.all([
      ContactMessage.find(query).sort(sort).skip((pageNum - 1) * limitNum).limit(limitNum),
      ContactMessage.countDocuments(query),
    ]);

    return sendSuccess(res, {
      data: contacts,
      meta: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const contact = await ContactMessage.findById(req.params.id);
    if (!contact) throw new AppError("Contact not found", HTTP_STATUS.NOT_FOUND);

    if (!contact.isRead) {
      contact.isRead = true;
      contact.status = MESSAGE_STATUS.READ;
      await contact.save();
      emitContactUpdated(contact);
    }

    return sendSuccess(res, { data: contact });
  } catch (error) {
    next(error);
  }
};

export const markMessageRead = async (req, res, next) => {
  try {
    const contact = await ContactMessage.findById(req.params.id);
    if (!contact) throw new AppError("Contact not found", HTTP_STATUS.NOT_FOUND);

    contact.isRead = true;
    if (contact.status === MESSAGE_STATUS.PENDING) contact.status = MESSAGE_STATUS.READ;
    await contact.save();
    emitContactUpdated(contact);

    return sendSuccess(res, { message: "Marked as read", data: contact });
  } catch (error) {
    next(error);
  }
};

export const markMessageUnread = async (req, res, next) => {
  try {
    const contact = await ContactMessage.findById(req.params.id);
    if (!contact) throw new AppError("Contact not found", HTTP_STATUS.NOT_FOUND);

    contact.isRead = false;
    if (contact.status === MESSAGE_STATUS.READ) contact.status = MESSAGE_STATUS.PENDING;
    await contact.save();
    emitContactUpdated(contact);

    return sendSuccess(res, { message: "Marked as unread", data: contact });
  } catch (error) {
    next(error);
  }
};

export const archiveMessage = async (req, res, next) => {
  try {
    const contact = await ContactMessage.findById(req.params.id);
    if (!contact) throw new AppError("Contact not found", HTTP_STATUS.NOT_FOUND);

    contact.status = MESSAGE_STATUS.ARCHIVED;
    contact.isRead = true;
    await contact.save();
    emitContactUpdated(contact);

    return sendSuccess(res, { message: "Message archived", data: contact });
  } catch (error) {
    next(error);
  }
};

export const replyMessage = async (req, res, next) => {
  try {
    const { subject, message } = req.body;
    const contact = await ContactMessage.findById(req.params.id);
    if (!contact) throw new AppError("Contact not found", HTTP_STATUS.NOT_FOUND);

    await sendContactReply({ contact, subject, reply: message });

    contact.status = MESSAGE_STATUS.REPLIED;
    contact.isRead = true;
    contact.repliedAt = new Date();
    await contact.save();
    emitContactUpdated(contact);

    return sendSuccess(res, { message: "Reply sent", data: contact });
  } catch (error) {
    next(error);
  }
};

export const updateContactStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    if (!status || !Object.values(MESSAGE_STATUS).includes(status)) {
      throw new AppError("Valid status required", HTTP_STATUS.BAD_REQUEST);
    }

    const contact = await ContactMessage.findById(req.params.id);
    if (!contact) throw new AppError("Contact not found", HTTP_STATUS.NOT_FOUND);

    contact.status = status;
    if (notes !== undefined) contact.notes = notes;
    if (status === MESSAGE_STATUS.REPLIED) contact.repliedAt = new Date();
    await contact.save();
    emitContactUpdated(contact);

    return sendSuccess(res, { message: "Status updated", data: contact });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!contact) throw new AppError("Contact not found", HTTP_STATUS.NOT_FOUND);
    emitContactUpdated({ _id: req.params.id, deleted: true });
    return sendSuccess(res, { message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};
