/**
 * base64 파일을 Blob 객체로 변환한다.
 *
 * contentType : default는 empty string, ex) image/gif
 *
 * @param base64
 * @param contentType
 * @param sliceSize
 */
export default (base64, contentType, sliceSize) =>{
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  let byteCharacters = atob(base64);
  let byteArrays = [];

  for(let offset = 0; offset < byteCharacters.length; offset += sliceSize){
    let slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for(let i = 0; i < slice.length; i++){
      byteNumbers[i] = slice.charCodeAt(i);
    }

    let byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, {type: contentType});
}