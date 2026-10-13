/**
 * GOOGLE SHEETS / EXCEL WEBHOOK CONFIGURATION
 * 
 * To automatically send every appointment form submission to your live Google Sheet (Excel):
 * 1. Open Google Sheets (https://sheets.google.com) and create a new sheet (e.g. "Ma Dental Appointments").
 * 2. Click on "Extensions" -> "Apps Script".
 * 3. Delete any code in the editor and paste the Google Apps Script code provided in the project.
 * 4. Click "Deploy" -> "New deployment".
 * 5. Choose "Web app":
 *    - Description: "Ma Dental Appointments Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 6. Click "Deploy", authorize access, and copy the "Web app URL" (starts with https://script.google.com/macros/s/...).
 * 7. Paste that URL below into GOOGLE_SHEET_WEBHOOK_URL.
 */

export const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbx-YckTtrxJty_-CjXosjxNY63I5HxWk9nYae3zGk7c94EFur0FzhsOtKIf9m9uhfIm/exec';

