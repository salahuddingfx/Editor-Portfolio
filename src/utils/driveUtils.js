/**
 * Utilities for parsing and converting Google Drive links
 * so that they can be embedded directly in img, video, and iframe elements.
 */

/**
 * Checks if a URL is a Google Drive link.
 * @param {string} url - The URL to check.
 * @returns {boolean} True if it is a Google Drive link.
 */
export function isGoogleDriveLink(url) {
  if (!url || typeof url !== "string") return false;
  return url.includes("drive.google.com");
}

/**
 * Parses the folder ID from a Google Drive folder link.
 * @param {string} url - The Google Drive URL.
 * @returns {string|null} The folder ID, or null.
 */
export function getDriveFolderId(url) {
  if (!url || typeof url !== "string") return null;
  
  // Match folder ID formats:
  // - drive.google.com/drive/folders/FOLDER_ID
  // - drive.google.com/drive/u/0/folders/FOLDER_ID
  const folderMatch = url.match(/\/folders\/([a-zA-Z0-9_-]{25,50})/);
  if (folderMatch) return folderMatch[1];
  
  // Match query parameter formats:
  // - drive.google.com/open?id=FOLDER_ID
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]{25,50})/);
  if (idMatch && url.includes("folders")) return idMatch[1];
  
  return null;
}

/**
 * Parses the file ID from a Google Drive file link.
 * @param {string} url - The Google Drive URL.
 * @returns {string|null} The file ID, or null.
 */
export function getDriveFileId(url) {
  if (!url || typeof url !== "string") return null;
  
  // Match file ID formats:
  // - drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]{25,50})/);
  if (fileMatch) return fileMatch[1];
  
  // Match query parameter formats:
  // - drive.google.com/open?id=FILE_ID
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]{25,50})/);
  if (idMatch && !url.includes("folders")) return idMatch[1];
  
  return null;
}

/**
 * Converts a Google Drive link (file or folder) to an embeddable URL.
 * @param {string} url - The original Google Drive URL.
 * @returns {string} The embeddable URL, or the original URL if not a Drive link.
 */
export function getDriveEmbedUrl(url) {
  if (!isGoogleDriveLink(url)) return url;
  
  // 1. Check if it's a folder
  const folderId = getDriveFolderId(url);
  if (folderId) {
    // Official Google Drive Embedded Folder View
    return `https://drive.google.com/embeddedfolderview?id=${folderId}#grid`;
  }
  
  // 2. Check if it's a file (video/document/etc)
  const fileId = getDriveFileId(url);
  if (fileId) {
    // Direct embeddable preview page
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  return url;
}

/**
 * Converts a Google Drive image link to a direct raw source URL suitable for <img> tags.
 * @param {string} url - The original Google Drive image URL.
 * @returns {string} The raw image URL, or the original URL if not a Drive link.
 */
export function getDriveImageUrl(url) {
  if (!isGoogleDriveLink(url)) return url;
  
  const fileId = getDriveFileId(url);
  if (fileId) {
    // Google API link for rendering raw images directly
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  
  return url;
}
