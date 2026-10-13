/**
 * =========================================================================
 * MA DENTAL CLINIC - GOOGLE APPS SCRIPT FOR APPOINTMENTS (EXCEL / SHEETS)
 * =========================================================================
 * 
 * INSTRUCTIONS:
 * 1. Open Google Sheets (https://sheets.google.com) and create a new blank sheet.
 *    Name it "Ma Dental Appointments".
 * 2. In Google Sheets top menu, click: Extensions -> Apps Script.
 * 3. Delete any code in the editor, and PASTE this entire script.
 * 4. Click the Save icon (💾).
 * 5. Click the blue "Deploy" button at top right -> "New deployment".
 * 6. Under "Select type" (gear icon), select "Web app".
 * 7. Set configuration:
 *    - Description: "Ma Dental Appointments API"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (VERY IMPORTANT so the website can send data)
 * 8. Click "Deploy", click "Authorize access", choose your Google account, 
 *    click "Advanced" -> "Go to (unsafe)", and click "Allow".
 * 9. Copy the "Web app URL" (e.g. https://script.google.com/macros/s/AKfycb.../exec).
 * 10. Paste this URL into: frontend/src/config/sheetConfig.js in GOOGLE_SHEET_WEBHOOK_URL.
 * 
 * DONE! Every appointment submitted will now automatically appear in your sheet in real time!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();

    var headers = [
      "Timestamp",
      "Reference ID",
      "Patient Name",
      "Phone Number",
      "Location Branch",
      "Preferred Date",
      "Dental Service",
      "Message / Concerns",
      "Status"
    ];

    // If first row is empty, automatically create and style the headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#2f39a9");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(11);
      sheet.setFrozenRows(1);
    }

    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    var row = [
      data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.referenceId || "MD-" + Math.floor(1000 + Math.random() * 9000),
      data.fullName || "",
      data.phone || "",
      data.location || "",
      data.preferredDate || "Earliest Available",
      data.service || "",
      data.message || "",
      data.status || "Pending Confirmation"
    ];

    sheet.appendRow(row);

    // Auto-fit columns
    for (var col = 1; col <= headers.length; col++) {
      sheet.autoResizeColumn(col);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", row: sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "active", message: "Ma Dental Appointments Webhook is running." }))
    .setMimeType(ContentService.MimeType.JSON);
}

