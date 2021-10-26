import { HelperUtils } from "@/helpers/utils";
import { ScriptType } from "@/constants/script_type.constant";

export default class ScriptModel {
  public id: string;
  public name: string;
  public type: ScriptType;
  public version: number;
  public endpoint: string;
  public scriptContent: string;
  public createdAt: Date;
  public modifyAt: Date;

  constructor() {
    this.id = "";
    this.name = "";
    this.endpoint = "";
    this.scriptContent = "";
    this.version = 1;
    this.type = ScriptType.WEBHOOK;
    this.createdAt = new Date();
    this.modifyAt = new Date();
  }

  public generateNewVersion(): void {
    this.version++;
  }
}
