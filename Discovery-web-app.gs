const FOLDER_ID = '1j_G05R6pAq_EQ5Za67_QQClwAWfo-juY';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');

    const requiredValid =
      String(payload.name || '').trim() !== '' &&
      String(payload.businessEmail || '').trim() !== '' &&
      String(payload.businessType || '').trim() !== '' &&
      Array.isArray(payload.interests) &&
      payload.interests.length > 0;

    if (!requiredValid) {
      return jsonResponse({ success: false, error: 'Missing required fields' });
    }

    const submittedAt = new Date().toISOString();
    const safeName = String(payload.name || 'discovery-response')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 50) || 'discovery-response';

    const fileName = `${submittedAt.replace(/[.:]/g, '-')}-${safeName}.json`;

    const fileData = {
      submittedAt,
      name: payload.name || '',
      businessEmail: payload.businessEmail || '',
      companyName: payload.companyName || '',
      businessType: payload.businessType || '',
      interests: payload.interests || [],
      challengeOrGoal: payload.challengeOrGoal || '',
      budgetRange: payload.budgetRange || '',
      foundYou: payload.foundYou || '',
    };

    const folder = DriveApp.getFolderById(FOLDER_ID);
    folder.createFile(fileName, JSON.stringify(fileData, null, 2), MimeType.PLAIN_TEXT);

    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({ success: false, error: String(error) });
  }
}

function doGet() {
  return jsonResponse({ success: true, message: 'Discovery web app is running' });
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
