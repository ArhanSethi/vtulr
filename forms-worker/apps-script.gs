/**
 * VTULR Sheets logger — paste this into Extensions > Apps Script on the
 * Google Sheet, then Deploy > New deployment > Web app (Execute as: Me,
 * Who has access: Anyone). Copy the resulting /exec URL and give it to
 * Claude, along with the random secret you choose below.
 */

// Set this to any random string you like — the Worker must send the
// same value as "secret" in its POST body, so random visitors can't
// write junk rows into your sheet.
const SHARED_SECRET = 'CHANGE_ME_TO_A_RANDOM_STRING';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.secret !== SHARED_SECRET) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: 'Invalid secret' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const tabName = data.form === 'contact' ? 'Contact' : 'Submissions';
    const sheet = ss.getSheetByName(tabName);
    if (!sheet) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: `No tab named "${tabName}"` })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const row = (data.row || []).map((v) => (v == null ? '' : v));
    sheet.appendRow([new Date(), ...row]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
