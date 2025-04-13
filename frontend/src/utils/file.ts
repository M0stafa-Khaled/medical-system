export const MAX_FILE_SIZE = 5000000; // 5MB

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg",
];

export const isValidFileType = (file: File, acceptedTypes: string[]): boolean =>
  acceptedTypes.includes(file?.type);
