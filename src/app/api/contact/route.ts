import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const EDUCATION_LEVELS: Record<string, string> = {
  high_school: "High School",
  undergraduate: "Undergraduate",
  graduate: "Graduate",
  other: "Other / Professional",
};

const GOALS: Record<string, string> = {
  improve_grades: "Improve Grades",
  exam_prep: "Exam Preparation (SAT, GRE, etc.)",
  homework_help: "Homework Help",
  concept_understanding: "Understand Concepts Better",
  get_ahead: "Get Ahead in Class",
  other: "Other",
};

const SESSION_FORMATS: Record<string, string> = {
  online: "Online (Video Call)",
};

function getNotificationEmailHtml(data: {
  fullname: string;
  email: string;
  phone: string;
  educationLevel: string;
  mathSubject: string;
  goal: string;
  sessionFormat: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 32px 40px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">New Tutoring Inquiry</h1>
              <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">from ${data.fullname}</p>
            </td>
          </tr>

          <!-- Contact Info -->
          <tr>
            <td style="padding: 32px 40px 0;">
              <h2 style="margin: 0 0 16px; color: #374151; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Contact Information</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280; font-size: 14px;">Name</span><br>
                    <span style="color: #111827; font-size: 16px; font-weight: 500;">${data.fullname}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280; font-size: 14px;">Email</span><br>
                    <a href="mailto:${data.email}" style="color: #6366f1; font-size: 16px; font-weight: 500; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 20px;">
                    <span style="color: #6b7280; font-size: 14px;">Phone</span><br>
                    <span style="color: #111827; font-size: 16px; font-weight: 500;">${data.phone}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Student Details -->
          <tr>
            <td style="padding: 32px 40px 0;">
              <h2 style="margin: 0 0 16px; color: #374151; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Student Details</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding: 12px 16px; background-color: #f9fafb; border-radius: 8px 0 0 0;">
                    <span style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Education Level</span><br>
                    <span style="color: #111827; font-size: 15px; font-weight: 500;">${data.educationLevel}</span>
                  </td>
                  <td width="50%" style="padding: 12px 16px; background-color: #f9fafb; border-radius: 0 8px 0 0;">
                    <span style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Session Format</span><br>
                    <span style="color: #111827; font-size: 15px; font-weight: 500;">${data.sessionFormat}</span>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding: 12px 16px; background-color: #f9fafb; border-radius: 0 0 0 8px;">
                    <span style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Subject/Course</span><br>
                    <span style="color: #111827; font-size: 15px; font-weight: 500;">${data.mathSubject}</span>
                  </td>
                  <td width="50%" style="padding: 12px 16px; background-color: #f9fafb; border-radius: 0 0 8px 0;">
                    <span style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Primary Goal</span><br>
                    <span style="color: #111827; font-size: 15px; font-weight: 500;">${data.goal}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 32px 40px;">
              <h2 style="margin: 0 0 16px; color: #374151; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Additional Details</h2>
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; border-left: 4px solid #6366f1;">
                <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6;">${data.message.replace(/\n/g, "<br>")}</p>
              </div>
            </td>
          </tr>

          <!-- Reply Button -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: 600;">Reply to ${data.fullname.split(" ")[0]}</a>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <p style="margin: 24px 0 0; color: #9ca3af; font-size: 13px;">StephenSolves Math Tutoring</p>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function getConfirmationEmailHtml(firstName: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">StephenSolves</h1>
              <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">Math Tutoring</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #111827; font-size: 24px; font-weight: 600;">Thanks for reaching out, ${firstName}!</h2>

              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.7;">
                I've received your tutoring inquiry and I'm excited to help you with your math journey.
              </p>

              <div style="background-color: #f0fdf4; border-radius: 8px; padding: 20px; margin: 24px 0; border-left: 4px solid #22c55e;">
                <p style="margin: 0; color: #166534; font-size: 15px; line-height: 1.6;">
                  <strong>What happens next?</strong><br>
                  I'll personally review your inquiry and get back to you within 24 hours to schedule your free consultation.
                </p>
              </div>

              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.7;">
                During our consultation, we'll discuss your goals, identify any areas where you need extra support, and create a personalized plan to help you succeed.
              </p>

              <p style="margin: 0 0 8px; color: #374151; font-size: 16px; line-height: 1.7;">
                In the meantime, feel free to check out:
              </p>

              <ul style="margin: 0 0 24px; padding-left: 20px; color: #374151; font-size: 16px; line-height: 2;">
                <li><a href="https://stephensolves.com/pricing" style="color: #6366f1; text-decoration: none;">Pricing &amp; Packages</a></li>
                <li><a href="https://stephensolves.com/reviews" style="color: #6366f1; text-decoration: none;">Student Reviews</a></li>
              </ul>

              <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.7;">
                Looking forward to helping you master math!
              </p>

              <p style="margin: 24px 0 0; color: #111827; font-size: 16px;">
                <strong>Stephen Schools</strong><br>
                <span style="color: #6b7280; font-size: 14px;">M.S. Mathematics, The Citadel</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                <a href="https://stephensolves.com" style="color: #6366f1; text-decoration: none;">stephensolves.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fullname = formData.get("fullname") as string;
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || "Not provided";
    const educationLevel = formData.get("education_level") as string;
    const mathSubject = formData.get("math_subject") as string;
    const goal = formData.get("goal") as string;
    const sessionFormat = formData.get("session_format") as string;
    const message = (formData.get("message") as string) || "No additional details provided";

    if (!fullname || !email || !educationLevel || !mathSubject || !goal || !sessionFormat) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const firstName = fullname.split(" ")[0];

    const emailData = {
      fullname,
      email,
      phone,
      educationLevel: EDUCATION_LEVELS[educationLevel] || educationLevel,
      mathSubject,
      goal: GOALS[goal] || goal,
      sessionFormat: SESSION_FORMATS[sessionFormat] || sessionFormat,
      message,
    };

    // Send both emails using batch
    const { error } = await resend.batch.send([
      {
        from: "StephenSolves <contact@stephensolves.com>",
        to: ["stephen@stephensolves.com", "hsq0503@gmail.com"],
        replyTo: email,
        subject: `New Tutoring Inquiry from ${fullname}`,
        html: getNotificationEmailHtml(emailData),
      },
      {
        from: "Stephen Schools <contact@stephensolves.com>",
        to: [email],
        subject: "Thanks for reaching out! - StephenSolves",
        html: getConfirmationEmailHtml(firstName),
      },
    ]);

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
