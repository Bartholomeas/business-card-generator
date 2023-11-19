export const dataUrlToFile = (url: string, fileName: string) => {
  const [mediaType, data] = url.split(",");
  const mime = mediaType?.match(/:(.*?);/)?.[0];

  let n = data?.length ?? 0;
  const arr = new Uint8Array(n);

  while (n--) {
    arr[n] = data?.charCodeAt(n) ?? 0;
  }

  return new File([arr], fileName, { type: mime });
};
