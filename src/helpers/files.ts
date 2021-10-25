import { HelperUtils } from "@/helpers/utils";

const mimeTypeOfJavascript = "text/javascript";

export class HelperFiles {
  public static generateFile(
    fileContent: string,
    fileName: string = HelperUtils.uuidV4(),
    fileType: string = mimeTypeOfJavascript
  ): File | undefined {
    const fileNameWithExtension = `${fileName}.js`;
    const file = new File([fileContent], fileNameWithExtension, {
      type: fileType,
    });

    console.log(file.name);
    file.text().then((res) => console.log(res));

    return file;
  }
}
