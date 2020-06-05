export class IterationReport implements IIterationReport {
    teams?: Team[] | undefined;
    resourcesStats?: ResourceStats[] | undefined;

    constructor(data?: IIterationReport) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["teams"])) {
                this.teams = [] as any;
                for (let item of _data["teams"])
                    this.teams!.push(Team.fromJS(item));
            }
            if (Array.isArray(_data["resourcesStats"])) {
                this.resourcesStats = [] as any;
                for (let item of _data["resourcesStats"])
                    this.resourcesStats!.push(ResourceStats.fromJS(item));
            }
        }
    }

    static fromJS(data: any): IterationReport {
        data = typeof data === 'object' ? data : {};
        let result = new IterationReport();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.teams)) {
            data["teams"] = [];
            for (let item of this.teams)
                data["teams"].push(item.toJSON());
        }
        if (Array.isArray(this.resourcesStats)) {
            data["resourcesStats"] = [];
            for (let item of this.resourcesStats)
                data["resourcesStats"].push(item.toJSON());
        }
        return data; 
    }
}

export interface IIterationReport {
    teams?: Team[] | undefined;
    resourcesStats?: ResourceStats[] | undefined;
}

export class Team implements ITeam {
    title?: string | undefined;
    iteration?: Iteration | undefined;
    currentStats?: Stats | undefined;
    currentTasks?: Task[] | undefined;
    resourcesStats?: ResourceStats[] | undefined;

    constructor(data?: ITeam) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.title = _data["title"];
            this.iteration = _data["iteration"] ? Iteration.fromJS(_data["iteration"]) : <any>undefined;
            this.currentStats = _data["currentStats"] ? Stats.fromJS(_data["currentStats"]) : <any>undefined;
            if (Array.isArray(_data["currentTasks"])) {
                this.currentTasks = [] as any;
                for (let item of _data["currentTasks"])
                    this.currentTasks!.push(Task.fromJS(item));
            }
            if (Array.isArray(_data["resourcesStats"])) {
                this.resourcesStats = [] as any;
                for (let item of _data["resourcesStats"])
                    this.resourcesStats!.push(ResourceStats.fromJS(item));
            }
        }
    }

    static fromJS(data: any): Team {
        data = typeof data === 'object' ? data : {};
        let result = new Team();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["title"] = this.title;
        data["iteration"] = this.iteration ? this.iteration.toJSON() : <any>undefined;
        data["currentStats"] = this.currentStats ? this.currentStats.toJSON() : <any>undefined;
        if (Array.isArray(this.currentTasks)) {
            data["currentTasks"] = [];
            for (let item of this.currentTasks)
                data["currentTasks"].push(item.toJSON());
        }
        if (Array.isArray(this.resourcesStats)) {
            data["resourcesStats"] = [];
            for (let item of this.resourcesStats)
                data["resourcesStats"].push(item.toJSON());
        }
        return data; 
    }
}

export interface ITeam {
    title?: string | undefined;
    iteration?: Iteration | undefined;
    currentStats?: Stats | undefined;
    currentTasks?: Task[] | undefined;
    resourcesStats?: ResourceStats[] | undefined;
}

export class Iteration implements IIteration {
    id!: string;
    name?: string | undefined;
    fromDate?: string | undefined;
    toDate?: string | undefined;

    constructor(data?: IIteration) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.fromDate = _data["fromDate"];
            this.toDate = _data["toDate"];
        }
    }

    static fromJS(data: any): Iteration {
        data = typeof data === 'object' ? data : {};
        let result = new Iteration();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["fromDate"] = this.fromDate;
        data["toDate"] = this.toDate;
        return data; 
    }
}

export interface IIteration {
    id: string;
    name?: string | undefined;
    fromDate?: string | undefined;
    toDate?: string | undefined;
}

export class Stats implements IStats {
    originalEstimate?: number | undefined;
    completedWork?: number | undefined;
    remainingWork?: number | undefined;
    activeTasks?: number | undefined;
    newTasks?: number | undefined;

    constructor(data?: IStats) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.originalEstimate = _data["originalEstimate"];
            this.completedWork = _data["completedWork"];
            this.remainingWork = _data["remainingWork"];
            this.activeTasks = _data["activeTasks"];
            this.newTasks = _data["newTasks"];
        }
    }

    static fromJS(data: any): Stats {
        data = typeof data === 'object' ? data : {};
        let result = new Stats();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["originalEstimate"] = this.originalEstimate;
        data["completedWork"] = this.completedWork;
        data["remainingWork"] = this.remainingWork;
        data["activeTasks"] = this.activeTasks;
        data["newTasks"] = this.newTasks;
        return data; 
    }
}

export interface IStats {
    originalEstimate?: number | undefined;
    completedWork?: number | undefined;
    remainingWork?: number | undefined;
    activeTasks?: number | undefined;
    newTasks?: number | undefined;
}

export class Task implements ITask {
    id!: number;
    assignedTo?: string | undefined;
    state?: string | undefined;
    iterationPath?: string | undefined;
    title?: string | undefined;
    originalEstimate?: number | undefined;
    completedWork?: number | undefined;
    remainingWork?: number | undefined;
    createdDate?: string | undefined;

    constructor(data?: ITask) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.assignedTo = _data["assignedTo"];
            this.state = _data["state"];
            this.iterationPath = _data["iterationPath"];
            this.title = _data["title"];
            this.originalEstimate = _data["originalEstimate"];
            this.completedWork = _data["completedWork"];
            this.remainingWork = _data["remainingWork"];
            this.createdDate = _data["createdDate"];
        }
    }

    static fromJS(data: any): Task {
        data = typeof data === 'object' ? data : {};
        let result = new Task();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["assignedTo"] = this.assignedTo;
        data["state"] = this.state;
        data["iterationPath"] = this.iterationPath;
        data["title"] = this.title;
        data["originalEstimate"] = this.originalEstimate;
        data["completedWork"] = this.completedWork;
        data["remainingWork"] = this.remainingWork;
        data["createdDate"] = this.createdDate;
        return data; 
    }
}

export interface ITask {
    id: number;
    assignedTo?: string | undefined;
    state?: string | undefined;
    iterationPath?: string | undefined;
    title?: string | undefined;
    originalEstimate?: number | undefined;
    completedWork?: number | undefined;
    remainingWork?: number | undefined;
    createdDate?: string | undefined;
}

export class ResourceStats implements IResourceStats {
    resourceName?: string | undefined;
    originalEstimate?: number | undefined;
    completedWork?: number | undefined;
    remainingWork?: number | undefined;

    constructor(data?: IResourceStats) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.resourceName = _data["resourceName"];
            this.originalEstimate = _data["originalEstimate"];
            this.completedWork = _data["completedWork"];
            this.remainingWork = _data["remainingWork"];
        }
    }

    static fromJS(data: any): ResourceStats {
        data = typeof data === 'object' ? data : {};
        let result = new ResourceStats();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["resourceName"] = this.resourceName;
        data["originalEstimate"] = this.originalEstimate;
        data["completedWork"] = this.completedWork;
        data["remainingWork"] = this.remainingWork;
        return data; 
    }
}

export interface IResourceStats {
    resourceName?: string | undefined;
    originalEstimate?: number | undefined;
    completedWork?: number | undefined;
    remainingWork?: number | undefined;
}