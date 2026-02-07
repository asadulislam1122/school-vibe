import nodemailer from 'nodemailer'

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message } = req.body

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (!email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' })
  }

  try {
    // Verify transporter configuration first
    try {
      await transporter.verify()
    } catch (verifyErr) {
      console.error('Transporter verification failed:', verifyErr)
      console.error('GMAIL_USER present:', !!process.env.GMAIL_USER)
      console.error('GMAIL_APP_PASSWORD present:', !!process.env.GMAIL_APP_PASSWORD)
      return res.status(500).json({ success: false, message: 'Mail transporter not configured', debug: verifyErr.message })
    }

    // Send email to school
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'asadulislam0288@gmail.com',
      subject: 'New Message from Contact Form',
      html: `
        <h2>নতুন যোগাযোগ বার্তা</h2>
        <p><strong>প্রেরকের নাম:</strong> ${name}</p>
        <p><strong>প্রেরকের ইমেইল:</strong> ${email}</p>
        <p><strong>বার্তা:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
        <hr />
        <p><small>এই বার্তা ভোমরাদহ উচ্চ বিদ্যালয়ের ওয়েবসাইট যোগাযোগ ফর্ম থেকে পাঠানো হয়েছে।</small></p>
      `
    })

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'আমরা আপনার বার্তা পেয়েছি',
      html: `
        <h2>ধন্যবাদ ${name}!</h2>
        <p>আপনার বার্তা আমরা সফলভাবে পেয়েছি। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
        <p><strong>আপনার বার্তা:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
        <hr />
        <p>ভোমরাদহ উচ্চ বিদ্যালয়</p>
      `
    })

    return res.status(200).json({
      success: true,
      message: 'বার্তা সফলভাবে পাঠানো হয়েছে!'
    })
  } catch (error) {
    console.error('Email error:', error)
    console.error('Error message:', error && error.message)
    console.error('Error code:', error && error.code)
    return res.status(500).json({
      success: false,
      message: 'বার্তা পাঠাতে ত্রুটি হয়েছে।',
      debug: error && error.message
    })
  }
}
