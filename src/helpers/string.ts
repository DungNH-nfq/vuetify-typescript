export class HelperString {
  public static toKebabCase(inputString: string | undefined): string {
    if (
      typeof inputString !== "string" ||
      !inputString ||
      inputString === null ||
      inputString === undefined ||
      inputString.length === 0
    ) {
      return "";
    }

    const regexToSplitKebabCase = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
    const stringValidToConvertKebabCase = inputString.match(
      regexToSplitKebabCase
    );

    if (!stringValidToConvertKebabCase) {
      return "";
    }

    return stringValidToConvertKebabCase
      .map((x: string) => x.toLowerCase())
      .join("-");
  }
}
