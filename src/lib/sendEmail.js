import nodemailer from "nodemailer";

/**
 * Utility to send invoice emails to users using Nodemailer.
 * Requires the following environment variables:
 * - EMAIL_USER: Your SMTP email address
 * - EMAIL_PASS: Your SMTP password or app-specific password
 * - SMTP_HOST: The SMTP host (e.g., smtp.gmail.com)
 * - SMTP_PORT: The SMTP port (e.g., 465 or 587)
 */

export const sendInvoiceEmail = async (bookingData) => {
    const { name, email, serviceName, totalCost, address, division, slot, date } = bookingData;

    // Create a transporter using environment variables
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Prepare the email HTML content
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #0d9488 0%, #2563eb 100%); padding: 30px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 24px;">Booking Confirmation</h1>
                <p style="margin: 5px 0 0; opacity: 0.9;">Thank you for choosing Care.xyz</p>
            </div>
            <div style="padding: 30px; color: #1e293b;">
                <p style="margin: 0 0 20px;">Dear <strong>${name || "Valued Client"}</strong>,</p>
                <p style="margin: 0 0 20px; line-height: 1.6;">Your booking for <strong>${serviceName}</strong> has been successfully confirmed. Our elite specialist will arrive at the scheduled time.</p>
                
                <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                    <h2 style="margin: 0 0 15px; font-size: 16px; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">Booking Details</h2>
                    <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 5px 0; color: #64748b;">Service:</td>
                            <td style="padding: 5px 0; font-weight: bold; text-align: right;">${serviceName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 0; color: #64748b;">Date:</td>
                            <td style="padding: 5px 0; font-weight: bold; text-align: right;">${date || "Not Specified"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 0; color: #64748b;">Time Slot:</td>
                            <td style="padding: 5px 0; font-weight: bold; text-align: right;">${slot || "Not Specified"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px 0; color: #64748b;">Location:</td>
                            <td style="padding: 5px 0; font-weight: bold; text-align: right;">${address}, ${division}</td>
                        </tr>
                    </table>
                </div>

                <div style="border-top: 2px dashed #e2e8f0; padding-top: 20px; margin-bottom: 25px;">
                    <table style="width: 100%; font-size: 16px; font-weight: bold;">
                        <tr>
                            <td style="color: #1e293b;">Total Amount Paid:</td>
                            <td style="text-align: right; color: #0d9488;">$${totalCost}</td>
                        </tr>
                    </table>
                    <p style="margin: 5px 0 0; font-size: 12px; color: #94a3b8; text-align: right;">Paid via Secure Checkout</p>
                </div>

                <p style="margin: 0 0 20px; line-height: 1.6; font-size: 14px;">Need help or want to reschedule? Feel free to contact us at <a href="mailto:support@care.xyz" style="color: #0d9488; text-decoration: none;">support@care.xyz</a> or call our hotline.</p>
            </div>
            <div style="background-color: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 12px;">
                <p style="margin: 0;">Care.xyz - Elite Care for Your Loved Ones</p>
                <p style="margin: 5px 0 0;">&copy; ${new Date().getFullYear()} Care.xyz Network. All rights reserved.</p>
            </div>
        </div>
    `;

    try {
        const info = await transporter.sendMail({
            from: `"Care.xyz" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Your Care.xyz Invoice - ${serviceName}`,
            html: htmlContent,
        });

        console.log("Message sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending real invoice email:", error);
        throw error;
    }
};
