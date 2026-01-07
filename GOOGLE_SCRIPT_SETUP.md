# Google Apps Script Setup Guide

This guide will help you set up Google Apps Script to receive form submissions and save them to Google Sheets.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Webinar Registrations" (or any name you prefer)
4. Add the following headers in the first row:
   - Timestamp
   - Name
   - Organization
   - Phone
   - Email
   - Role
   - Topic
   - Referral Code
   - Question

## Step 2: Create Google Apps Script

1. In your Google Sheet, click on **Extensions** → **Apps Script**
2. Delete any existing code and paste the following:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Prepare the row data
    const row = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.organization || '',
      data.phone || '',
      data.email || '',
      data.role || '',
      data.topic || '',
      data.referralCode || '',
      data.question || ''
    ];
    
    // Append the row to the sheet
    sheet.appendRow(row);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Data saved successfully' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ message: 'Webhook is active' })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

### Test Script: Verify Data Transfer to Google Sheets

After deploying your script, you can test it using this sample code. Add this test function to your Google Apps Script editor and run it to verify data is being saved correctly:

```javascript
function testDataTransfer() {
  // Get the active spreadsheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Sample test data
  const testData = {
    timestamp: new Date().toISOString(),
    name: "Nguyễn Văn Test",
    organization: "Công ty Test",
    phone: "0123456789",
    email: "test@example.com",
    role: "sinh-vien",
    topic: "webinar-23-1",
    referralCode: "TEST123",
    question: "Đây là câu hỏi test để kiểm tra chức năng"
  };
  
  // Prepare the row data (same format as doPost function)
  const row = [
    testData.timestamp,
    testData.name,
    testData.organization,
    testData.phone,
    testData.email,
    testData.role,
    testData.topic,
    testData.referralCode,
    testData.question
  ];
  
  // Append the test row
  sheet.appendRow(row);
  
  // Log success
  Logger.log('Test data added successfully!');
  Logger.log('Check your Google Sheet to see the new row.');
  
  return 'Test completed! Check your sheet for the new row.';
}
```

**How to run the test:**

1. In the Google Apps Script editor, click on the function dropdown (top right)
2. Select `testDataTransfer`
3. Click the **Run** button (▶️)
4. Authorize the script if prompted (first time only)
5. Check your Google Sheet - you should see a new row with test data
6. Check the execution log: **View** → **Execution log** to see the success message

**Alternative: Test via Browser Console**

You can also test the deployed web app directly from your browser console:

```javascript
// Replace YOUR_SCRIPT_URL with your actual deployed web app URL
const scriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

const testData = {
  name: "Nguyễn Văn Test",
  organization: "Công ty Test",
  phone: "0123456789",
  email: "test@example.com",
  role: "sinh-vien",
  topic: "webinar-23-1",
  referralCode: "TEST123",
  question: "Đây là câu hỏi test",
  timestamp: new Date().toISOString()
};

fetch(scriptUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
  .then(response => response.text())
  .then(data => {
    console.log('✅ Success! Response:', data);
    alert('Data sent successfully! Check your Google Sheet.');
  })
  .catch(error => {
    console.error('❌ Error:', error);
    alert('Error: ' + error.message);
  });
```

**Expected Result:**
- ✅ A new row should appear in your Google Sheet
- ✅ All columns should be filled with the test data
- ✅ The response should show `{"success":true,"message":"Data saved successfully"}`

## Step 3: Deploy as Web App

1. Click on **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**
3. Set the following:
   - **Description**: "Webinar Form Webhook" (or any description)
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (this allows your Next.js app to call it)
4. Click **Deploy**
5. Copy the **Web app URL** - this is your `GOOGLE_SCRIPT_URL`

## Step 4: Set Environment Variable

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add the following line:

```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with the actual ID from your Web app URL.

## Step 5: Test the Integration

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Fill out the form on your website
3. Submit the form
4. Check your Google Sheet - you should see a new row with the submitted data

## Troubleshooting

### Error: "Script function not found"
- Make sure the function is named `doPost` exactly
- Redeploy the script after making changes

### Error: "Access denied"
- Make sure "Who has access" is set to "Anyone" in the deployment settings
- You may need to authorize the script the first time

### Data not appearing in Sheet
- Check that the sheet name matches the active sheet
- Verify the headers are in the first row
- Check the Apps Script execution log: **View** → **Execution log**

## Security Notes

- The current setup allows anyone with the URL to submit data
- For production, consider adding authentication or API key validation
- You can add validation in the `doPost` function to check for API keys or other security measures

## Optional: Add API Key Protection

To add basic security, modify the `doPost` function:

```javascript
function doPost(e) {
  try {
    // Check for API key (set this in your environment variables)
    const apiKey = e.parameter.apiKey;
    const expectedApiKey = 'YOUR_SECRET_API_KEY'; // Store this securely
    
    if (apiKey !== expectedApiKey) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'Unauthorized' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // ... rest of the code
  } catch (error) {
    // ... error handling
  }
}
```

Then update your API route to include the API key in the request.

