export interface TfsProject {
    name?: string | undefined;
    id: string;
    teams?: TFSTeam[] | undefined;
}

export interface TFSTeam {
    name?: string | undefined;
    id: string;
}
