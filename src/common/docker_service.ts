import Docker, { Container, ContainerCreateOptions } from "dockerode";
import { CodeJob, CodeSatatusEnum } from "./typedefs/types";
import * as constants from "../constants";
import prisma from "./utils/db";
import axios from "axios";

class DockerService {
  code: CodeJob;
  docker: Docker;
  output: string;
  status: CodeSatatusEnum;

  constructor() {
    this.code = {} as CodeJob;
    this.docker = new Docker();
    this.output = "";
    this.status = CodeSatatusEnum.Running;
  }

  public setCode(code: CodeJob): void {
    this.code = code;
  }

  private getImage(): string {
    let image = "";

    switch (this.code?.lang) {
      case "cpp":
        image = "gcc";
        break;
      case "js":
        image = "node";
        break;
      case "py":
        image = "python";
        break;
    }

    return image;
  }

  private getExecutionCommand(): string[] {
    let cmd: string[] = [];

    switch (this.code?.lang) {
      case "cpp":
        cmd = [
          "bash",
          "-c",
          `echo "${this.code.code}" > myapp.cpp && g++ -o myapp myapp.cpp && ./myapp`,
        ];
        break;
      case "js":
        cmd = ["node", "-e", this.code.code];
        break;
    }

    return cmd;
  }

  private async createContainer(): Promise<Container> {
    const containerConfig: ContainerCreateOptions = {
      Image: this.getImage(),
      Cmd: this.getExecutionCommand(),
      Tty: true,
    };

    const container = await this.docker.createContainer(containerConfig);
    return container;
  }

  private async updateCodeData(): Promise<void> {
    const currentTimestamp = new Date().getTime();
    const creationTimestamp = new Date(this.code.created_at).getTime();
    const executionTime: number = creationTimestamp - currentTimestamp;

    await prisma.code.update({
      where: {
        id: this.code.id,
      },
      data: {
        status: this.status,
        output: this.output,
        execution_time: executionTime,
      },
    });
  }

  private async hitCallbackUrl(callbackUrl: string, data: any): Promise<void> {
    console.log(callbackUrl);
    await axios.post(callbackUrl, { output: data });
  }

  async executeCode(): Promise<string> {
    let container: Container | null = null;
    let logs = "";

    try {
      container = await this.createContainer();
      await container.start();

      let timeoutReached = false;
      const tle = setTimeout(async () => {
        timeoutReached = true;
        if (container) {
          try {
            await container.stop();
          } catch (stopError) {
            console.error("Error stopping container on timeout:", stopError);
          }
        }
      }, constants.TLE_TIME_IN_SEC * 1000);

      await container.wait();
      clearTimeout(tle);

      if (timeoutReached) {
        logs = "";
        this.status = CodeSatatusEnum.Tle;
      } else {
        this.status = CodeSatatusEnum.Completed;
        logs = (
          await container.logs({ stdout: true, stderr: true })
        ).toString();
      }

      this.output = logs;
      await Promise.all([
        this.updateCodeData(),
        this.hitCallbackUrl(this.code.callback_url, { ...this.code, logs, submission_id: this.code.id }),
      ]);
    } catch (error) {
      console.error("Error executing code:", error);
    } finally {
      return logs;
    }
  }
}

export default DockerService;
