import { BrevoClient } from "@getbrevo/brevo";
import { BREVO_API_KEY, EMAIL_FROM, EMAIL_TO, FRONTEND_URL } from "../config/env.js";

let client = null;

const getClient = () => {
  if (!client && BREVO_API_KEY) {
    client = new BrevoClient({ auth: { apiKey: BREVO_API_KEY } });
  }
  return client;
};

export const sendEmail = async ({ to, subject, html }) => {
  const brevo = getClient();
  if (!brevo || !EMAIL_FROM) {
    console.log("Email not configured — skipping:", subject);
    return null;
  }

  return brevo.transactionalEmails.sendTransacEmail({
    sender: { email: EMAIL_FROM, name: "Manami Fashions Ltd." },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  });
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br/>");

export const sendContactNotification = async (contact) => {
  const { name, email, phone, company, country, subject, message } = contact;

  return sendEmail({
    to: EMAIL_TO,
    subject: `New Contact: ${subject || "General Inquiry"}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:12px;overflow:hidden">
        <div style="background:#111;padding:24px 28px">
          <h2 style="margin:0;color:#fff;font-size:18px;letter-spacing:1px">New Contact Message</h2>
          <p style="margin:6px 0 0;color:#999;font-size:12px">manamifashions.com — contact form submission</p>
        </div>
        <div style="padding:28px">
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333">
            <tr><td style="padding:6px 0;color:#999;width:110px">Name</td><td style="padding:6px 0;font-weight:600">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:6px 0;color:#999">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}" style="color:#111;font-weight:600">${escapeHtml(email)}</a></td></tr>
            ${phone ? `<tr><td style="padding:6px 0;color:#999">Phone</td><td style="padding:6px 0">${escapeHtml(phone)}</td></tr>` : ""}
            ${company ? `<tr><td style="padding:6px 0;color:#999">Company</td><td style="padding:6px 0">${escapeHtml(company)}</td></tr>` : ""}
            ${country ? `<tr><td style="padding:6px 0;color:#999">Country</td><td style="padding:6px 0">${escapeHtml(country)}</td></tr>` : ""}
            <tr><td style="padding:6px 0;color:#999">Subject</td><td style="padding:6px 0;font-weight:600">${escapeHtml(subject)}</td></tr>
          </table>
          <div style="background:#fafafa;border:1px solid #eee;border-radius:8px;padding:16px;margin-top:12px;font-size:14px;color:#333;line-height:1.6">
            ${escapeHtml(message)}
          </div>
          <a href="${FRONTEND_URL}/admin/contacts" style="display:inline-block;margin-top:20px;background:#111;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600">
            Open in Dashboard →
          </a>
        </div>
      </div>
    `,
  });
};

export const sendApplicationNotification = async (application) => {
  const { name, email, phone, position, experience, department, resumeUrl } = application;

  return sendEmail({
    to: EMAIL_TO,
    subject: `New Application: ${position || "Job Application"}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:12px;overflow:hidden">
        <div style="background:#111;padding:24px 28px">
          <h2 style="margin:0;color:#fff;font-size:18px;letter-spacing:1px">New Job Application</h2>
          <p style="margin:6px 0 0;color:#999;font-size:12px">manamifashions.com — career application</p>
        </div>
        <div style="padding:28px">
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333">
            <tr><td style="padding:6px 0;color:#999;width:110px">Name</td><td style="padding:6px 0;font-weight:600">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:6px 0;color:#999">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}" style="color:#111;font-weight:600">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:6px 0;color:#999">Phone</td><td style="padding:6px 0">${escapeHtml(phone)}</td></tr>
            <tr><td style="padding:6px 0;color:#999">Position</td><td style="padding:6px 0;font-weight:600">${escapeHtml(position)}</td></tr>
            ${department ? `<tr><td style="padding:6px 0;color:#999">Department</td><td style="padding:6px 0">${escapeHtml(department)}</td></tr>` : ""}
            ${experience ? `<tr><td style="padding:6px 0;color:#999">Experience</td><td style="padding:6px 0">${escapeHtml(experience)}</td></tr>` : ""}
            ${resumeUrl ? `<tr><td style="padding:6px 0;color:#999">Resume</td><td style="padding:6px 0"><a href="${escapeHtml(resumeUrl)}" style="color:#111;font-weight:600">Download resume</a></td></tr>` : ""}
          </table>
          <a href="${FRONTEND_URL}/admin/careers" style="display:inline-block;margin-top:20px;background:#111;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600">
            Open in Dashboard →
          </a>
        </div>
      </div>
    `,
  });
};

export const sendContactReply = async ({ contact, subject, reply }) => {
  return sendEmail({
    to: contact.email,
    subject: subject || `Re: ${contact.subject || "Your inquiry"}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:12px;overflow:hidden">
        <div style="background:#111;padding:24px 28px">
          <h2 style="margin:0;color:#fff;font-size:18px;letter-spacing:1px">Manami Fashions Ltd.</h2>
        </div>
        <div style="padding:28px;font-size:14px;color:#333;line-height:1.6">
          <p>Dear ${escapeHtml(contact.name)},</p>
          <p>${escapeHtml(reply)}</p>
          <p>Warm regards,<br/><strong>Manami Fashions Ltd.</strong></p>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
          <p style="color:#999;font-size:12px;margin:0">Original message: "${escapeHtml(contact.subject || "General Inquiry")}"</p>
        </div>
      </div>
    `,
  });
};
