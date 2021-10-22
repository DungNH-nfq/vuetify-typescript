export class HelperUtils {
  public static uuidV4(): string {
    const uuidV4Template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

    // tslint:disable: no-bitwise
    return uuidV4Template.replace(/[xy]/g, (charAt) => {
      const randomHexValue = (Math.random() * 16) | 0;
      const decimalValue =
        charAt === "x" ? randomHexValue : (randomHexValue & 0x3) | 0x8;
      const hexResult = decimalValue.toString(16);

      return hexResult;
    });
    // tslint:enable: no-bitwise
  }
}
