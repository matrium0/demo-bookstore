export function createImageUrlFromBlob(image?: Blob): string | undefined {
  if (image) {
    return URL.createObjectURL(image);
  }
}
