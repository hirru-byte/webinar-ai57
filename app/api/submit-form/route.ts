import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, organization, phone, email, role, topic, referralCode, question } = body

    if (!name || !organization || !phone || !email || !role || !topic) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin bắt buộc' },
        { status: 400 }
      )
    }

    // Get Google Apps Script URL from environment variable
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL

    if (!scriptUrl) {
      console.error('GOOGLE_SCRIPT_URL is not set in environment variables')
      return NextResponse.json(
        { error: 'Cấu hình server chưa đúng. Vui lòng liên hệ quản trị viên.' },
        { status: 500 }
      )
    }

    // Prepare data for Google Sheets
    const formData = {
      name,
      organization,
      phone,
      email,
      role,
      topic,
      referralCode: referralCode || '',
      question: question || '',
      timestamp: new Date().toISOString(),
    }

    // Send data to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Script error:', errorText)
      return NextResponse.json(
        { error: 'Không thể gửi dữ liệu. Vui lòng thử lại sau.' },
        { status: 500 }
      )
    }

    const result = await response.text()
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Đăng ký thành công!',
        data: result 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in submit-form API:', error)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại sau.' },
      { status: 500 }
    )
  }
}

