export const API_CONSTANTS = {
  // Snap Service
  SNAP_FILE_SERVICE: {
    // BASE_URL: 'https://snap.gauravranjit.com/api/',
    BASE_URL: 'http://localhost:3333/api/',
    GET_SNAPS: 'getSnaps',
    POST_UPLOAD_SNAP: 'upload',
    // GET_SNAP_DETAIL: '/snaps/:id',
    // DELETE_SNAP: '/snaps/:id/delete',
  },
};

export function getSnapApiUrl(
  endpoint: keyof typeof API_CONSTANTS.SNAP_FILE_SERVICE
): string {
  const baseUrl = API_CONSTANTS.SNAP_FILE_SERVICE.BASE_URL;
  const path = API_CONSTANTS.SNAP_FILE_SERVICE[endpoint];
  return new URL(path, baseUrl).toString();
}
