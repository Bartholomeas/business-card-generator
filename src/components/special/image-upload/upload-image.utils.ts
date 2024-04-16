const fileExtRegex = /data:([^;]+);base64/;

/**
 * @description - Function that transforms data with file url to File object. Its usefull to use it with uploadthing for example
 * @param {string} url - Url to file that you want to upload
 * @param {string?} fileName - Optional
 * @returns {Promise<File[]>} - Array of file objects
 * @
 */
export const dataUrlToFile = async (url: string, fileName?: string): Promise<File[]> => {
  fileName = url.split(",")?.[1]?.slice(0, 16) ?? "";

  const [mediaType] = url.split(",");
  // const mime = mediaType?.match(/:(.*?);/)?.[1];
  const mime = mediaType?.match(fileExtRegex)?.[1];

  const fileExt = mime?.split("/")[1];

  const fileBlob = await fetch(url).then(async data => data.blob());
  const newFile = new File([fileBlob], `${fileName}.${fileExt}`, {
    type: mime,
  });

  return [newFile];
};