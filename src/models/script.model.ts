import { ScriptType } from "@/constants/script_type.constant";

export default class ScriptModel {
  public id: string;
  public name: string;
  public type: ScriptType;
  public version: number;
  public endpoint: string;
  public scriptContent: string;
  public functionId: number;
  public createdAt: Date;
  public modifyAt: Date;

  constructor(lastFunctionId: number = 0) {
    const functionId = lastFunctionId + 1;
    this.id = "aa";
    this.name = "";
    this.endpoint = `${process.env.VUE_APP_API}?fnid=${functionId}`;
    this.scriptContent = "";
    this.version = 1;
    this.functionId = functionId;
    this.type = ScriptType.WEBHOOK;
    this.createdAt = new Date();
    this.modifyAt = new Date();
  }

  public generateNewVersion(): void {
    this.version++;
  }
}
