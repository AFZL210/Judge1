import Docker, { Container, ContainerCreateOptions } from "dockerode";
import { CodeJob } from "./typedefs/types";
import * as constants from "../constants";

class DockerService {
  code: CodeJob;
  docker: Docker;

  constructor() {
    this.code = {} as CodeJob;
    this.docker = new Docker();
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

  async executeCode() {
    try {
      const container = await this.createContainer();
      await container.start();

      const tle = setTimeout(async () => {
        await container.stop();
        throw new Error("TLE");
      }, constants.TLE_TIME_IN_SEC * 1000);

      await container.wait();
      clearTimeout(tle);

      const logs = (
        await container.logs({ stdout: true, stderr: true })
      ).toString();

      console.log(logs);

      await container.remove();
    } catch (e) {
      console.log((e as Error).message);
    }
  }
}

export default DockerService;
