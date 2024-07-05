import { Container, ContainerCreateOptions } from 'dockerode';
import { CodeI } from '../../common/typedefs/types';
import { docker } from '../../common/utils/redis';

class DockerService {
    code: CodeI;
    container!: Container;

    constructor(code: CodeI) {
        this.code = code;
    }

    getDockerImage(): string {
        let image = "";

        switch (this.code.language) {
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

    getExecutionCommand(): string[] {
        let cmd: string[] = [];

        switch (this.code.language) {
            case 'cpp':
                cmd = ['bash', '-c', `echo "${this.code.code}" > myapp.cpp && g++ -o myapp myapp.cpp && ./myapp`];
                break;
            case "js":
                cmd = ["node", "-e", this.code.code];
                break;
        }

        return cmd;
    }

    async createContainer(): Promise<Container> {
        const containerConfig: ContainerCreateOptions = {
            Image: this.getDockerImage(),
            Cmd: this.getExecutionCommand(),
            Tty: true
        }

        const container = await docker.createContainer(containerConfig);
        this.container = container;
        return container;
    }

    async getLogs(): Promise<string> {
        return (
            await this.container.logs({ stdout: true, stderr: true })
        ).toString();
    }
}

export default DockerService;
